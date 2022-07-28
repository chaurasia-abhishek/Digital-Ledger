import { useState } from "react";
import NoteContext from "./NoteContext";
const NoteState = (props) => {
    const url = 'http://localhost:4000';
    // const url = '';
    let a = [];
    // a = [{ title: 'this is title', tag: 'this is tag', discription: 'this is discription' }, { title: '2this is title', tag: '3this is tag', discription: 'this is discription' }, { title: '3this is title', tag: 'this is tag', discription: 'this is discription' }, { title: '4this is title', tag: 'this is tag', discription: 'this is discription' }, { title: '5this is title', tag: 'this is tag', discription: 'this is discription' }, { title: '6this is title', tag: 'this is tag', discription: 'this is discription' }, { title: '7this is title', tag: 'this is tag', discription: 'this is discription' }]
    const [usernotes, setnotes] = useState(a)


    const fetchnotes = async () => {
        let response = await fetch(`${url}/api/notes/read`, { method: 'get', headers: { 'auth-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyIjp7ImlkIjoiNjJlMDEyYzhjOTRjNmQ0NTEyNzczNTg0In0sImlhdCI6MTY1ODg1MjA1OH0.GsukL3udH4mj4kS9WlWRkZB8LK6QPSH1su8-FZbVGkw` } });
        a = await response.json();
        setnotes(a)
    }

    const addnote = async (newnote) => {
        setnotes(usernotes.concat(newnote))
        const jsonnote = await JSON.stringify(newnote)
        let response = await fetch(`${url}/api/notes/create`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyIjp7ImlkIjoiNjJlMDEyYzhjOTRjNmQ0NTEyNzczNTg0In0sImlhdCI6MTY1ODg1MjA1OH0.GsukL3udH4mj4kS9WlWRkZB8LK6QPSH1su8-FZbVGkw`
            },
            body: jsonnote
        });
    }

    const editnote = async () => {
        let index = 0
        for (index; usernotes[index]._id !== tempnote._id; index++) { }
        const jsonnote = JSON.stringify(tempnote)
        let response = await fetch(`${url}/api/notes/update/${usernotes[index]._id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyIjp7ImlkIjoiNjJlMDEyYzhjOTRjNmQ0NTEyNzczNTg0In0sImlhdCI6MTY1ODg1MjA1OH0.GsukL3udH4mj4kS9WlWRkZB8LK6QPSH1su8-FZbVGkw`
            },
            body: jsonnote
        });

        let newusernote = usernotes;
        newusernote[index].title = tempnote.title
        newusernote[index].discription = tempnote.discription
        newusernote[index].tag = tempnote.tag
        setnotes(newusernote)


    }

    const deletenote = async (deletenoteid) => {

        setnotes(usernotes.filter((note) => { return note._id !== deletenoteid }))
        let response = await fetch(`${url}/api/notes/delete/${deletenoteid}`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyIjp7ImlkIjoiNjJlMDEyYzhjOTRjNmQ0NTEyNzczNTg0In0sImlhdCI6MTY1ODg1MjA1OH0.GsukL3udH4mj4kS9WlWRkZB8LK6QPSH1su8-FZbVGkw`
            }
        });
    }

    const [tempnote, settemp] = useState({ title: 'this is temp title', tag: 'this is temp tag', discription: 'this is temp discription' })
    const settempnote = (note) => {
        settemp(note);
    }
    return (
        <NoteContext.Provider value={{ usernotes, addnote, deletenote, fetchnotes, tempnote, settempnote, editnote }}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;