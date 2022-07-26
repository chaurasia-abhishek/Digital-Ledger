const express = require('express')
const router = express.Router()
const note = require('../models/note')
const fetchUserId = require('../middleware/login')
const { body, validationResult, header } = require('express-validator'); //to set rules for new user registration

//route:1  get api/notes/read
//login required
//to send users available notes
router.get('/read', fetchUserId, async (req, res) => {
    try {
        let Notes = await note.find({ User: req.User.id })
        res.json(Notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('internal server error')
    }
})

//route:2  post api/notes/create
//login required
//to create notes by user

router.post('/create', [
    body('title', 'title contain atleast 3 character').isLength({ min: 3 }),
    body('discription', 'discription contain atleast 5 character').isLength({ min: 5 })
], fetchUserId, async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty())
        return res.status(400).json({ error: error.array() })
    try {
        const { title, discription, tag } = req.body
        const newNote = new note({
            title: title,
            discription: discription,
            tag: tag,
            User: req.User.id //adding user id as user geting from request header 
        })
        newNote.save()
        res.json(newNote)

    } catch (error) {
        console.error(error.message);
        res.status(500).send('internal server error')
    }
})

//route:3  put api/notes/update/id
//login required
//note id required 
//to update notes by user

router.put('/update/:id', fetchUserId, async (req, res) => {
    let Note = await note.findById(req.params.id)
    if (!Note)
        return res.status(404).send('note not found')
    if (Note.User.toString() !== req.User.id)
        return res.status(401).send('not allowed')
    try {
        const { title, discription, tag } = req.body
        const newNote = {};
        if (title)
            newNote.title = title
        if (discription)
            newNote.discription = discription
        if (tag)
            newNote.tag = tag
        Note = await note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json(Note)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('internal server error')
    }

})

//route:4  put api/notes/delete/id
//login required
//note id required 
//to delete note by user

router.delete('/delete/:id', fetchUserId, async (req, res) => {
    let Note = await note.findById(req.params.id);
    if (!Note)
        return res.status(404).send('note not found')
    if (Note.User.toString() !== req.User.id)
        return res.status(401).send('not allowed')
    try {
        Note = await note.findByIdAndDelete(req.params.id)
        res.status(200).json(Note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('internal server error')
    }
})
module.exports = router;