import "./styles.css";
import cube from './cube-svgrepo-com.svg'
import Textarea from "../textArea";


export default function Main(){
    return(
        <>
            <div className="bg">
                <div className="header">
                    <p className="logo"> ДОСТАВКА ТПУ</p>
                    <img className="cube" src={cube} alt='cube'/>
                </div>
                <div className="body">
                    <div className="order">
                        <button className="orderButton">Заказать</button>
                    </div>
                    <div className="check">
                        <Textarea placeholder="Введите номер заказа"/>
                        <button className="checkButton">Проверить статус заказа</button>
                    </div>
                    <div className="askQuestion">
                        <Textarea placeholder="Возникли проблемы?"/>
                        <button className="askButton">Задать вопрос</button>

                    </div>
                </div>
            </div>
        </>
    )
}