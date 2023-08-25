import mongoose from "mongoose";

const { MONGODB_URI } = process.env;

export const dbConnect = async () => {
    const conn = await mongoose
        .connect(MONGODB_URI as string)
        .catch(err => console.log(err))
    console.log("Connection Established!")

    const UserSchema = new mongoose.Schema({
        username: String
    })

    const User = mongoose.models.User || mongoose.model("User", UserSchema)

    return { conn, User }
}