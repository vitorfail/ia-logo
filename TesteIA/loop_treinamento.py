import numpy as np
import PIL.Image
import glob
import os
import tensorflow as tf
import dnnlib
import dnnlib.tflib as tflib

def treinamento(
    submit_config,
    G_args                  = {},       # Opções para gerador network.
    D_args                  = {},       # Opções para discriminador network.
    G_opt_args              = {},       # Opções para otimizador de gerador.
    D_opt_args              = {},       # Opções para otimizador de discriminador.
    G_loss_args             = {},       # Opções para perda do gerador.
    D_loss_args             = {},       # Opções para perda de discriminador.
    dataset_args            = {},       # Opções para dataset.load_dataset().
    sched_args              = {},       # Opções para train.TrainingSchedule.
    grid_args               = {},       # Opções para train.setup_snapshot_image_grid().
    metric_arg_list         = [],       # Opções para MetricGroup.
    tf_config               = {},       # Opções para tflib.init_tf().
    G_smoothing_kimg        = 10.0,     # Meia-vida da média de execução dos pesos do gerador.
    D_repeats               = 1,        # Quantas vezes o discriminador é treinado por G iteração.
    minibatch_repeats       = 4,        # Número de minilotes a serem executados antes de ajustar os parâmetros de treinamento.
    reset_opt_for_new_lod   = True,     # Redefinir o estado interno do otimizador (por exemplo, momentos Adam) quando novas camadas são introduzidas?
    total_kimg              = 15000,    # Duração total do treinamento, medida em milhares de imagens reais.
    mirror_augment          = False,    # Ativar aumento do espelho?
    drange_net              = [-1,1],   # Faixa dinâmica usada ao alimentar dados de imagem para as redes.
    image_snapshot_ticks    = 1,        # Com que frequência exportar instantâneos de imagem?
    network_snapshot_ticks  = 10,       # Com que frequência exportar instantâneos de rede?
    save_tf_graph           = False,    # Include full TensorFlow computation graph in the tfevents file?
    save_weight_histograms  = False,    # Include weight histograms in the tfevents file?
    resume_run_id           = None,     # Run ID or network pkl to resume training from, None = start from scratch.
    resume_snapshot         = None,     # Snapshot index to resume training from, None = autodetect.
    resume_kimg             = 0.0,      # Assumed training progress at the beginning. Affects reporting and training schedule.
    resume_time             = 0.0):     # Assumed wallclock time at the beginning. Affects reporting.
    
    # Iniciando a o contexto da biblioteca dnnlib.
    ctx = dnnlib.RunContext(submit_config, train)
    tflib.init_tf(tf_config)

    # Load training set.
    training_set = dataset.load_dataset(data_dir=config.data_dir, verbose=True, **dataset_args)
    # Criando networks.
    with tf.device('/gpu:0'):
        if resume_run_id is not None:
            network_pkl = misc.locate_network_pkl(resume_run_id, resume_snapshot)
            print('Loading networks from "%s"...' % network_pkl)
            G, D, Gs = misc.load_pkl(network_pkl)
        else:
            print('Constructing networks...')
            G = tflib.Network('G', num_channels=training_set.shape[0], resolution=training_set.shape[1], label_size=training_set.label_size, **G_args)
            D = tflib.Network('D', num_channels=training_set.shape[0], resolution=training_set.shape[1], label_size=training_set.label_size, **D_args)
            Gs = G.clone('Gs')
    G.print_layers(); D.print_layers()

    ctx.close()

def error(msg):
    print('Error: ' + msg)
    exit(1)
