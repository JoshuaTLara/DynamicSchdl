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
app.get("/api/stations", handlerFunctions.getStations);
app.post("/api/addStation", handlerFunctions.addStation);
app.delete("/api/station/delete/:stationId", handlerFunctions.deleteStation);
app.put("/station/update/:stationId", handlerFunctions.updateStation);
app.get("/api/employees", handlerFunctions.getEmployees);
app.post("/api/addEmployee", handlerFunctions.addEmployee);
app.delete("/api/employee/delete/:employeeId", handlerFunctions.deleteEmployee);
app.put("/api/employee/update/:employeeId", handlerFunctions.updateEmployee);
app.get("/api/employee-availability", handlerFunctions.getEmployeeAvailability);

//run the server

ViteExpress.listen(app, 8675, () => { console.log("server running on http://localhost:8675")
})