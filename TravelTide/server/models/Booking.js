import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    tourName:{
        type:String,
        required:true,
    },
    fullName: {
      type: String,
      required: true,
    },
    guestSize:{
        type:Number,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    bookAt:{
        type:Date,
        required:true
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
