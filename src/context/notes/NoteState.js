import { useState } from "react";
import NoteContext from "./NoteContext";
const NoteState = (props) => {
    const url = 'http://localhost:4000';
    // const url = '';
    let a = [];
    // a = [{ title: 'this is title', tag: 'this is tag', discription: 'this is discription', _id: '1' }, { title: '2this is title', tag: '3this is tag', discription: 'this is discription', _id: '2' }, { title: '3this is title', tag: 'this is tag', discription: 'this is discription', _id: '3' }, { title: '4this is title', tag: 'this is tag', discription: 'this is discription', _id: '4' }, { title: '5this is title', tag: 'this is tag', discription: 'this is discription', _id: '5' }, { title: '6this is title', tag: 'this is tag', discription: 'this is discription', _id: '6' }, { title: '7this is title', tag: 'this is tag', discription: 'this is discription', _id: '7' }]
    const [usernotes, setnotes] = useState(a)


    const fetchnotes = async () => {
        let response = await fetch(`${url}/api/notes/read`, { method: 'get', headers: { 'auth-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyIjp7ImlkIjoiNjJlMzliZGRlNTVkODBiYjVlMWE4ZjI1In0sImlhdCI6MTY1OTA4Mzc0MX0.3TEoKTq9it7as8WL5_4oVrUzfk5uz5cBiqzrc_YhD5Q` } });
        a = await response.json();
        setnotes(a)
    }

    const addnote = async (newnote) => {
        const jsonnote = await JSON.stringify(newnote)
        const response = await fetch(`${url}/api/notes/create`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyIjp7ImlkIjoiNjJlMzliZGRlNTVkODBiYjVlMWE4ZjI1In0sImlhdCI6MTY1OTA4Mzc0MX0.3TEoKTq9it7as8WL5_4oVrUzfk5uz5cBiqzrc_YhD5Q`
            },
            body: jsonnote
        });
        newnote= await response.json()
        setnotes(usernotes.concat(newnote))
        triggeralert({ type: 'success', msg: 'Note is successfully added' })
    }

    const editnote = async () => {
        let index = 0
        for (index; usernotes[index]._id !== tempnote._id; index++) { }
        const jsonnote = JSON.stringify(tempnote)
        await fetch(`${url}/api/notes/update/${usernotes[index]._id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyIjp7ImlkIjoiNjJlMzliZGRlNTVkODBiYjVlMWE4ZjI1In0sImlhdCI6MTY1OTA4Mzc0MX0.3TEoKTq9it7as8WL5_4oVrUzfk5uz5cBiqzrc_YhD5Q`
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

    const deletenote = async (deletenoteid) => {

        await fetch(`${url}/api/notes/delete/${deletenoteid}`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyIjp7ImlkIjoiNjJlMzliZGRlNTVkODBiYjVlMWE4ZjI1In0sImlhdCI6MTY1OTA4Mzc0MX0.3TEoKTq9it7as8WL5_4oVrUzfk5uz5cBiqzrc_YhD5Q`
            }
        });
        setnotes(usernotes.filter((note) => { return note._id !== deletenoteid }))
        triggeralert({ type: 'success', msg: 'Note is successfully deleted' })
    }

    const [tempnote, settemp] = useState({ title: 'this is temp title', tag: 'this is temp tag', discription: 'this is temp discription' })
    const settempnote = (note) => {
        settemp(note);
    }

    const [alert, setalert] = useState(null)
    const triggeralert = (alert) => {
        setalert({ type: alert.type, msg: alert.msg })
        setTimeout(() => setalert(null), 1500)
    }
    return (
        <NoteContext.Provider value={{ usernotes, addnote, deletenote, fetchnotes, tempnote, settempnote, editnote, alert }}>
            {props.children}
        </NoteContext.Provider>
    )

}
export default NoteState;