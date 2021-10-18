const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("./auth/authRouter");
const clientRouter = require("./client/clientRouter");
const instructorRouter = require("./instructor/instructorRouter");

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/client", clientRouter);
server.use("/api/instructor", instructorRouter);

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
});

module.exports = server;
