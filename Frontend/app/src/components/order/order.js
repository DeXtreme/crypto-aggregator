import { useState } from 'react';
import './order.css';

function Order({order,editable,handleEdit,handleDelete}){
    const types = {B:"Buying",S:"Selling"}

    const coin_images = {BTC:"https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
                         ETH:"https://assets.coingecko.com/coins/images/279/large/ethereum.png",
                         USDT:"https://assets.coingecko.com/coins/images/325/large/Tether-logo.png",
                         USDC:"https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png",
                         BUSD: "https://assets.coingecko.com/coins/images/9576/large/BUSD.png"}

    let [ isShowMenu, setShowMenu ] = useState(false);

    const showMenu = () =>{
        setShowMenu(prev=>!prev);
    }

    return (
        <div className="order">
            <hr />
            <div className="content">
                <div className="card">
                    <div className="type-price">
                        <p className={`type ${(order.type=="B") ? "buy" : "sell"}`}>{types[order.type]}<img src={coin_images[order.coin]} /><span>{order.coin}</span></p>
                        <p className="price"><span>GHc</span>{order.price.toLocaleString("en-US")}</p>
                    </div>
                    
                    <div className="details">
                        <div>
                            <p className="by">{order.by}</p>
                            <p className="location">{`${order.location.region}, ${order.location.name}`}</p>
                        </div>
                        <p className="contact">{order.contact}</p>
                    </div>
                </div>
                { editable &&
                <div className="menu">
                    <button className="button" onClick={showMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <div className={`dropdown ${(isShowMenu) ? "show" : ""}`}>
                        <button onClick={()=>{showMenu(false);handleEdit(order)}}>Edit</button>
                        <button onClick={()=>{showMenu(false);handleDelete(order.id)}}>Delete</button>
                    </div>
                </div>
                }
            </div>
            
        </div>
    );
}

export default Order;