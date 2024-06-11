const express = require('express')
const router = express.Router()
const Tempelates = require('../models/Tempelates')

// Route 1: adding a new note using post:- localhost:5000/api/notes/addnote
router.post('/insertTempelate',
    async (req, res) => {
        try {
            const tempelate = new Tempelates({ tempelateURL: req.body.tempelateURL })
            const tempelateData = await tempelate.save()
            res.json(tempelateData)

        } catch (error) {
            console.error(error.message)
            res.status(500).send(error.message);
        }
    })
router.get('/getTempelates', async (req, res) => {
    try {
        const tempelate = await Tempelates.find()
        res.send(tempelate)
    } catch (error) {

        console.error(error.message)
        res.status(500).send({error: error.message() });

    }

})

module.exports = router;