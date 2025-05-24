/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { addNewUser, getUser, newSission, validatePassword } from '../utility';
import InputSlice from './InputSlice';
import { useNavigate } from 'react-router';

// import { redirect } from 'react-router';
// redirect
export default function Form({ operation }) {
    const [user, setUser] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [repeatedEmail, setRepeatedEmail] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        let srros = {};
        let con = true;
        let euser = await getUser('', user);
        let eres = await getUser(email);
        console.log(euser, eres);

        if (operation == 'register') {
            let chps = validatePassword(password);
            // make sure the username is not already taken
            if (euser) {
                srros = { ...srros, 'existingUser': 'this username already exist' }
                con = false;
            }
            // make sure the email is not already registered
            if (eres) {
                srros = { ...srros, 'existingEmail': 'this email address already registered' }
                con = false;
            }
            // make sure the two email`s matches each other
            if (email !== repeatedEmail) {
                srros = { ...srros, 'different': 'email don\'t match' }
                con = false;
            }
            // make sure password is valid (must be atleast 7 charcters long and contains special charcters and lower and uppercase characters)
            if (!chps) {
                srros = { ...srros, 'invalidPassword': 'password has to be atleast 7 charcters long and contain lower & uppercase characters and special charcters' }
                con = false;
            }
            console.log(srros, 'HASSAN');
            setErrors(srros);
            if (Object.keys(srros).length == 0 && con) {
                let res = await addNewUser(email, user, password)
                if (res) {
                    navigate('/')
                }
            }
        }
        else if (operation == 'signIn') {
            console.log('sign in attempt!');
            // the front end in that situation should check if the user & email exist and if true 
            // sends a signIn request to the backend
            if (!euser || !eres) {
                srros = { ...srros, 'credentials': 'credentials not correct' }
                con = false;
                return;
            }
            if (Object.keys(srros).length == 0 && con) {
                let res = await newSission(user, email, password)
                if (res) {
                    navigate(`/notes`)
                }
            }
        }
    }

    console.log(errors);

    return (
        <form className='FORMSINGLE' action={`/notes/${operation}`} method='POST' onSubmit={handleSubmit} >
            <InputSlice error={errors?.existingUser} label={'Please Type Your Username'} type={'text'} name={'username'} value={user} onchange={setUser} ></InputSlice>
            <InputSlice error={errors?.existingEmail} label={'Please Type Your Email'} type={'email'} name={'email'} value={email} onchange={setEmail} />
            {operation == 'register' && <>
                <InputSlice error={errors?.different} label={'Repeat Email Address'} type={'email'} name={'rept'} value={repeatedEmail} onchange={setRepeatedEmail} />
            </>}
            <InputSlice error={errors?.invalidPassword} label={'Please Type In Your Password'} type={'password'} name={'password'} value={password} onchange={setPassword} />
            <button className='ftbtn btas' type='submit'  >SUBMIT</button>
        </form >
    )
}
