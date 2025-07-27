import { findAllUsers, findUserById } from "../services/user.service.js"

export const getUsers = async (req, res, next) => {
    try {
        const users = await findAllUsers();
        res.status(200).json({
            message: 'success',
            data: users
        })
    } catch (error) {
        res.status(500).json({ message: 'Failed to get users', error: error.message });
    }
}

export const getUserById = async (req, res, next) => {
    const id = parseInt(req.params.id)
    try {
        const user = await findUserById(id)
        res.status(201).json({
            message: 'success',
            data: user
        })
    } catch (error) {
        res.status(500).json({
            message: 'Failed to get user', 
            error: error.message
        })
    }
}