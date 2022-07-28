import React, { useContext, useEffect } from 'react'
import NoteContext from '../context/notes/NoteContext'
import Createnote from './Createnote'
import Editnote from './Editnote'
import Note from './Note'
// import _ from 'lodash'

export default function Home() {
    const { usernotes, fetchnotes } = useContext(NoteContext)
    useEffect(() => {
        fetchnotes()
        // eslint-disable-next-line
    }, [usernotes])
    return (
        <>
            <div className="d-flex flex-wrap justify-content-evenly ">
                <Createnote />
                <Editnote />
                <div className='col-md-3 m-4 p-2 d-inline-block border ' >
                    <h2 className='container text-center'>Notes</h2>
                    <div className='d-flex flex-wrap justify-content-around overflow-auto' id='note-items'>
                        {usernotes.map((note, i) => {
                            return <Note key={note._id} title={note.title} tag={note.tag} discription={note.discription} _id={note._id} i={i + 1} />
                            // return <Note key={note._id} note={note} i={i + 1} />
                        })}
                    </div>
                </div>
            </div>
        </>

    )
}
