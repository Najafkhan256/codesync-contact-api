const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/contact-api", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection is successfull");
  })
  .catch((err) => {
    console.log("No Connection", err);
  });
