const express = require('express')
const router = express.Router()
const {signUpAUser,signInAUser, myProfile, deleteAUser, updateAUser,logout, verifyCookie} = require('../controllers/userController')
const auth = require('../middleware/auth')

const signUpUser = router.post('/signup',signUpAUser)

const signInUser = router.post('/signin',signInAUser)

const personProfile = router.get('/me',auth,myProfile)

const deleteUser = router.delete('/me',auth,deleteAUser)

const updateUser = router.put('/me',auth,updateAUser)

const signOut = router.get('/logout',logout)

const verify = router.get('/verify',auth,verifyCookie)

module.exports = router


