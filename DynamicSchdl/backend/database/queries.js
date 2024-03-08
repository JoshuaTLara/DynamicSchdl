import {
    Station, Employee, User, db, EmployeeAvailability
} from "./model.js"
   
// Query the database to get all stations
// const stations = await Station.findAll({
//     attributes: ['stationId', 'stationName']
// });

// console.log(stations)

// const emp1 = await Employee.findOne({
//     include: {
//         model: EmployeeAvailability
//     }
// })
// console.log(emp1)

// await EmployeeAvailability.create({
//     employeeId: emp1.employeeId,
//     dayOfTheWeek: 1,
//     isAvailable: true
// })
// // await emp1.

// const emp1Updated = await Employee.findOne({
//     include: {
//         model: EmployeeAvailability
//     }
// })

// console.log(emp1Updated)

// console.log(await EmployeeAvailability.findAll())


// const employees = await Employee.findAll({
//     include: [
//       {
//         model: EmployeeAvailability,
//         where: {
//           dayOfTheWeek: 1,
//           isAvailable: true,
//         },
//       },
//     ],
//   });

//   console.log(employees)


// const employees = await Employee.findAll({
//     include: [
//       {
//         model: EmployeeAvailability,
//       },
//     ],
//   });
  
//   console.log(employees);


const employees = await Employee.findAll({
    include: [
      {
        model: EmployeeAvailability,
      },
    ],
  });
  
//   // Iterate over employees
//   const employeesWithAvailableDays = employees.map(employee => {
//     // Extracting available days from availability records
//     const availableDays = employee.employeeAvailabilities.map(avail => avail.dayOfTheWeek);
  
//     // Creating a new object with employee details and available days
//     return {
//       employeeId: employee.employeeId,
//       fname: employee.fname,
//       lname: employee.lname,
//       shiftId: employee.shiftId,
//       userId: employee.userId,
//       employeeAvailabilities: employee.employeeAvailabilities, // If you still need the availability records
//       availableDays: availableDays,
//     };
//   });
  
//   console.log(employeesWithAvailableDays);

const employeesWithAvailableDays = employees.map(employee => {
    // Extracting available days from availability records where isAvailable is true
    const availableDays = [];
    employee.employeeAvailabilities.forEach(avail => {
      if (avail.isAvailable) {
        availableDays.push(avail.dayOfTheWeek);
      }
    });
  
    // Creating a new object with employee details and available days
    return {
      employeeId: employee.employeeId,
      fname: employee.fname,
      lname: employee.lname,
      availableDays: availableDays,
    };
  });
  
  console.log(employeesWithAvailableDays);

await db.close();