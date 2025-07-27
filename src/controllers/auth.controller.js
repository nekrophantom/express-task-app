import { createNewUser } from "../services/auth.service.js"
import bcrypt from 'bcrypt'
import { findUserBy } from "../services/user.service.js"
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(404).json({ message: 'All Fields are required' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await createNewUser({ name, email, password: hashedPassword })

        res.status(201).json({
            message: "User registered successfully",
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to get user', 
            error: error.message
        })
    }
}

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: "Email and Password are Required" })
        }

        const user = await findUserBy({ email: email })

        if (!user) {
            return res.status(401).json({ message: "Invalid Credentials" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid Credentials" })
        }

        const token = jwt.sign(
            {userId: user.id, email: user.email},
            JWT_SECRET,
            { expiresIn: "1d" }
        )

        return res.status(200).json({
            message: 'Login Successful',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            }
        })

    } catch (error) {
        res.status(500).json({
            message: 'Login Failed', 
            error: error.message
        })        
    }
}
