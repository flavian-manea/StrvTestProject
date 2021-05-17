const express = require('express')
const initializeFireBase = require('../firebase/firebase')


const router = express.Router()
const db = initializeFireBase()


/**
 * Route action needed to display contacts for a given user that requests read access
 */

router.get('/', async (req, res) => {

    const snapshot = await db.collection('contacts').doc(req.user.email).collection('contactList').get();
    const contactObject = {}
    snapshot.forEach((doc) => {
        contactObject[doc.id] = doc.data()
    });
    res.status(200).json(contactObject);

})


/**
 * Route action needed to create contacts for a given user that requests write access
 */

router.post('/', async (req, res) => {
    const userEmail = req.user.email
    const docRef = db.collection('contacts').doc(userEmail).
        collection("contactList").doc(req.body.firstName + " " + req.body.lastName);
    await docRef.set({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        userID: req.user.id
    });
    res.sendStatus(201)
})

module.exports = router