import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'

export default function Note(props) {
    const { title = 'this is title1', tag = 'this is tag1', discription = 'this is discription1', i, _id = 'undefine' } = props
    const { deletenote, settempnote } = useContext(NoteContext)
    return (
        <div className='m-1'>
            <div className="card-body d-flex flex-column align-items-center py-2 py-1 form-control border-dark" >
                <h5 className="card-title">{i}. {title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{tag}</h6>
                <p className="card-text m-0 text-center">{discription} </p>
                <div className='d-flex justify-content-center'>
                    <i className="fa-solid fa-pen-to-square p-1 m-1" data-bs-toggle="modal" data-bs-target="#exampleModal" name={_id} onClick={(e) => { settempnote(props) }}></i>
                    <i className="fa-solid fa-trash p-1 m-1 " name={_id} onClick={(e) => { deletenote(_id) }}></i>
                </div>
            </div>
        </div>
    )
}
