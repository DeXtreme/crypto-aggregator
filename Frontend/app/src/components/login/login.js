import { getAuth, 
    signInWithPopup,
    GoogleAuthProvider,
    TwitterAuthProvider,
    FacebookAuthProvider } from "firebase/auth";
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import app from "../../firebase";
import { showLogin, addAccount } from '../../store/actions';
import { API_HOST } from '../../config';  
import './login.css';

function Login(){
let dispatch = useDispatch();
let [isLoading, setLoading] = useState(false);
let [error, setError] = useState(null);

useEffect(()=> {
    document.body.classList.add("overflow-hide");
    return () => document.body.classList.remove("overflow-hide");
},[]);

const gmailLogin = () => {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
    doLogin(provider)
}

const twitterLogin = () => {
    const provider = new TwitterAuthProvider();
    doLogin(provider)
}

const facebookLogin = () => {
    const provider = new FacebookAuthProvider();
    doLogin(provider)
}

const doLogin = (provider) => { 
    setLoading(true);
    setError(null);
    //fix then then then
    const auth = getAuth(app);
    signInWithPopup(auth, provider)
        .then((result) => {
            result.user.getIdToken()
                .then(token => {
                    let data = JSON.stringify({token: token});        
                    fetch(`${API_HOST}v1/account/signin`,
                        {method: "POST", 
                        body: data,
                        headers: {'Content-Type': 'application/json'}})
                        .then( response => {
                            if(response.ok){
                                response.json().then( account =>{
                                    console.log(account)
                                    dispatch(addAccount(account));
                                    dispatch(showLogin(false));
                                })
                            }else{
                                console.log(response.json());
                            }
                        }).catch( error => {
                                console.log(error);
                                //setError(error.message);
                                
                        }).finally( () => setLoading(false));
                    })
        }).catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
            setLoading(false);
        });
}

const hideLogin = () => {
    if(!isLoading){
        dispatch(showLogin(false));
    }
}

return (
    <div className="login">
        <div className="background" onClick={hideLogin} />
        {(!isLoading) ? 
            <div className="container">
                <div className="logo">
                    <p>CEDIX</p>
                </div>
                {error && <p id="error">{error}</p>}
                <p>Log in with:</p>
                <button id="gmail" onClick={gmailLogin}><i class="fab fa-google"></i><span>Gmail</span></button>
                <button id="twitter" onClick={twitterLogin}><i class="fab fa-twitter"></i><span>Twitter</span></button>
                <button id="facebook" onClick={facebookLogin}><i class="fab fa-facebook-f"></i><span>Facebook</span></button>
            </div> 
            :
            <div>
                <div class="loadingio-spinner-eclipse-rxkb3szgim"><div class="ldio-vh4jl67dfj8">
                <div></div>
                </div></div>
            </div>
        }
    </div>
);
}

export default Login;



