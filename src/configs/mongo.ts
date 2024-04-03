import mongoose from "mongoose";

const { connection } = mongoose;

connection.once("error", () => console.error("Error on connection to MongoDB"));
connection.once("open", () =>
  console.info("MongoDB connection is established")
);

export default class MongoDB {
  private url: string;
  constructor() {
    this.url = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`;
  }
  connect() {
    return mongoose.connect(this.url).catch((err) => {
      if (err) {
        console.error(`Error on connection to MongoDB: ${err.message}`);
        process.exit(1);
      }
    });
  }
}
