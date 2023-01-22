import React, { useState } from 'react';
import './LoginForm.css'
import { Link } from 'react-router-dom';
import { FacebookAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider, OAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import app from '../Firebase/Firebase.init';
const auth = getAuth(app);

const LoginForm = () => {
const [error,setError]=useState('')
const [success,setSuccess]=useState(false)
const [isLogin,setLogin]=useState(false);
const [user,setUser]=useState({});
const {displayName,email,photoURL}=user;

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);


        signInWithEmailAndPassword(auth,email,password)
        .then((result)=>{
            const user=result.user;
            setUser(user);
             setLogin(true);
            
            console.log(user);

        })
        .catch((error)=>{
            console.error(error.message);
            if(error.message === 'Firebase: Error (auth/wrong-password).'){
                setError('Wrong password!!.');
                return;
            }
            
        })

    }

    // I can enable Firebase Login System .

    // Providers 
    const googleProvider=new GoogleAuthProvider();
    const microsoftProvider=new OAuthProvider('microsoft.com')
    const githubProvider=new GithubAuthProvider();
    const facebookProvider=new FacebookAuthProvider()

    // Login With Google 
    const handleGoogleLogin=()=>{
        signInWithPopup(auth,googleProvider)
        .then((result)=>{
            const user=result.user;
            setUser(user);
            setLogin(true);
            console.log(result);
            

        })
        .catch((error)=>{
            console.error(error);
        })
    }

    // Login with Microsoft 
    const handleMicrosoftLogin=()=>{
        signInWithPopup(auth,microsoftProvider)
        .then((result)=>{
            const user=result.user;
            setUser(user)
            setLogin(true);
        })
        .catch((error)=>{
            console.error(error);
        })
    }

    // login with Github 
    const handleGitHubLogin=()=>{
    signInWithPopup(auth,githubProvider)
    .then((result)=>{
      const user=result.user;
      setUser(user);
      setLogin(true);
      console.log(user)
    })
    .catch((error)=>{
        console.log(error)
    })

    }

    // login with Facebook 
   const handleFacebookLogin=()=>{
    signInWithPopup(auth,facebookProvider)
    .then((result)=>{
        const user=result.user;
        setUser(user);
        setLogin(true);
        console.log(user);
    })
    .catch((error)=>{
        console.error(error)
    })
   }


    return (
        <div>
        {
            isLogin?
            <div>
             <h3>Yea Login Successfully.!!</h3>
             <h5>{displayName}</h5>
              <h5>{email}</h5>
              <img src={photoURL} alt=""/>
            </div>:
            <div className='login-parent'>
            <h2>Please Login</h2>
            <form onSubmit={handleLogin} className='login-form'>
                <div className='input'>
                    <p>Email</p>
                    <input type='email' name='email' />
                </div>
                <div className='input'  >
                    <p>Password</p>
                    <input type='password' name='password' />
                </div>
                <div>
                    <p className='error'><small>{error}</small></p>
                </div>
                <div className='submit-btn'>
                    <button type='submit' >Login</button>
                </div>
                <div>
                    <p><small>Not a member?<Link to='/register'>Register</Link></small></p>
                </div>
                <div>
                    <h6>or <small>Login With</small></h6>
                </div>
                <div className='login-with'>
                    <button onClick={handleGoogleLogin}>Google</button>
                    <button onClick={handleMicrosoftLogin}>Microsoft</button>
                    <button onClick={handleGitHubLogin}>GitHub</button>
                    <button onClick={handleFacebookLogin}>Facebook</button>
                    <button>Twitter</button>
                </div>

            </form>
        </div>
        }
        
        </div>

      

    );
};

export default LoginForm;