import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

const connectDB = (url) =>
    mongoose
        .connect(url)
        .then(() => console.log('Database Connected'))
        .catch((error) => console.log('Error to Connect Database'));

export default connectDB;
