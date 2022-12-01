import numpy as np
import PIL.Image
import glob
import os
import tensorflow as tf

def criando_dataset(diretorio_final, diretorio_imagens, shuffle):
    print('Carregando imagens de "%s"' % diretorio_imagens)
    lista_das_imagens = sorted(glob.glob(os.path.join(diretorio_imagens, '*')))
    primeira_imagem = np.asarray(PIL.Image.open(lista_das_imagens[0]))
    resolution = primeira_imagem.shape[0]
    canais = primeira_imagem.shape[2] if primeira_imagem.ndim == 3 else 1
    if primeira_imagem.shape[1] != resolution:
        error('A imagem precisa altura e largura iguais')
    if resolution != 2 ** int(np.floor(np.log2(resolution))):
        error("""A resolução da deve ter uma potência de 2, ou seja dever ter alguma das seguintes resoluções: 32X32
        , 64X64, 128X128, 256X256, 512X512 w 1024X1014 """)
    if canais not in [1, 3]:
        error('As imagens devem ser armazenadas como RGB ou tons de cinza')
    with CodificarTF(diretorio_final, len(lista_das_imagens)) as tfr:
        order = tfr.escolher_order() if shuffle else np.arange(len(lista_das_imagens))
        for idx in range(order.size):
            img = np.asarray(PIL.Image.open(lista_das_imagens[order[idx]]))
            if canais == 1:
                img = img[np.newaxis, :, :] # HW => CHW
            else:
                img = img.transpose([2, 0, 1]) # HWC => CHW
            tfr.add_imagem(img)


class CodificarTF:
    def __init__(self, diretorio_final, quantidade_de_imagens, print_progress=True, progress_interval=10):
        self.diretorio_final       = diretorio_final
        self.tfr_prefix         = os.path.join(self.diretorio_final, os.path.basename(self.diretorio_final))
        self.quantidade_de_imagens    = quantidade_de_imagens
        self.imagem_atual         = 0
        self.shape              = None
        self.resolution_log2    = None
        self.tfr_writers        = []
        self.print_progress     = print_progress
        self.progress_interval  = progress_interval

        if self.print_progress:
            print('Creating dataset "%s"' % diretorio_final)
        if not os.path.isdir(self.diretorio_final):
            os.makedirs(self.diretorio_final)
        assert os.path.isdir(self.diretorio_final)
    def escolher_order(self):
        #cria uma orde aleatória dos index da imagem
        order = np.arange(self.quantidade_de_imagens)
        np.random.RandomState(123).shuffle(order)
        return order
    def add_imagem(self, img):
        if self.print_progress and self.imagem_atual % self.progress_interval == 0:
            print('%d / %d\r' % (self.imagem_atual, self.quantidade_de_imagens), end='', flush=True)
        #Checando se não tem nenhuma imagem instancida
        if self.shape is None:
            self.shape = img.shape
            self.resolution_log2 = int(np.log2(self.shape[1]))
            #Checando se há algum problema no array da imagem
            assert self.shape[0] in [1, 3]
            assert self.shape[1] == self.shape[2]
            assert self.shape[1] == 2**self.resolution_log2
            opcoes_tf = tf.io.TFRecordOptions(compression_type = None)
            for lod in range(self.resolution_log2 - 1):
                tfr_file = self.tfr_prefix + '-r%02d.tfrecords' % (self.resolution_log2 - lod)
                self.tfr_writers.append(tf.io.TFRecordWriter(tfr_file, opcoes_tf))
        assert img.shape == self.shape
        for lod, tfr_writer in enumerate(self.tfr_writers):
            if lod:
                img = img.astype(np.float32)
                img = (img[:, 0::2, 0::2] + img[:, 0::2, 1::2] + img[:, 1::2, 0::2] + img[:, 1::2, 1::2]) * 0.25
            quant = np.rint(img).clip(0, 255).astype(np.uint8)
            ex = tf.train.Example(features=tf.train.Features(feature={
                'shape': tf.train.Feature(int64_list=tf.train.Int64List(value=quant.shape)),
                'data': tf.train.Feature(bytes_list=tf.train.BytesList(value=[quant.tostring()]))}))
            tfr_writer.write(ex.SerializeToString())
        self.imagem_atual += 1

    def fechar(self):
        if self.print_progress:
            print('%-40s\r' % 'Liberando dados...', end='', flush=True)
        for tfr_writer in self.tfr_writers:
            tfr_writer.close()
        self.tfr_writers = []
        if self.print_progress:
            print('%-40s\r' % '', end='', flush=True)
            print('Imagem %d adicionada.' % self.imagem_atual)
    def __enter__(self):
        return self

    def __exit__(self, *args):
        self.fechar()



def error(msg):
    print('Error: ' + msg)
    exit(1)
