import mongoose from 'mongoose';


const Connection = async (username, password) => {
    const dbName= 'traveltideDb';
    const URI = `mongodb+srv://${username}:${password}@traveltidecluster.7rudc.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=TravelTideCluster`;

    try{
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error occured adil ', error.message);
    } 
}

export default Connection;
