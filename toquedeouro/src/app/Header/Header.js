'use client';
import Image from "next/image"
import "./Header.css"
import li from "../menu";
import Seta from "../image/seta.png"
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { Context } from "../provide";
import Lista from "../image/list.png"
import Logo from "../image/logo1.png"


export function Header(){
    const [head, sethead] = useState(false)
    const router = useRouter();
    const { setmenu} = Context()
    const scrollevent = () =>{
      if(window.scrollY> 10){
        sethead(true)
      }
      else{
        sethead(false)
      }
    }
  
    useEffect(() => {
      // Adiciona o ouvinte de evento quando o componente monta
      window.addEventListener('scroll', scrollevent);
  
      // Remove o ouvinte de evento quando o componente desmonta
      return () => {
        window.removeEventListener('scroll', scrollevent);
      };
    }, []); // Certifique-se de incluir handleResize no array de dependências
    function menu(){

    }
    return(
      <div>
        <div className={head? "header show": "header"}>
            <div className="logo">
                <div className="img"></div>
            </div>
            <div className="menu">
              {li.map((item, key) => {
                if(key === 1){
                return(<div key={key} className="item">
                  <div className="titulo">
                    <p>{item}</p>
                    <Image alt="Seta" src={Seta} height={15} width={15}></Image>
                    <div className="catalogo_lista">
                        <div className="colum">
                            <p>Catalogo #1</p>
                        </div>
                    </div>
                  </div>
                  <span className="linha"></span>
                </div>)}
                if(key === 0){
                  return(<div key={key} className="item" onClick={() => router.push("/")}>
                    <div className="titulo">
                      <p>{item}</p>
                    </div>
                    <span className="linha"></span>
                  </div>)}
                else{
                  return(<div key={key} className="item">
                    <div className="titulo">
                      <p>{item}</p>
                    </div>
                    <span className="linha"></span>
                  </div>)}
              })}
            </div>
            <div className="aviso">
              Compra agora!
            </div>
        </div>
        <div className='cabecalho'>
          <Image onClick={()=> setmenu(true)} alt='Lista' style={{width:"20px", height:"20px"}} src={Lista}></Image>
          <Image alt='Logo' style={{width:"40px", height:"40px"}} src={Logo}></Image>
        </div>
      </div>
    )
}