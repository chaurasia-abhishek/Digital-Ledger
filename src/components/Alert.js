import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'

export default function Alert() {
    const {alert}=useContext(NoteContext)
    return (
        <div className='m-0 p-0' style={{ height: '43px' }}>
            {alert && <div className={`alert alert-${alert.type} m-0 p-2`} role="alert" style={{ height: '42px' }}>
                {alert.msg}
            </div>}
        </div>
    )
}
