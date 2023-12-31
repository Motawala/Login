const express = require('express')
const router = express.Router();
const {signup, login, logout} = require('../controllers/user')
const {isAuth} = require('../middleware/isAuth')

router.post('/create', signup)
router.post('/login', login)
router.post('/logout', logout)

//redirects the user to the login page
router.get('/signin', function(req,res){
    try{
        res.render('index',{title:'login Page'})
    }catch(err){
        return res.status(400).json({
            message: err
        })
    }
})

//redirects the user to the reset password page
router.get('/reset', function(req,res){
    try{
        res.render('forgot',{title:'forgot password'})
    }catch(err){
        return res.status(400).json({
            message: err
        })
    }
})

//Takes the user to the signup page
router.get('/signup', function(req,res){
    try{
        res.render('createAccount',{title:'Signup Page'})
    }catch(err){
        return res.status(400).json({
            message: err
        })
    }
})


router.get('/home', isAuth, function(req,res){
    try{
        res.render('home',{title:'Home Page'})
    }catch(err){
        return res.status(400).json({
            message: err
        })
    }
})

module.exports = router