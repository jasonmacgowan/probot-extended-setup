#!/usr/bin/env node
const security = require("../lib/security");

const token = security.generateToken();
console.log("Generated new auth token: " + token);

const filepath = security.writeToken(token);
console.log("Auth token written to: " + filepath);
