const express = require('express');
const router = express.Router();

const Place = require('../models/Place.model')

router.get("/places", (req, res, next) => {

    Place
        .find()
        .then(places => res.render('places/list-place', { places }))
        .catch(err => console.log(err))
})

router.get("/places/create", (req, res, next) => {

    res.render("places/create-place")
})


router.post("/places/create", (req, res, next) => {

    const { name, type, longitude, latitude } = req.body
    const location = {
        type: 'point',
        coordinates: [longitude, latitude]
    }

    Place

        .create({ name, type, location })
        .then(() => res.redirect(`/places`))
        .catch(err => console.log(err))
})


router.get("/places/edit/:id", (req, res, next) => {

    const { id } = req.params

    Place
        .findByIdAndUpdate(id)
        .then(place => res.render("places/edit-place", place))
        .catch(err => console.log(err))
})

router.post("/places/edit/:id", (req, res, next) => {

    const { name, type, longitude, latitude } = req.body
    const location = {
        type: 'point',
        coordinates: [longitude, latitude]
    }
    const { id } = req.params

    Place
        .findByIdAndUpdate(id, { name, type, location })
        .then(() => res.redirect(`/places`))
        .catch(err => console.log(err))
})


router.post("/places/delete/:id", (req, res, next) => {

    const { id } = req.params

    Place
        .findByIdAndDelete(id)
        .then(() => res.redirect('/places'))
        .catch(err => console.log(err))
})



module.exports = router