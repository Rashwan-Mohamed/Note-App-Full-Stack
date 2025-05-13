import React from 'react'
import Form from './Form'
import { Link } from 'react-router'

export default function Register() {
    return (
        <div className="sectionWrapper">
            <section className='signInForm'>
                <h1>Hello, Register a new Account!</h1>
                <Form operation={'register'}></Form>
                <p>Already a user?, Sign In or contiune as a guest</p>
                <ul className='controllBtns' >
                    <li>
                        <Link className='ftbtn btas' to='/'>Sign In</Link>
                    </li>
                    <li>
                        <Link className='ftbtn btas' to='/guestnotes'>Contiune As a guest</Link>
                    </li>
                </ul>
            </section>
        </div>
    )
}
