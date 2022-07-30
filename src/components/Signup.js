import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import NoteContext from '../context/notes/NoteContext';

export default function Signup() {
  const { triggeralert } = useContext(NoteContext)

  const [newusercredentials, setnewusercredentials,] = useState({ email: '', password: '', name: '' })
  let history = useHistory();
  const onchange = (event) => {
    setnewusercredentials({ ...newusercredentials, [event.target.name]: event.target.value })
  }
  const newusercredentialslogin = async (event) => {
    event.preventDefault();
    const jsonnewusercredentialslogin = JSON.stringify(newusercredentials)
    const response = await fetch(`http://localhost:4000/api/auth/signup`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: jsonnewusercredentialslogin
    });
    const logintoken = await response.json()
    if (logintoken.success) {
      localStorage.setItem('auth-token', logintoken.authToken)
      history.push("/")
      triggeralert({ type: 'success', msg: 'Signup successfully' })
    }
    else
      triggeralert({ type: 'success', msg: logintoken.error[0].msg ? logintoken.error[0].msg : logintoken.error })
  }

  return (
    <div className="container">
      <form onSubmit={newusercredentialslogin}>
        <h3 className='text-center'>Signup To Use Digital-ledger</h3>
        <div className="mb-3">
          <label htmlFor="exampleInputName1" className="form-label">Name</label>
          <input autoComplete="off" type="name" className={`form-control ${newusercredentials.name.length > 0 && newusercredentials.name.length < 3 ? 'border-danger' : ''}`} name='name' value={newusercredentials.name} onChange={onchange} id="exampleInputName1" aria-describedby="nameHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input autoComplete="off" type="email" className={`form-control ${newusercredentials.email.length > 0 && !newusercredentials.email.includes('@') ? 'border-danger' : ''}`} name='email' value={newusercredentials.email} onChange={onchange} id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input autoComplete="off" type="password" className={`form-control ${newusercredentials.password.length > 0 && newusercredentials.password.length < 3 ? 'border-danger' : ''}`} name='password' value={newusercredentials.password} onChange={onchange} id="exampleInputPassword1" />
        </div>
        <button type='submit' className="btn btn-primary" disabled={newusercredentials.password === '' || newusercredentials.name === '' || newusercredentials.email === '' || !newusercredentials.email.includes('@')} >SignUp</button>
      </form>
    </div>
  )
}
