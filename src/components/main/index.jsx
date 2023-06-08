import "./styles.css";
import cube from './cube-svgrepo-com.svg'
import {createRef, useState} from "react";
import ModalWindow from "../ModalWindow";

export default function Main(){

    const [orderStatus, setOrderStatus] = useState(0);
    const [modalActive, setModalActive] = useState(false);
    const [correct, setCorrect] = useState(true);
    const [values, setValues] = useState({
        telnumber: "",
        name: "",
        weight: "",
        street: "",
        fromCity: "",
        toCity: "",
        orderNumber: "",
        price: "",
    });
    const textInput = createRef();
    const cityFrom = createRef();
    const cityTo = createRef();
    const weight = createRef();
    const goToOrder = () => {
        setOrderStatus(1);
    };

    const cities =[
        ["Москва", "Санкт-Петербург", "Красноярск", "Томск", "Новосибирск", "Омск", "Владивосток", "Улан-Удэ", "Якутск", "Иркутск"],
        [200, 600, 1000, 1000, 1200, 800, 4000, 2500, 3500, 3000],
        [600, 200, 1200, 1400, 1500, 1000, 4500, 3000, 4000, 3500],
        [1000, 1200, 100, 800, 600, 1000, 3000, 2000, 2400, 2000],
        [1000, 1400, 800, 100, 400, 850, 3500, 2500, 3000, 2000],
        [1200, 1500, 600, 400, 100, 1000, 3000, 2000, 2450, 2100],
        [800, 1000, 1000, 850, 1000, 100, 3250, 2750, 2960, 2600],
        [4000, 4500, 3000, 3500, 3000, 3250, 150, 800, 1000, 900],
        [2500, 3000, 2000, 2500, 2000, 2750, 800, 100, 2000, 700],
        [3500, 4000, 2400, 3000, 2450, 2960, 1000, 2000, 100, 865],
        [3000, 3500, 2000, 2000, 2100, 2600, 900, 700, 865, 100]
    ]
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const checkOrder = () => {
        setModalActive(true)
        const data = JSON.parse(localStorage.getItem("values").toString())
        if(textInput.current.value !== data.orderNumber) setCorrect(false)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        values.orderNumber = Math.floor(100000 + Math.random() * 900000).toString();
        const priceOfOrder = cities[Number(cityFrom.current.value) + 1][cityTo.current.value] * weight.current.value * 0.5;
        values.price = priceOfOrder.toString();
        localStorage.setItem('values', JSON.stringify(values));
        setOrderStatus(2);
    };


    return(
        <>
            <div className="bg">
                <div className="header">
                    <p className="logo"> ДОСТАВКА ТПУ</p>
                    <img className="cube" src={cube} alt='cube'/>
                    <div className="owner">
                        ИП Рената Мамадалиева<br/>
                        <b>+7-913-042-71-57</b>
                    </div>
                </div>

                <div className="mainBody">
                    {orderStatus === 0
                    ?<div className="mainPage">
                        <div className="order">
                            <button className="mainEl" onClick={goToOrder}>Заказать доставку</button>
                        </div>
                        <div className="check">
                            <input className="mainEl number" type="number" ref={textInput} placeholder="Введите номер заказа"/>
                            <button className="mainEl" onClick={checkOrder}>Проверить статус заказа</button>
                        </div>
                        <div className="askQuestion">
                            <button className="mainEl">Задать вопрос</button>
                        </div>
                        { correct === true
                            ?
                            <>
                                <ModalWindow active={modalActive} setActive={setModalActive}>
                                    Посылка зарегистрирована<br/> на номер <br/>*-***-***-{values.telnumber.toString().substring(values.telnumber.toString().length-4)}<br/>
                                    ID заказа: <b>{values.orderNumber}</b><br/>
                                    Статус заказа: ожидает оплаты
                                </ModalWindow>
                            </>
                            :
                            <>
                                <ModalWindow active={modalActive} setActive={setModalActive}>
                                    Заказа под таким номером нет!
                                </ModalWindow>
                            </>
                        }
                    </div>
                    : orderStatus === 1?
                    <div className="orderForm">
                        <form onSubmit={handleSubmit}>
                            <div className="wrapper">
                                <input type="number" required name="telnumber" value={values.telnumber} onChange={handleInputChange} placeholder="Номер телефона"/>
                            </div>
                            <div className="wrapper">
                                <input type="text" required name="name" value={values.name} onChange={handleInputChange} placeholder="ФИО"/>
                            </div>
                            <div className="wrapper">
                                <input type="number" required name="weight" min={1} max={20} ref={weight} value={values.weight} onChange={handleInputChange} placeholder="Вес посылки(кг)"/>
                            </div>

                            <div className="wrapper">
                                <select className="customSelect" required ref={cityFrom} name="fromCity" value={values.fromCity} onChange={handleInputChange}>
                                    <option key={"00"} value="00" hidden>Откуда</option>
                                    <option value={0}>{cities[0][0]}</option>
                                    <option value={1}>{cities[0][1]}</option>
                                    <option value={2}>{cities[0][2]}</option>
                                    <option value={3}>{cities[0][3]}</option>
                                    <option value={4}>{cities[0][4]}</option>
                                    <option value={5}>{cities[0][5]}</option>
                                    <option value={6}>{cities[0][6]}</option>
                                    <option value={7}>{cities[0][7]}</option>
                                    <option value={8}>{cities[0][8]}</option>
                                    <option value={9}>{cities[0][9]}</option>
                                </select>
                            </div>
                            <div className="wrapper">
                                <select className="customSelect" required ref={cityTo} name="toCity" value={values.toCity} onChange={handleInputChange}>
                                    <option key={"00"} value="00" hidden>Куда</option>
                                    <option value={0}>{cities[0][0]}</option>
                                    <option value={1}>{cities[0][1]}</option>
                                    <option value={2}>{cities[0][2]}</option>
                                    <option value={3}>{cities[0][3]}</option>
                                    <option value={4}>{cities[0][4]}</option>
                                    <option value={5}>{cities[0][5]}</option>
                                    <option value={6}>{cities[0][6]}</option>
                                    <option value={7}>{cities[0][7]}</option>
                                    <option value={8}>{cities[0][8]}</option>
                                    <option value={9}>{cities[0][9]}</option>
                                </select>
                            </div>
                            <div className="wrapper">
                                <input type="text" required name="street" value={values.street} onChange={handleInputChange} placeholder="Улица, дом"/>
                            </div>
                            <button className="formBtn" type="submit">Оформить заказ</button>

                        </form>
                    </div>
                    :
                        <>
                            <div className="infoBlock">
                                <label className="info">
                                    <b>Номер вашего заказа:</b><br/> {values.orderNumber}<br/>
                                    <b>Номер телефона:</b><br/> {values.telnumber}<br/>
                                    <b>ФИО:</b><br/> {values.name}<br/>
                                    <b>Вес:</b><br/> {values.weight} кг<br/>
                                    {cities[0][values.fromCity]} - {cities[0][values.toCity]}<br/>
                                    {values.street} <br/>
                                    <b>Цена:</b><br/> {values.price} руб<br/>
                                </label>
                                <button className="formBtn" onClick={() => {setOrderStatus(0)}}>На главную</button>
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
    )
}