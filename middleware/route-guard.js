// middleware/route-guard.js

const Restaurant = require('../models/Restaurant.model')

const isLoggedIn = (req, res, next) => {
    if (!req.session.user) {
      return res.redirect('/users/login');
    }
    next();
  };

const isLoggedOut = (req, res, next) => {
    if (req.session.user) {
        return res.redirect('/');
    }
    next();
  };
    
const isOwner = (req, res, next) => {

    Restaurant.findById(req.params.id)
    .populate('owner')
    .then((foundRestaurant) => {
        if (!req.session.user || foundRestaurant.owner._id.toString() !== req.session.user._id) {
            res.render('index.hbs', {errorMessage: "You are not authorized."})
        } else {
            next()
        }
    })
    .catch((err) => {
        console.log(err)
    })

}

const isNotOwner = (req, res, next) => {

    Restaurant.findById(req.params.id)
    .populate('owner')
    .then((foundRestaurant) => {
        if (!req.session.user || foundRestaurant.owner._id.toString() === req.session.user._id) {
            res.render('index.hbs', {errorMessage: "You can't review your own restaurant."})
        } else {
            next()
        }
    })
    .catch((err) => {
        console.log(err)
    })

}

module.exports = {
isLoggedIn,
isLoggedOut,
isOwner,
isNotOwner
};