import { useState } from "react";
import NoteContext from "./NoteContext";
const NoteState = (props) => {
    const url = 'http://localhost:4000';
    // const url = '';
    let a = [];
    // a = [{ title: 'this is title', tag: 'this is tag', discription: 'this is discription', _id: '1' }, { title: '2this is title', tag: '3this is tag', discription: 'this is discription', _id: '2' }, { title: '3this is title', tag: 'this is tag', discription: 'this is discription', _id: '3' }, { title: '4this is title', tag: 'this is tag', discription: 'this is discription', _id: '4' }, { title: '5this is title', tag: 'this is tag', discription: 'this is discription', _id: '5' }, { title: '6this is title', tag: 'this is tag', discription: 'this is discription', _id: '6' }, { title: '7this is title', tag: 'this is tag', discription: 'this is discription', _id: '7' }]
    const [usernotes, setnotes] = useState(a)

    //read note
    const fetchnotes = async () => {
        let response = await fetch(`${url}/api/notes/read`, { method: 'get', headers: { 'auth-token': localStorage.getItem('auth-token') } });
        a = await response.json();
        setnotes(a)
    }

    //add note 
    const addnote = async (newnote) => {
        const jsonnote = await JSON.stringify(newnote)
        const response = await fetch(`${url}/api/notes/create`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
            body: jsonnote
        });
        newnote = await response.json()
        setnotes(usernotes.concat(newnote))
        triggeralert({ type: 'success', msg: 'Note is successfully added' })
    }

    //edit note
    const editnote = async () => {
        let index = 0
        for (index; usernotes[index]._id !== tempnote._id; index++) { }
        const jsonnote = JSON.stringify(tempnote)
        await fetch(`${url}/api/notes/update/${usernotes[index]._id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
            body: jsonnote
        });
        let newusernote = usernotes;
        newusernote[index].title = tempnote.title
        newusernote[index].discription = tempnote.discription
        newusernote[index].tag = tempnote.tag
        setnotes(newusernote)
        triggeralert({ type: 'success', msg: 'Note is successfully edited' })
    }

    //delete note
    const deletenote = async (deletenoteid) => {
        await fetch(`${url}/api/notes/delete/${deletenoteid}`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            }
        });
        setnotes(usernotes.filter((note) => { return note._id !== deletenoteid }))
        triggeralert({ type: 'success', msg: 'Note is successfully deleted' })
    }

    //temp note use in edit note
    const [tempnote, settemp] = useState({ title: 'this is temp title', tag: 'this is temp tag', discription: 'this is temp discription' })
    const settempnote = (note) => {
        settemp(note);
    }

    //alert module
    const [alert, setalert] = useState(null)
    const triggeralert = (alert) => {
        setalert({ type: alert.type, msg: alert.msg })
        setTimeout(() => setalert(null), 1500)
    }

    //login status module
    const [loginstatus, setloginstatus] = useState(false)
    return (
        <NoteContext.Provider value={{ usernotes, addnote, deletenote, fetchnotes, tempnote, settempnote, editnote, alert, triggeralert, loginstatus, setloginstatus }}>
            {props.children}
        </NoteContext.Provider>
    )

}
export default NoteState;