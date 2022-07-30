import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import NoteContext from '../context/notes/NoteContext'

export default function Navbar() {
  const { loginstatus, setloginstatus } = useContext(NoteContext)
  const history = useHistory();
  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-dark p-1" id='navbar'>
      <div className="container-fluid ">
        <Link className="navbar-brand " to="#">Digital-Ledger</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link " to="/home">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
          </ul>
          <div className="d-flex">
            <ul className="navbar-nav">
              {loginstatus && <li className="btn btn-primary mx-1 px-1" onClick={() => { localStorage.removeItem('auth-token'); history.push("/login"); setloginstatus(false) }}>Logout</li>}
              {!loginstatus && <Link className="btn btn-primary mx-1 px-1" to="/login">Login</Link>}
              {!loginstatus && <Link className="btn btn-primary mx-1 px-1" to="/signup">Sign Up</Link>}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}
