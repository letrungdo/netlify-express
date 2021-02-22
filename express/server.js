"use strict";
const express = require("express");
const serverless = require("serverless-http");
const app = express();
const cors_proxy = require("cors-anywhere");

app.get("/", (req, res) => {
  res.send("Welcome to DoLT CORS!");
});
let proxy = cors_proxy.createServer({
  originWhitelist: [], // Allow all origins
  requireHeaders: [], // Do not require any headers.
  removeHeaders: [], // Do not remove any headers.
});
/* Attach our cors proxy to the existing API on the /proxy endpoint. */
app.get("/proxy/:proxyUrl*", (req, res) => {
  req.url = req.url.replace("/proxy/", "/"); // Strip '/proxy' from the front of the URL, else the proxy won't work.
  proxy.emit("request", req, res);
});

module.exports = app;
module.exports.handler = serverless(app);
