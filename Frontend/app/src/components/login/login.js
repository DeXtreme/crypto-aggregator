import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { showLogin } from '../../store/actions'; 
import './login.css';

function Login(){
    let dispatch = useDispatch();

    useEffect(()=> {
        document.body.classList.add("overflow-hide");
        return () => document.body.classList.remove("overflow-hide");
    },[]);

    const doLogin = () => {};
    const hideLogin = () => dispatch(showLogin(false));

    return (
        <div className="login">
            <div className="background" onClick={hideLogin} />
            <div className="container">
                <div className="logo">
                    <p>CEDIX</p>
                </div>
                <p>Log in with:</p>
                <button id="gmail"><i class="fab fa-google"></i><span>Gmail</span></button>
                <button id="twitter"><i class="fab fa-twitter"></i><span>Twitter</span></button>
                <button id="facebook"><i class="fab fa-facebook-f"></i><span>Facebook</span></button>
            </div>
        </div>
    );
}

export default Login;