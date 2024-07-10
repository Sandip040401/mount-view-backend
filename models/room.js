// src/models/room.js
import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true,
  },
  bookedRooms: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model('Room', RoomSchema);
