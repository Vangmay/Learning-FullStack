const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = `mongodb+srv://vangmaysachan16:P3zVHxUvq9xkzYC9@cluster0.oct2s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

console.log("connecting to", url);

mongoose
  .connect(url)

  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Note", noteSchema);
