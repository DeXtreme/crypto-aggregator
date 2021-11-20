import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { selectView, removeAccount, showLogin } from '../../store/actions';
import "./navbar.css";

function Navbar(){
    let account = useSelector(state => state.account);
    let view = useSelector(state => state.view)
    let dispatch = useDispatch()
    const [isDropShow, showDrop ] = useState(false);

    const selectNews = () => dispatch(selectView("news"));
    const selectPrices = () => dispatch(selectView("prices"));
    const selectOrders = () => dispatch(selectView("orders"));
    const logout = () => {
        dispatch(removeAccount());
        showDrop(false);
    }
    const login = () => dispatch(showLogin(true));
    return (
        <div className="navbar">
            <div className="primary">
                <div className="logo">
                    <p>CediX</p>
                </div>
                <div className="account">
                    {(account==null) ? 
                    <button className="loginbtn" onClick={login}>Log in</button>
                    :
                    <>
                        <div className="profile">
                            <img src={account.photoUrl}/>
                            <button 
                                onClick={() => showDrop(prev => !prev)}
                            ><span>{account.name}</span> &#9662;</button>
                        </div>
                        <div className="dropdown" style={isDropShow ? {maxHeight:"200px"} : {maxHeight:"0px"}}>
                            <button onClick={logout}>Log out</button>
                        </div>
                    </>
                    }
                    
                </div>
            </div>
            <div className="secondary">
                <div className="tabs">
                    <button className={(view==="orders") ? "active": ""} onClick={selectOrders}><i className="fas fa-shopping-cart"></i></button>
                    <button className={(view==="news") ? "active" : ""} onClick={selectNews}><i className="fas fa-newspaper"></i> </button>
                    <button className={(view==="prices") ? "active" : ""} onClick={selectPrices}><i className="fas fa-dollar-sign"></i></button>
                </div>
            </div>
        </div>
    )
}

export default Navbar
