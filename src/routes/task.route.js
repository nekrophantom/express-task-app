import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { createTask, deleteTask, getAllTask, updateTask } from "../controllers/task.controller.js";

const router = Router()

router.get('/', authenticate, getAllTask)
router.post('/', authenticate, createTask)
router.put('/:id', authenticate, updateTask)
router.delete('/:id', authenticate, deleteTask)

export default router