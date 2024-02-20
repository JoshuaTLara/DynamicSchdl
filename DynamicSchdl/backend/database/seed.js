import { db, Employee, Station } from "./model.js"

await db.sync({ force: true })



await db.close()