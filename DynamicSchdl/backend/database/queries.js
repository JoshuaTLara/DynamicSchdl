import {
    Station, Employee, User, db
} from "./model.js"
   
        // Query the database to get all stations
        const stations = await Station.findAll({
            attributes: ['stationId', 'stationName']
        });

        console.log(stations)

        await db.close();