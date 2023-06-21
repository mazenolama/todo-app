const express = require('express')
const router = express.Router()
const { verifyToken} = require('../middlewares/verifyToken')
const taskController = require('../controllers/taskController')

// CREATE NEW TASK
router.post('/task', verifyToken, taskController.createTask)

// GET SINGLE TASK
router.get('/task/:id', verifyToken, taskController.getSingleTask)

// DELETE TASK
router.delete('/task/:id', verifyToken, taskController.deleteTask)

// UPDATE TASK
router.put( '/task/:id', verifyToken, taskController.updateTask)

module.exports = router