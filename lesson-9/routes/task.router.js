import express from 'express';
import * as taskController from '../controllers/task.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import roleMiddleware from '../middleware/role.middleware.js';

const router = express.Router();

router.use(authMiddleware);
router.get('/task/all', roleMiddleware, taskController.getAllTasks);
router.get('/tasks', taskController.getTaskByUserId);
router.get('/task/:id', taskController.getTask);
router.post('/task', taskController.createTask);
router.put('/task/:id', taskController.updateTask);
router.delete('/task/:id', taskController.deleteTask);

export default router;
