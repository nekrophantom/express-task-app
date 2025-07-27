import { Router } from "express";
import userRoute from './user.route.js'
import authRoute from './auth.route.js'
import taskRoute from './task.route.js'

const router = Router()

router.use('/auth', authRoute)
router.use('/tasks', taskRoute)
router.use('/users', userRoute)

export default router