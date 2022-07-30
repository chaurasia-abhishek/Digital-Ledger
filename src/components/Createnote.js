import React, { useState, useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'

export default function Createnote() {
    const { addnote } = useContext(NoteContext)
    const [newNote, setNewNote] = useState({ title: '', tag: '', discription: '' })
    const handleonchange = (event) => {
        setNewNote({ ...newNote, [event.target.name]: event.target.value })
    }
    const submitnote = () => {
        addnote(newNote)
        setNewNote({ title: '', tag: '', discription: '' })
    }

    return (

        <div className='m-1 p-3 col-md-7 d-inline-block' >
            <h2 className='container text-center'>Create Note</h2>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title*</label>
                <input className={`form-control ${newNote.title.length > 0 && newNote.title.length < 3 ? 'border-danger' : ''}`} id="title" value={newNote.title} name="title" onChange={handleonchange} placeholder="Enter title here (minimum 3 characters)" />
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <input className={`form-control`} id="tag" value={newNote.tag} name="tag" onChange={handleonchange} placeholder="Enter tag here" />
            </div>
            <div className="mb-3">
                <label htmlFor="discription" className="form-label">Discription*</label>
                <textarea className={`form-control ${newNote.discription.length > 0 && newNote.discription.length < 5 ? 'border-danger' : ''}`} id="discription" value={newNote.discription} name="discription" onChange={handleonchange} rows="3" placeholder="Enter discription here (minimum 5 characters)"></textarea>
            </div>
            <div className='text-center'>
                <button type="reset" className="btn btn-primary btn-lg" disabled={newNote.title.length < 3 || newNote.discription.length < 5} onClick={submitnote} >Create Note</button>
            </div>
        </div>
    )
}
