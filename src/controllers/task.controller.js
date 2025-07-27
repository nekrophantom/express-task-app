import { addTask, editTask, findAllTask, findTaskById, removeTask } from "../services/task.service.js";

export const getAllTask = async (req, res, next) => {
    try {
        const tasks = await findAllTask();
        res.status(200).json({
            message: 'success',
            data: tasks
        })
    } catch (error) {
        res.status(500).json({ message: 'Failed to get tasks', error: error.message });
    }
}

export const getTaskById = async (req, res, next) => {
    const id = parseInt(req.params.id)
    try {
        const task = await findTaskById(id)
        res.status(201).json({
            message: 'success',
            data: task
        })
    } catch (error) {
        res.status(500).json({ message: 'Failed to get task', error: error.message });
    }
}

export const createTask = async (req, res, next) => {
    try {
        const { title, description } = req.body
        const userId = req.user.userId;
        if (!title) {
            return res.status(400).json({ message: 'Title is required' })
        }

        const task = await addTask({ title, description, userId })

        res.status(201).json({
            message: "Task created successfully",
            data: {
                id: task.id,
                title: task.title,
                description: task.description,
                is_completed: task.is_completed,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed create task', error: error.message });
    }
}

export const updateTask = async (req, res, next) => {
    const id = parseInt(req.params.id)
    const userId = req.user.userId

    try {
        const { title, description, is_completed } = req.body
        if (title === undefined && description === undefined && is_completed === undefined) {
            return res.status(400).json({ message: 'At least one field is required to update' });
        }
        const task = await editTask({ id, userId, title, description, is_completed })

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(201).json({
            message: 'Task updated successfully',
            data: task
        })
    } catch (error) {
        res.status(500).json({ message: 'Failed updating task', error: error.message });
    }
}

export const deleteTask = async (req, res, next) => {
    const id = parseInt(req.params.id)
    const userId = req.user.userId

    try {
        const task = await removeTask({ id, userId })
        if (!task) {
            return res.status(400).json({ message: 'Task not found' })
        }
        
        res.status(200).json({
            message: 'Task deleted successfully'
        })
    } catch (error) {
        res.status(500).json({ message: 'Failed delete task', error: error.message });
    }
}