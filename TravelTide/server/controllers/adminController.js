import User from '../models/User.js'

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json({ success: true, data: users })
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

// Delete user
export const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({ success: true, message: 'User deleted' })
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

// Update user
export const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json({ success: true, data: updatedUser })
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}
