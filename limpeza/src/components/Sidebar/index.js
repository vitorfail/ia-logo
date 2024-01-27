import "./index.css"
import Logo from "../../img/icon.png"
export default function Sidebar(){
    return(
        <div className="sidebar">
            <div className="logo">
                <img alt="logo" src={Logo} ></img>
                <p>Limpeza</p>
            </div>
            <div className="ops">
                <p>Home</p>
                <p>Cadastrar</p>
                <p>Localização</p>
                <p>Exit</p>
            </div>
        </div>
    )
}