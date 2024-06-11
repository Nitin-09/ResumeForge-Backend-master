const express = require('express')
const router = express.Router()
const Resume = require('../models/Resume')
const fetchuser = require('../middleware/fetchuser');

// Route 1: adding a new note using post:- localhost:5000/api/notes/addnote
router.post('/createresume', fetchuser, async (req, res) => {
    try {
        const resume = new Resume({ user: req.user.id, data: {} });
        const newResume = await resume.save();
        res.json(newResume);
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});
router.post('/fetchResume', fetchuser, async (req, res) => {
    try {
        const resume = await Resume.find({ user: req.user.id, _id: req.body.rid }).select("-_id").select("-user").select("-__v");
        res.json(resume)
    } catch (error) {

        console.error(error.message)
        res.status(500).send({ error: error.message });

    }

})
router.post('/fetchAllResume', fetchuser, async (req, res) => {
    try {
        const resume = await Resume.find({ user: req.user.id })
        res.json(resume)
    } catch (error) {

        console.error(error.message)
        res.status(500).send({ error: error.message });

    }

})

router.post('/submitdetails/:id', fetchuser, async (req, res) => {
    try {
        const existingResume = await Resume.findById(req.params.id);

        if (!existingResume) {
            return res.status(404).json({ error: 'Resume not found' });
        }

        const newDetails = req.body;

        // Merge existing data with new details
        const updatedData = {
            ...existingResume.data,
            ...newDetails
        };

        const updatedResume = await Resume.findByIdAndUpdate(
            req.params.id,
            { $set: { data: updatedData } },
            { new: true }
        );

        res.status(200).json(updatedResume);
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});

// Change the route to use DELETE method
router.delete('/deleteform/:id', fetchuser, async (req, res) => {
    try {
        const existingResume = await Resume.findById(req.params.id);

        if (!existingResume) {
            return res.status(404).json({ error: 'Resume not found' });
        }

        const formTypeToDelete = req.body.formType;
        const formDataToDelete = req.body.formData;

        // Customize the logic based on the form type
        let updatedForms;
        let updatedKeys;

        if (formTypeToDelete === 'sectionForms') {
            // Assuming the section form data is stored in 'data.sectionForms'
            updatedForms = existingResume.data.sectionForms.filter(
                (form) => form['SectionTitle'].toUpperCase() !== formDataToDelete.toUpperCase()
            );

            // Assuming the section form keys are stored in 'data.sectionKeys'
            updatedKeys = existingResume.data.sectionKeys.filter(
                (key) => key !== formDataToDelete
            );

            updatedOrder = existingResume.sectionOrder.filter(
                (order) => order !== formDataToDelete.toUpperCase()
            )
        } else {
            // Customize this block for other form types
            // For example, assuming other form data is stored in 'data.otherForms'
            updatedForms = existingResume.data[formTypeToDelete].filter(
                (form, index) => index !== formDataToDelete
            );

            // Assuming other form keys are stored in 'data.otherFormKeys'
            updatedKeys = existingResume.data.sectionKeys;
        }

        // Update the existing resume with the filtered forms and keys
        const updatedResume = await Resume.findByIdAndUpdate(
            req.params.id,
            { $set: { [`data.${formTypeToDelete}`]: updatedForms, [`data.${"sectionKeys"}`]: updatedKeys } },
            { new: true }
        );

        res.status(200).json(updatedResume);
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});


router.delete('/deleteresume/:id', fetchuser, async (req, res) => {
    try {
        const existingResume = await Resume.findById(req.params.id);

        if (!existingResume) {
            return res.status(404).json({ error: 'Resume not found' });
        }

        // Delete the resume
        await existingResume.remove();

        res.status(200).json({ message: 'Resume deleted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});





module.exports = router;