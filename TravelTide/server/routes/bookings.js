import express from 'express'
import { createBooking, getAllBooking, getBooking,rescheduleBooking, cancelBooking } from '../controllers/bookingController.js'
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js'

const router = express.Router()

router.post('/', verifyUser, createBooking)
router.get('/:id', verifyUser, getBooking)
router.get('/', verifyAdmin, getAllBooking)
router.put('/:id', verifyUser, rescheduleBooking)
router.delete('/:id', verifyUser, cancelBooking)

export default router