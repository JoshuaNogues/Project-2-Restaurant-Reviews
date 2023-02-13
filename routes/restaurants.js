var express = require('express');
var router = express.Router();

const Restaurant = require('../models/Restaurant.model')

const Review = require('../models/Review.model')

router.get('/view-restaurants', (req, res, next) => {

    Restaurant.find()
    .populate('owner')
    .then((foundRestaurants) => {
        res.render('restaurants/view-restaurants.hbs', { foundRestaurants });
    })
    .catch((err) => {
        console.log(err)
    })

});

router.get('/add-restaurant', (req, res, next) => {
    res.render('restaurants/add-restaurant.hbs');
  });

router.post('/add-restaurant', (req, res, next) => {

    const { name, description, imageUrl } = req.body

    Restaurant.create({
        name,
        description,
        imageUrl,
        owner: req.session.user._id
    })
    .then((createdRestaurant) => {
        console.log(createdRestaurant)
        res.redirect('/restaurants/view-restaurants')
    })
    .catch((err) => {
        console.log(err)
    })

})

router.post('/add-review/:id', (req, res, next) => {

    Review.create({
        user: req.session.user._id,
        comment: req.body.comment
    })
    .then((newReview) => {
       return Room.findByIdAndUpdate(req.params.id, 
            {
                $push: {reviews: newReview._id}
            },
            {new: true})
    })
    .then((restaurantWithReview) => {
        console.log(restaurantWithReview)
        res.redirect(`/restaurant/details/${req.params.id}`)
    })
    .catch((err) => {
        console.log(err)
    })
})
  
module.exports = router;