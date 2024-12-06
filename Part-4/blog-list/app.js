const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const blogRouter = require("./controllers/blogs");
const config = require("./utils/config");
const middleware = require("./utils/middleware");

const mongoUrl = config.MONGODB_URL;
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());
app.use("/api", blogRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
