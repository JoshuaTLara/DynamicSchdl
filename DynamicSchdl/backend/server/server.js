// express, morgan, express-session, vite-express you already installed them
// Imports

import express from "express"
import morgan from "morgan"
import session from "express-session"
import ViteExpress from "vite-express"


// Create express instance

const app = express()


// Set up middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: "mySpecialSecretTeeHee",
    saveUninitialized: false,
    resave: false,
  })
);

//routes
import { handlerFunctions } from "./controller.js";

app.get('/api/session-check', handlerFunctions.sessionCheck);
app.post("/api/login", handlerFunctions.login);
app.get("/api/logout", handlerFunctions.logout);
app.post("/api/register", handlerFunctions.register);

//run the server

ViteExpress.listen(app, 8675, () => { console.log("server running on http://localhost:8675")
})