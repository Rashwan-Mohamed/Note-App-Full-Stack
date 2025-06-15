
import Form from './Form.jsx'
import { Link } from 'react-router'
import SignGuest from "../components/organisms/SignGuest.jsx";

export default function Register() {

    return (
        <div className="sectionWrapper">
            <section className='signInForm'>
                <h1>Hello, Register a new Account!</h1>
                <Form operation={'register'}></Form>
                <p>Already a user?, Sign In or continue as a guest</p>
                <ul className='controllBtns' >
                    <li>
                        <Link className='ftbtn btas' to='/'>Sign In</Link>
                    </li>
                    <li>
                        <SignGuest />
                    </li>
                </ul>
            </section>
        </div>
    )
}
