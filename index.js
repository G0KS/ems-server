require("dotenv").config();
require("./DB/connection");

const express = require("express");
const cors = require("cors");
const EMSserver = express();
const router = require("./Routes/router");

EMSserver.use(cors());
EMSserver.use(express.json());
EMSserver.use(router);
EMSserver.use("/uploads", express.static("./Uploads"));

const PORT = 4000 || process.evv.PORT;

EMSserver.listen(PORT, () => {
   console.log("Server running at port:", PORT);
});

EMSserver.get("/", (req, res) => {
   res.send("EMS Server is working");
});
