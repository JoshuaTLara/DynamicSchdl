import { db, Employee, Station, User, EmployeeAvailability, Shift } from "./model.js"

await db.sync({ force: true })

let mockupUserData = [
    {email: 'Joshua@gmail.com', password: 'test'},

]

let mockupEmployeeData = [
    { fname: 'Jack', lname: 'Johnson' },
    { fname: 'Jacob', lname: 'Willards' },
    { fname: 'Jingle', lname: 'Bells' },
    { fname: 'Himmer', lname: 'Beast' },
    { fname: 'Schmidt', lname: 'Winston' },
]

let mockupStationData = [
    { stationName: 'Blood Bench' },
    { stationName: 'Blood Plates' },
    { stationName: 'Kistra' },
    { stationName: 'Offlines' },
    { stationName: 'AFB Cultures' },
    { stationName: 'Anerobs' },
]

// let mockupEmployeeAvailabilityData = [
//     { dayOftheWeek: 1, isAvalible:true },
//     { dayOftheWeek: 2, isAvalible:true },
//     { dayOftheWeek: 3, isAvalible:true },
//     { dayOftheWeek: 4, isAvalible:true },
//     { dayOftheWeek: 5, isAvalible:true },
//     { dayOftheWeek: 6, isAvalible:true },
//     { dayOftheWeek: 7, isAvalible:true },

// ]

async function seedData(dataArray, Model) {
    try {
        await Promise.all(dataArray.map(async (data) => {
            await Model.create(data);
        }));
        console.log(`Successfully seeded data for ${Model.name}`);  
    } catch (error) {
        console.error(`Error seeding data for ${Model.name}:`, error)
    }
}

await seedData(mockupEmployeeData, Employee);
await seedData(mockupStationData, Station);
// await seedData(mockupEmployeeAvailabilityData, EmployeeAvailability);
await seedData(mockupUserData, User);

await db.close()