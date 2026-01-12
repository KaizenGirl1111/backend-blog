const express = require('express')
const { addATask,deleteATask,updateATask,getATask,getTasks } = require('../controllers/taskController')
const auth = require('../middleware/auth')

const router = express.Router()

const addTask = router.post('/task',auth,addATask)
const deleteTask = router.delete('/task/:id',auth,deleteATask)
const updateTask = router.put('/task/:id',auth,updateATask)
const getTask = router.get('/task/:id',auth,getATask)
const getAllTasks = router.get('/task',auth,getTasks)

module.exports = router