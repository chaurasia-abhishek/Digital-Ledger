import React, { useContext, useRef } from 'react'
import NoteContext from '../context/notes/NoteContext'

export default function Editnote() {
    const { tempnote, settempnote, editnote } = useContext(NoteContext)
    const handleonchange = (event) => {
        settempnote({ ...tempnote, [event.target.name]: event.target.value })
    }
    const ref = useRef(null);
    const submitnote = () => {
        editnote()
        ref.current.click();
    }
    return (
        <div className="modal fade z-index-3" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content p-4">

                    <h3 className="modal-title container text-center" id="exampleModalLabel">EDIT NOTE</h3>

                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title*</label>
                        <input className={`form-control ${tempnote.title.length < 3 ? 'border-danger' : ''}`} id="title" value={tempnote.title} name="title" onChange={handleonchange} placeholder="Enter title here (minimum 3 characters)" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input className={`form-control`} id="tag" value={tempnote.tag} name="tag" onChange={handleonchange} placeholder="Enter tag here" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="discription" className="form-label">Discription*</label>
                        <textarea className={`form-control ${tempnote.discription.length < 5 ? 'border-danger' : ''}`} id="discription" value={tempnote.discription} name="discription" onChange={handleonchange} rows="3" placeholder="Enter discription here (minimum 5 characters)"></textarea>
                    </div>
                    <div className="container text-center">
                        <button type="button" className="btn btn-success mx-2" onClick={submitnote} disabled={tempnote.title.length < 3 || tempnote.discription.length < 5}>Submit</button>
                        <button type="button" className="btn btn-success mx-2" ref={ref} data-bs-dismiss="modal">Close</button>
                    </div>

                </div>
            </div>
        </div>

    )
}
