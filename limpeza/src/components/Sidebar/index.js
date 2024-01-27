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
                <div className="li">
                    <div className="icon"></div>
                    <p>Home</p>
                </div>
                <div className="li">
                    <div className="icon"></div>
                    <p>Cadastrar</p>
                </div>
                <div className="li">
                    <div className="icon"></div>
                    <p>Localização</p>
                </div>
                <div className="li">
                    <div className="icon"></div>
                    <p>Exit</p>
                </div>
            </div>
        </div>
    )
}