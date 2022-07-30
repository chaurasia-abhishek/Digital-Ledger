import React, { useContext, useEffect } from 'react'
import NoteContext from '../context/notes/NoteContext'
import Alert from './Alert'
import Createnote from './Createnote'
import Editnote from './Editnote'
import Note from './Note'

export default function Home() {
    const { usernotes, fetchnotes } = useContext(NoteContext)
    useEffect(() => {
        fetchnotes()
        // eslint-disable-next-line
    }, [])
    return (
        <>
        <Alert />
            <div className="d-flex flex-wrap justify-content-evenly ">
                <Createnote />
                <Editnote />
                <div className='col-md-3 m-1 p-3 d-inline-block' >
                    <h2 className='container text-center'>Notes</h2>
                    <div className='d-flex flex-column  border-success overflow-auto form-control p-1' id='note-items' >
                        {usernotes.length !== 0 ? usernotes.map((note, i) => { return <Note key={note._id} title={note.title} tag={note.tag} discription={note.discription} _id={note._id} i={i + 1} /> })
                            : <h2 className='m-auto'>no notes</h2>}
                    </div>

                </div>
            </div>
        </>

    )
}
