/* eslint-disable react/prop-types */
import { useState } from 'react'
import { addNewUser, getUser, newSession, validatePassword } from '../utility.js';
import { useNavigate } from 'react-router';
import Spinner from "../components/atoms/Spinner.jsx";
import InputSlice from "../components/atoms/InputSlice.jsx";

export default function Form({ operation }) {
    const [user, setUser] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        let srros = {};
        let con = true;
        let eres = await getUser(email);

        if (operation === 'register') {
            let euser = await getUser('', user);
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
            if (password !== repeatedPassword) {
                srros = { ...srros, 'different': 'password don\'t match' }
                con = false;
            }
            if (!chps) {
                srros = {
                    ...srros,
                    'invalidPassword': 'password has to be at least three characters long'
                }
                con = false;
            }
            setErrors(srros);
            if (Object.keys(srros).length === 0 && con) {
                let res = await addNewUser(email, user, password)
                if (res) {
                    navigate('/')
                }
            }
        } else if (operation === 'signIn') {
            console.log('sign in attempt!', eres);
            // the front end in that situation should check if the user & email exist and if true 
            // sends a signIn request to the backend
            if (!eres) {
                srros = { ...srros, 'credentials': 'email is not registered' }
                con = false;
                setErrors(srros);
                return;
            }
            if (Object.keys(srros).length === 0 && con) {
                setIsLoading(true);
                try {
                    let res = await newSession(email, password);
                    if (res) {
                        navigate('/notes');
                    }
                    else {
                        setErrors({ 'credentials': 'credentials not correct' });
                    }
                } finally {
                    setIsLoading(false);
                }
            }
        }
    }

    if (isLoading) {
        return <div className="loading-container"><Spinner /> Signing In...</div>;
    }
    return (
        <form className='FORMSINGLE' action={`/notes/${operation}`} method='POST' onSubmit={handleSubmit}>
            {operation === 'register' &&
                <InputSlice error={errors?.existingUser} label={'Please Type Your Username'} type={'text'}
                    name={'username'} value={user} onchange={setUser}></InputSlice>
            }
            <InputSlice error={errors?.existingEmail} label={'Please Type Your Email'} type={'email'} name={'email'}
                value={email} onchange={setEmail} />
            <InputSlice error={errors?.invalidPassword} label={'Please Type In Your Password'} type={'password'}
                name={'password'} value={password} onchange={setPassword} />
            {operation === 'register' && <>
                <InputSlice error={errors?.different} label={'Repeat Password'} type={'password'} name={'rept'}
                    value={repeatedPassword} onchange={setRepeatedPassword} />
            </>}
            <p className='BadCredentials'> {errors?.credentials && errors?.credentials}
            </p>
            <button className='ftbtn btas' type='submit'>SUBMIT</button>
        </form>
    )
}
