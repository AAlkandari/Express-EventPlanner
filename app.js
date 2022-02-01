const express = require("express");
const eventRouter = require("./apis/events/routes");
const app = express();
const connectDB = require("./db/database");

app.use(express.json());

app.use("/api/events", eventRouter)


connectDB();
app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
});