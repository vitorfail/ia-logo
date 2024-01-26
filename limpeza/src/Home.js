import './Home.css';
import Sidebar from './components/Sidebar';
import { useEffect, useState } from 'react';
import Cli from "../src/img/client.png"

function Home() {
  const [cliente, setclientes] = useState(13)
  return (
    <div className="App">
      <Sidebar></Sidebar>
      <div className='content'>
        <div className='cards'>
          <div className='card'>
            <p>{cliente}</p>
            <img alt='img' src={Cli}></img>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;
