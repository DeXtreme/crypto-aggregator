import { getAuth, 
        signInWithPopup,
        GoogleAuthProvider,
        TwitterAuthProvider,
        FacebookAuthProvider } from "firebase/auth";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import app from "../../firebase";
import { showLogin } from '../../store/actions'; 
import './login.css';

function Login(){
    let dispatch = useDispatch();

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
        const auth = getAuth(app);
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                console.log(user)
            }).catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage)
            });
    }

    const hideLogin = () => dispatch(showLogin(false));

    return (
        <div className="login">
            <div className="background" onClick={hideLogin} />
            <div className="container">
                <div className="logo">
                    <p>CEDIX</p>
                </div>
                <p>Log in with:</p>
                <button id="gmail" onClick={gmailLogin}><i class="fab fa-google"></i><span>Gmail</span></button>
                <button id="twitter" onClick={twitterLogin}><i class="fab fa-twitter"></i><span>Twitter</span></button>
                <button id="facebook" onClick={facebookLogin}><i class="fab fa-facebook-f"></i><span>Facebook</span></button>
            </div>
        </div>
    );
}

export default Login;