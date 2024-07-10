import express from 'express';
import Room from '../models/room.js';

const router = express.Router();

// POST /api/rooms/book
router.post('/book', async (req, res) => {
  const { date, numberOfRooms } = req.body;

  try {
    let room = await Room.findOne({ date });

    if (!room) {
      room = new Room({ date, bookedRooms: 0 });
    }

    room.bookedRooms += parseInt(numberOfRooms); // Increment booked rooms by the number of rooms booked
    await room.save();

    const totalRooms = 17; // Total number of rooms in your hotel
    const availableRooms = totalRooms - room.bookedRooms;
    res.status(200).json({ bookedRooms: room.bookedRooms, availableRooms });
  } catch (error) {
    console.error('Error booking rooms:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/booking', async (req, res) => {
  const { date, numberOfRooms } = req.body;

  try {
    let room = await Room.findOne({ date });

    if (!room) {
      room = new Room({ date, bookedRooms: 0 });
    }

    room.bookedRooms = parseInt(numberOfRooms); // Increment booked rooms by the number of rooms booked
    await room.save();

    const totalRooms = 17; // Total number of rooms in your hotel
    const availableRooms = totalRooms - room.bookedRooms;
    res.status(200).json({ bookedRooms: room.bookedRooms, availableRooms });
  } catch (error) {
    console.error('Error booking rooms:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET /api/rooms/availability/:date
router.get('/availability/:date', async (req, res) => {
  const { date } = req.params;

  try {
    let room = await Room.findOne({ date });

    if (!room) {
      const totalRooms = 17; // Total number of rooms in your hotel
      const availableRooms = totalRooms;
      res.status(200).json({ bookedRooms: 0, availableRooms });
    } else {
      const totalRooms = 17; // Total number of rooms in your hotel
      const availableRooms = totalRooms - room.bookedRooms;
      res.status(200).json({ bookedRooms: room.bookedRooms, availableRooms });
    }
  } catch (error) {
    console.error('Error fetching room availability:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/data', async (req, res) => {
  const { month, year } = req.query;
  try {
    // Construct start and end dates for the month
    const startDate = new Date(year, month - 1, 1); // month is 0-indexed in JavaScript Date
    const endDate = new Date(year, month, 0); // Last day of the month

    // Query rooms within the specified month
    const rooms = await Room.find({
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    }).select('date bookedRooms');

    // Prepare response data
    const availabilityData = rooms.map((room) => ({
      date: room.date.toISOString().split('T')[0],
      bookedRooms: room.bookedRooms,
      availableRooms: 17 - room.bookedRooms, // Assuming totalRooms is 17
    }));

    res.status(200).json(availabilityData);
  } catch (error) {
    console.error('Error fetching room data:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
