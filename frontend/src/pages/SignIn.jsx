import {Link} from 'react-router'
import Form from './Form.jsx'
import SignGuest from "../components/organisms/SignGuest.jsx";

export default function SignIn() {
    return (
        <>
            <div className="sectionWrapper">
                <section className='signInForm'>
                    <h1>Hello, please Sign In to Access you notes</h1>
                    <Form operation={'signIn'}></Form>
                    <p>not a user?, create a new account or contiune as a guest</p>
                    <ul className='controllBtns'>

                        <li>
                            <Link className='ftbtn btas' to='/register'>Register a new Account</Link>
                        </li>
                        <li>
                            <SignGuest></SignGuest>
                        </li>
                    </ul>
                </section>
            </div>
        </>
    )
}
