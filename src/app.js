const express = require("express");
const mongoose = require("mongoose");
const UsersRouter = require("./routers/users");
require("./db/conn");

const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(UsersRouter);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
