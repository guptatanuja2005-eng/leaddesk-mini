const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Admin = require("./models/Admin");

const dns = require('dns');

dns.setServers(["1.1.1.1", "8.8.8.8"]);


mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    await Admin.create({
      name: "Admin",
      email: "admin@example.com",
      password: hashedPassword,
    });

    console.log("✅ Admin Created");
    process.exit();
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });