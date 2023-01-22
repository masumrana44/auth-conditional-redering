 import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import app from '../Firebase/Firebase.init';
import './Register.css'

const auth = getAuth(app);
const Register = () => {
    const [error, setError] = useState('');
    const handleRgister = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, email, password)
        setError('');

        //    password Validation 
        if (!/(?=.*[A-Z])/.test(password)) {
            setError('Please at least one Uppercase character !!')
            return
        }
        if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
            setError('Please At list one Special character !!')
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const user = result.user;
                form.reset();
                verifyEmail();
                profileUpdate(name)
                console.log(user);


            })
            .catch((error) => {
                console.error(error);
                if (error.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
                    setError('Please, Password Should be at least 6 characters')
                    return
                }
                if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
                    setError('This Email Already Use.Please Register new Email')
                    return;
                }


            })

    }



    // addiing name or updating profile 
    const profileUpdate = (name) => {
        updateProfile(auth.currentUser, {
            displayName: name
        })
            .then(() => {
                console.log('Updated User Profile')
            })
            .catch((error) => {
                console.error(error);
            })
    }

    // for Vferification Email 
    const verifyEmail = () => {
        sendEmailVerification(auth.currentUser)
            .then(() => {
                alert('Please Verify Your Email.Cheak your Email')
            })
            .catch((error => {
                console.error(error);
            }))
    }



    return (
        <div className='register-parent'>
            <h2>Please Register</h2>
            <form onSubmit={handleRgister} className='register-form'>
                <div className='input'>
                    <p>Name</p>
                    <input type='text' name='name' placeholder='Enter your Name' />
                </div>
                <div className='input'>
                    <p>E-mail</p>
                    <input type='email' name='email' placeholder='Enter your Email' />
                </div>
                <div className='input'>
                    <p>Password</p>
                    <input type='text' name='password' placeholder='Enter Your Password' />
                </div>
                <div>
                    <div className='input'>
                        <p className='error'><small> {error}</small></p>
                    </div>
                </div>
                <div className='submit-btn'>
                    <button type="submit">Register</button>
                </div>
                <div>
                    <p><small>Already have an account? <Link to='/login'>LogIn</Link></small></p>
                </div>
            </form>


        </div>
    );
};

export default Register;