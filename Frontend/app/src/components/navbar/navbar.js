import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { selectView, removeAccount } from '../../store/actions';
import "./navbar.css";

function Navbar({showTabs}){
    let account = useSelector(state => state.account);
    let dispatch = useDispatch()
    const {isDropShow, showDrop } = useState(false);

    const selectNews = () => dispatch(selectView("news"));
    const selectPrices = () => dispatch(selectView("prices"));
    const selectOrders = () => dispatch(selectView("orders"));
    const logout = () => dispatch(removeAccount());
    return (
        <div className="navbar">
            <div className="primary">
                <div className="logo">
                    <p>CediX</p>
                </div>
                <div className="account">
                    {(account==null) ? 
                    <button className="login">Login</button>
                    :
                    <div className="profile">
                        <img />
                        <button 
                            onClick={() => showDrop(prev => !prev)}
                        >Test Name &#9662;</button>
                    </div>}
                    <div className="dropdown" style={isDropShow ? {maxHeight:"200px"} : {maxHeight:"0px"}}>
                        <button onClick={logout}>Log out</button>
                    </div>
                </div>
            </div>
            <div className="secondary">
                <div className="tabs">
                    <button onClick={selectOrders}><i class="fas fa-shopping-cart"></i></button>
                    <button onClick={selectNews}><i class="fas fa-newspaper"></i> </button>
                    <button onClick={selectPrices}><i class="fas fa-dollar-sign"></i></button>
                </div>
            </div>
        </div>
    )
}

export default Navbar
