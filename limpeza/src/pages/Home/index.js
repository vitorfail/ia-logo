import './index.css';
import Sidebar from "../../components/Sidebar/index"
import { useEffect, useState } from 'react';
import Cli from "../../img/client.png"
import Pesquisa from '../../components/Pesquisa';

function Home() {
  const [cliente, setclientes] = useState(13)
  const [cliente_prox, setcliente_prox] = useState("José")
  const [cliente_long, setcliente_log] = useState("Gilberto")
  useEffect(() =>{
    const percentageA = 40;
    const percentageB = 60;

    // Calcula o ângulo com base nas porcentagens
    const angleA = (percentageA / 100) * 360;
    const angleB = (percentageB / 100) * 360;

    // Atualiza o tamanho das fatias
    const sliceA = document.getElementById('slicea');
    sliceA.setAttribute('d', calculateSlicePath(0, angleA));

    const sliceB = document.getElementById('sliceb');
    sliceB.setAttribute('d', calculateSlicePath(angleA, angleB));
  // Função para calcular o caminho da fatia

  }, [])
  const calculateSlicePath = (startAngle, endAngle) => {
    const radius = 50;
    const startX = Math.cos((startAngle - 90) * (Math.PI / 180)) * radius;
    const startY = Math.sin((startAngle - 90) * (Math.PI / 180)) * radius;
    const endX = Math.cos((endAngle - 90) * (Math.PI / 180)) * radius;
    const endY = Math.sin((endAngle - 90) * (Math.PI / 180)) * radius;
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
    return `M0,0 L${startX},${startY} A${radius},${radius} 0 ${largeArcFlag},1 ${endX},${endY} Z`;  }
  return (
    <div className="App">
      <Sidebar></Sidebar>
      <div className='content'>
        <Pesquisa></Pesquisa>
        <div className='cards'>
          <div className='card'>
            <div className='titulo'>
              <p>{cliente}</p>
              <p>Clientes</p>
            </div>
            <img alt='img' src={Cli}></img>
          </div>
          <div className='card'>
            <div className='titulo'>
              <p>{cliente_prox}</p>
              <p>É o cliente mais próximo</p>
            </div>
            <img alt='img' src={Cli}></img>
          </div>
          <div className='card'>
            <div className='titulo'>
              <p>{cliente_long}</p>
              <p>É o cliente mais distante</p>
            </div>
            <img alt='img' src={Cli}></img>
          </div>

        </div>
        <div style={{width:'100%', height:"100%", display:"flex", justifyContent:"space-between"}}>
          <div className='mapa'>
            <p>Distribuição de clientes pela distância</p>
            <svg class="chart" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
              <line x1="0" y1="200" x2="400" y2="200"></line>

              <line className='fina' x1="200" y1="0" x2="200" y2="400"></line>
              <line className='fina' x1="0" y1="50" x2="400" y2="50"></line>
              <line className='fina' x1="0" y1="100" x2="400" y2="100"></line>
              <line className='fina' x1="0" y1="150" x2="400" y2="150"></line>
              <line className='fina' x1="0" y1="200" x2="400" y2="200"></line>
              <line className='fina' x1="0" y1="250" x2="400" y2="250"></line>
              <line className='fina' x1="0" y1="300" x2="400" y2="300"></line>
              <line className='fina' x1="0" y1="350" x2="400" y2="350"></line>

              <line className='fina' x1="50" y1="0" x2="50" y2="400"></line>
              <line className='fina' x1="100" y1="0" x2="100" y2="400"></line>
              <line className='fina' x1="150" y1="0" x2="150" y2="400"></line>
              <line className='fina' x1="200" y1="0" x2="200" y2="400"></line>
              <line className='fina' x1="250" y1="0" x2="250" y2="400"></line>
              <line className='fina' x1="300" y1="0" x2="300" y2="400"></line>
              <line className='fina' x1="350" y1="0" x2="350" y2="400"></line>
              <line className='fina' x1="50" y1="195" x2="50" y2="205"></line>
              <line className='fina' x1="150" y1="195" x2="150" y2="205"></line>
              <line className='fina' x1="250" y1="195" x2="250" y2="205"></line>
              <line className='fina' x1="350" y1="195" x2="350" y2="205"></line>

              <line x1="195" y1="50" x2="205" y2="50"></line>
              <line x1="195" y1="150" x2="205" y2="150"></line>
              <line x1="195" y1="250" x2="205" y2="250"></line>
              <line x1="195" y1="350" x2="205" y2="350"></line>

              <text x="50" y="220">-2</text>
              <text x="150" y="220">-1</text>
              <text x="250" y="220">0</text>
              <text x="350" y="220">1</text>
              <text x="210" y="50">2</text>
              <text x="210" y="150">1</text>
              <text x="210" y="250">0</text>
              <text x="210" y="350">-1</text>
            </svg>        
          </div>
          <div className='pizza'>
            <p>Resumo</p>
            <div class="chart-container">
              <svg class="chart2" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(50,50)">
                  <path className="slice" id="slicea" d="M0,0 L0,-50 A50,50 0 0,1 0,50 Z" fill="#4CAF50"></path>
                  <text className="label" x="0" y="-25">Categoria A</text>

                  <path className="slice" id="sliceb"  d="M0,0 L0,50 A50,50 0 0,1 0,-50 Z" fill="#2196F3"></path>
                  <text className="label" x="0" y="25">Categoria B</text>                </g>
              </svg>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;
