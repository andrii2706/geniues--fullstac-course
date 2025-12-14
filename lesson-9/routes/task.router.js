import express from 'express';
import * as taskController from '../controllers/task.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import roleMiddleware from '../middleware/role.middleware.js';

const router = express.Router();

router.use(authMiddleware);

/**
 * @openapi
 * /api/task:
 *   post:
 *     tags:
 *       - Task
 *     summary: Create a task
 *     security:
 *       - basicAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 example: Buy a book
 *     responses:
 *       201:
 *         description: Task created
 *       400:
 *         description: Bad Request
 */
router.post('/task', taskController.createTask);

/**
 * @openapi
 * /api/task/all:
 *   get:
 *     tags:
 *       - Tasks
 *     summary: Get all tasks
 *     security:
 *       - basicAuth: []
 *     responses:
 *       200:
 *         description: All tasks fetched
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   description:
 *                     type: string
 *                   completed:
 *                     type: boolean
 *                   createdBy:
 *                     type: string
 *       400:
 *         description: Bad Request
 */
router.get('/task/all', roleMiddleware, taskController.getAllTasks);

/**
 * @openapi
 * /api/tasks:
 *   get:
 *     tags:
 *       - Tasks
 *     summary: Get tasks by userId
 *     security:
 *       - basicAuth: []
 *     responses:
 *       200:
 *         description: Tasks fetched by userId
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   description:
 *                     type: string
 *                   completed:
 *                     type: boolean
 *                   createdBy:
 *                     type: string
 *       400:
 *         description: Bad Request
 */
router.get('/tasks', taskController.getTaskByUserId);

/**
 * @openapi
 * /api/task/{id}:
 *   get:
 *     tags:
 *       - Task
 *     summary: Get a task by id
 *     security:
 *       - basicAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task fetched by id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 description:
 *                   type: string
 *                 completed:
 *                   type: boolean
 *                 createdBy:
 *                   type: string
 *       400:
 *         description: Bad Request
 */
router.get('/task/:id', taskController.getTask);

/**
 * @openapi
 * /api/task/{id}:
 *   put:
 *     tags:
 *       - Task
 *     summary: Update a task
 *     security:
 *       - basicAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 example: Buy a book
 *     responses:
 *       200:
 *         description: Task updated
 *       400:
 *         description: Bad Request
 */
router.put('/task/:id', taskController.updateTask);

/**
 * @openapi
 * /api/task/{id}:
 *   delete:
 *     tags:
 *       - Task
 *     summary: Delete a task
 *     security:
 *       - basicAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted by id
 *       400:
 *         description: Bad Request
 */
router.delete('/task/:id', taskController.deleteTask);

export default router;
