require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./router");
const app = express();

// env file needs to be added to gitignore
const hostname = process.env.HOST;
const port = process.env.PORT;
const password = process.env.PASS;

const crypto = require("crypto");

const genRandomString = function (length) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex") /** convert to hexadecimal format */
    .slice(0, length); /** return required number of characters */
};

const sha512 = function (password, salt) {
  const hash = crypto.createHmac(
    "sha512",
    salt
  ); /** Hashing algorithm sha512 */
  hash.update(password);
  const value = hash.digest("hex");
  return {
    salt: salt,
    passwordHash: value,
  };
};

function saltHashPassword(userpassword) {
  const salt = genRandomString(16); /** Gives us salt of length 16 */
  const passwordData = sha512(userpassword, salt);
  console.log(
    `password: ${userpassword}, hash: ${passwordData.passwordHash}, salt: ${passwordData.salt}`
  );
}

saltHashPassword(password);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use("/api", router);

const uri =
  "mongodb+srv://admin:gateway774@scales.oyiag.mongodb.net/scalefinder-data?retryWrites=true";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
