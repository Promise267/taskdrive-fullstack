require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cardRouter = require("./routes/card");
const collectionRouter = require("./routes/collection");
const PORT = process.env.URI || 5000

mongoose.connect(process.env.URI);

const app = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://ec2-3-90-45-205.compute-1.amazonaws.com:3000/");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use("/", cardRouter);
app.use("/collection", collectionRouter);

app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
});

app.listen(PORT, () => {
    console.log(`Successfully running on port ${PORT}`);
});
