const express = require('express')
const {createABlog,editABlog,getABlog,deleteABlog,getAllBlogs} = require('../controllers/blogController')
const auth = require('../middleware/auth')
const router =  express()

 router.post('/blog',auth,createABlog)
 router.put('/blog/:id',auth,editABlog)
 router.delete('/blog/:id',auth,deleteABlog)
 router.get('/blog/:id',auth,getABlog)
 router.get('/blog',auth,getAllBlogs)

module.exports = router