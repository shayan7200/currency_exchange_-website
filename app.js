import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const app = express();
const port = 80;

import User from "./models/userModel.js";

//user = ExchangeAdmin1  pass = 4fkHfDSigfCxpVjX
const URL =
  "mongodb+srv://ExchangeAdmin1:4fkHfDSigfCxpVjX@cluster0.dgo6k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(
  URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    }
  }
);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ msg: "hello" });
});

//authenicating exesting user
app.post("/auth_user", async (req, response) => {
  const user = await User.findOne({
    email: `${req.body.email}`,
    password: `${req.body.password}`,
  });
  try {
    if (user === null) {
      await response.send("no user");
    } else {
      await response.send(user);
    }
  } catch (error) {
    await response.status(500).send(error);
  }
});

//Creating new user
app.post("/add_user", async (request, response) => {
  const user = await new User(request.body);
  // console.log(request.body);

  try {
    await user.save();
    await response.send(user);
  } catch (error) {
    await response.status(500).send(error);
  }
});

app.listen(port, () => console.log(`Listning at port ${port}`));
