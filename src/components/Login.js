import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import NoteContext from '../context/notes/NoteContext';

export default function Login() {
    const { triggeralert } = useContext(NoteContext)
    const [usercredentials, setusercredentials] = useState({ email: '', password: '' })
    let history = useHistory();
    const onchange = (event) => {
        setusercredentials({ ...usercredentials, [event.target.name]: event.target.value })
    }
    const usercredentialslogin = async (event) => {
        event.preventDefault();
        const jsonusercredentialslogin = JSON.stringify(usercredentials)
        const response = await fetch(`http://52.41.128.88:3000/api/auth/login`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: jsonusercredentialslogin
        });
        const logintoken = await response.json()
        if (logintoken.success) {
            localStorage.setItem('auth-token', logintoken.authToken)
            history.push("/")
            triggeralert({ type: 'success', msg: 'login successfully' })
        }
        else
            triggeralert({ type: 'success', msg: logintoken.error[0].msg ? logintoken.error[0].msg : logintoken.error })
    }

    return (
        <div className="container">
            <form onSubmit={usercredentialslogin}>
                <h3 className='text-center'>Login To Use Digital-ledger</h3>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input autoComplete="off" type="email" className={`form-control ${usercredentials.email.length > 0 && !usercredentials.email.includes('@') ? 'border-danger' : ''}`} name='email' value={usercredentials.email} onChange={onchange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input autoComplete="off" type="password" className={`form-control ${usercredentials.password.length > 0 && usercredentials.password.length < 3 ? 'border-danger' : ''}`} name='password' value={usercredentials.password} onChange={onchange} id="exampleInputPassword1" />
                </div>
                <button type='submit' className="btn btn-primary" disabled={usercredentials.password === '' || usercredentials.email === '' || !usercredentials.email.includes('@')} >Login</button>
            </form>
        </div>
    )
}
