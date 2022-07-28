import React, { useState, useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'

export default function Createnote() {
    const {addnote}=useContext(NoteContext)
    const [newNote, setNewNote]=useState({title: '',tag: '',discription: ''})
        const handleonchange =(event)=>{
            setNewNote({...newNote,[event.target.name]:event.target.value}) 
        }
        const submitnote=()=>{
            addnote(newNote)
            setNewNote({title: '',tag: '',discription: ''})
        }

    return (

        <div className='m-4 p-3 col-md-7 d-inline-block border' >
            <h2 className='container text-center'>Create Note</h2>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="email" className="form-control" id="title" value={newNote.title} name="title" onChange={handleonchange} placeholder="Enter title here" />
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <input type="email" className="form-control" id="tag" value={newNote.tag} name="tag" onChange={handleonchange} placeholder="Enter tag here" />
            </div>
            <div className="mb-3">
                <label htmlFor="discription" className="form-label">discription</label>
                <textarea className="form-control" id="discription" value={newNote.discription} name="discription" onChange={handleonchange} rows="3"></textarea>
            </div>
            <div className='text-center'>
                <button type="reset" className="btn btn-primary btn-lg" onClick={submitnote}>Create Note</button>
            </div>
        </div>
    )
}
