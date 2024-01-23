import {useState}     from 'react';
import Helmet         from 'react-helmet';
import axios          from 'axios';
import {toast, Slide} from 'react-toastify';
import {useAuth}      from '../../context/auth';
import {FaGoogle, FaApple, FaFacebookF} from 'react-icons/fa';

function SignIn(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [auth, setAuth] = useAuth();

    async function handleLogin(e) {
        e.preventDefault();
        try{
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth?email=${email}&password=${password}`);
            if(res.data.success){
                toast.success(res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                });
                localStorage.setItem('auth', JSON.stringify(res.data));
                props.toggle();
            }
            else {
                toast.error(res.data.message);
            }
        } catch(error){
            console.log(error);
            toast.error('Something went Wrong!');
        }

        console.log(email, password);
    }

    function signup_btn_clicked(e){

    }

    return (
        <>
        <Helmet>
            <title>Flashy | Sign In</title>
        </Helmet>
        <div className="login-page-wrpr">
            <div className="login-page row p-0">
                <div className="login-img-wrpr col d-flex flex-column p-3">
                    <div className="d-flex justify-content-start">
                        <button className="btn btn-close" onClick={props.toggle}></button>
                    </div>
                    <div className="signin-img-wrpr d-flex flex-column align-items-center justify-content-center">
                        <h2 className="text-dark">New Here?</h2>
                        <h6 className="text-dark">Sign up & discover trendy, fashionable clothes daily!</h6>
                        <div className="signup-btn-wrpr rounded-pill">
                            <button className="signup-btn btn border-0 ps-3 pe-3 rounded-pill" onClick={signup_btn_clicked}>Sign Up</button>
                        </div>
                    </div>
                    <div className="d-flex flex-column h-100 justify-content-center">
                        <div className="login-img"></div>
                    </div>
                </div>
                <div className="col login-page-det p-3 text-light">
                    <div className="d-flex flex-column align-items-center mb-5">
                        <h1 className="signin-label mt-3 mb-0 lh-1">Sign In</h1>
                        <h6 className="mb">welcome to Flashy</h6>
                    </div>
                    <div className="signin-opt-icons-wrpr w-100 d-flex justify-content-center">
                        <div className="google-signin-icon">
                            <FaGoogle color="black"/>
                        </div>
                        <div className="apple-signin-icon">
                            <FaApple color="black"/>
                        </div>
                        <div className="facebook-signin-icon">
                            <FaFacebookF color="black"/>
                        </div>
                    </div>
                    <div className="signin-OR-txt d-flex">
                        <hr className=""/> <p className="mt-2">OR</p> <hr className=""/>
                    </div>
                    <form className="mt-1 d-flex flex-column" onSubmit={handleLogin}>
                        <label>
                            <input className="login-email-input w-100 mb-3 border-1 rounded-0 border-secondary-subtle rounded-1" type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"/>
                        </label>
                        <label className="mb-0">
                            <input className="login-password-input w-100 mb-1 border-1 rounded-0 border-secondary-subtle rounded-1" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"/>
                        </label>
                        <label htmlFor="keep-login" className="keep-login-checkbox d-flex mb-2">
                            <input id="keep-login" className="mt-1" type="checkbox"/>
                            <p className="lh-lg ms-1 mb-0">Keep me logged in</p>
                            {/* <p className="ms-1 mt-1"></p> */}
                        </label>
                        <button className="signin-btn btn bg-transparent p-2 mb-2 border-1 border-light text-light" type="submit">Sign In</button>
                        <button className="forgot-pswd-btn btn bg-transparent p-2 mb-2 border-1 border-light text-light" type="submit">Forgot Password</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default SignIn;