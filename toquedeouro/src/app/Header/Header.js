import "Header.css"
import Image from "next/image"
import Logo  from "../image/logo.jpeg"

export default function Headers(){
    return(
        <div className="header">
            <div className="logo">
                <Image src={Logo}></Image>
            </div>
            <div className="menu">
                <p>HOME</p>
                <p>LOJA</p>
                <p>SOBRE NÓS</p>
            </div>
            <div className="aviso">
                <p>Boas Compras</p>
            </div>
        </div>
    )
} 