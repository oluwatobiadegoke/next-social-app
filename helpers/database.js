import { MongoClient } from "mongodb";

export const connectToDatabase = async () => {
    return await MongoClient.connect(
        "mongodb+srv://tobi123:WhTAyo2vJjU2MHaY@cluster0.cj6bm.mongodb.net/xpress?retryWrites=true&w=majority"
    );
};

export default connectToDatabase;
