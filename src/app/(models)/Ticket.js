import mongoose,{Schema } from "mongoose";
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => {
  console.log("Connected to MongoDB");
}
).catch((err) => {
  console.error("MongoDB connection error:", err);
});

const ticketSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
   
    },
    priority: {
        type: Number,
       
    },
    progress:{
        type: Number,
       
    },
    status:{
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    active:{
        type: Boolean,
        default: true,
    }

});
const Ticket=mongoose.models.Ticket || mongoose.model("Ticket", ticketSchema);
export default Ticket;