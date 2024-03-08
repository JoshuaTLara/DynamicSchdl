import {User, Station, Employee, EmployeeAvailability} from '../database/model.js'



export const handlerFunctions = {
    sessionCheck: async (req, res) => {
        //when this function is called we simply want to check 
        // if there is a userId on the req.session object, and 
        // send it back if so
        if (req.session.userId) {
            // if you want more info about the user to return, you can just query right now with findByPk();
            // const user = await User.findByPk (req.session.userId)

            res.send({
                message:"user is still logged in",
                success:true,
                userId: req.session.userId
            })
            return
        } else {
            res.send({
                message: "no user logged in",
                success: false,
            })
        }
    },

    login: async (req, res) => {
        // grab values of 'email'/'password' from body object
        const { email, password} = req.body

        // see if a user exists in the db with 
        // the provided username
        const user = await User.findOne({
            where: {
                email:email
            }
        })

        // need to evaluate if that worked, if not 
        // can already reapond that login failed
        if (!user) {
            res.send({
                message: 'no email found',
                success: false
            })
            return
        }

        // if we're here, then the user was found
        // evaluate if the passwords match

        if(user.password !== password) {
            res.send({
                message: 'password does not match',
                success: false,
            })
            return
        }

        // if we are here the user exists and password was correct
        //so i want to "save" their userId to a 
        // cookie -->req.session
        req.session.userId = user.userId
        // req.session is a cookie saved on the users browsers.
        // so each user that visits our site sends their custom
        // "req" object to us, and therfore, as far as thwir browser knws,
        // they are "logged in"

        //if we are here then all is a success
        // send a response including the userId:

        res.send({
            message: "user logged in",
            success: true,
            userId: req.session.userId
        })
    },
    
    logout: async (req, res) => {
        req.session.destroy()

        res.send({
            message: "user logged out",
            success: true
        })
        return
    },
     register: async (req, res) => {
        const { email, password } = req.body;
      
        // Check if the user with the provided email already exists
        const existingUser = await User.findOne({
          where: {
            email: email,
          },
        });
      
        if (existingUser) {
          res.send({
            message: 'User already exists with this email',
            success: false,
          });
          return;
        }
      
        // Create a new user in the database
        const newUser = await User.create({
          email: email,
          password: password,
        });
      
        // Set the user as logged in 
        req.session.userId = newUser.userId;
      
        res.send({
          message: 'User registered and logged in',
          success: true,
          userId: newUser.userId,
        });
      },

      getStations: async (req, res) => {
        try {
            // Query the database to get all stations
            const stations = await Station.findAll({
                attributes: ['stationId', 'stationName']
            });
    
            if (stations.length > 0) {
                // If stations are found, send the station data back to the front end
                const formattedStations = stations.map(station => ({
                    stationId: station.stationId,
                    stationName: station.stationName
                }));
                res.status(200).json({ success: true, stations: formattedStations });
            } else {
                // If no stations are found, still return true and allow input on the front end
                res.status(200).json({ success: true, stations: [] });
            }
        } catch (error) {
            // Handle any errors that occur during the database query
            console.error('Error fetching stations:', error);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    },
      
      addStation: async(req, res) => {
        try {
            // Assuming the station data is sent from the front end in the request body
            const { stationName } = req.body;
    
            // Validate the input (you can add more validation as needed)
            if (!stationName) {
                return res.status(400).json({ success: false, error: 'Station name is required' });
            }
    
            // Create a new station in the database
            const newStation = await Station.create({ stationName });
    
            // Respond with the newly created station data
            res.status(201).json({ success: true, station: newStation });
        } catch (error) {
            // Handle any errors that occur during the database operation
            console.error('Error adding station:', error);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
      },
      deleteStation: async(req, res) => {
        try {
            // Assuming the station ID is sent from the front end in the request parameters
            const stationId = req.params.stationId;
    
            // Check if the station exists
            const existingStation = await Station.findByPk(stationId);
    
            if (!existingStation) {
                return res.status(404).json({ success: false, error: 'Station not found' });
            }
    
            // Delete the station from the database
            await existingStation.destroy();
    
            // Respond with a success message
            res.status(200).json({ success: true, message: 'Station deleted successfully' });
        } catch (error) {
            // Handle any errors that occur during the database operation
            console.error('Error deleting station:', error);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
      },
      updateStation: async(req, res) => {
        try {
            const stationId = req.params.stationId;
            const { updatedStationName } = req.body;
    
            // Check if the station exists
            const existingStation = await Station.findByPk(stationId);
    
            if (!existingStation) {
                return res.status(404).json({ success: false, error: 'Station not found' });
            }
    
            // Update the station name in the database
            await existingStation.update({ stationName: updatedStationName });
    
            // Respond with the updated station data
            res.status(200).json({ success: true, station: existingStation });
        } catch (error) {
            // Handle any errors that occur during the database operation
            console.error('Error updating station:', error);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
      },

      getEmployees: async (req, res) => {
        try {
            // Query the database to get all stations
            const employees = await Employee.findAll({
                attributes: ['employeeId', 'fname', 'lname']
            });
    
            if (employees.length > 0) {
                // If stations are found, send the station data back to the front end
                const formattedEmployees = employees.map(employee => ({
                    employeeId: employee.employeeId,
                    fname: employee.fname,
                    lname: employee.lname
                }));
                res.status(200).json({ success: true, employees: formattedEmployees });
            } else {
                // If no stations are found, still return true and allow input on the front end
                res.status(200).json({ success: true, employees: [] });
            }
        } catch (error) {
            // Handle any errors that occur during the database query
            console.error('Error fetching employees:', error);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    },
    addEmployee: async(req, res) => {
        try {
          // Create a new employee
          const newEmployee = await Employee.create({
            fname: req.body.fname,
            lname: req.body.lname,
          });
      
          // Send the newly created employee as a response
          res.json({ employee: newEmployee });
        } catch (error) {
          console.error('Error adding employee:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      },
      deleteEmployee:async(req, res) => {
        try {
            const employeeId = req.params.employeeId;
        
            // Find the employee by ID
            const employeeToDelete = await Employee.findByPk(employeeId);
        
            // Check if the employee exists
            if (!employeeToDelete) {
              return res.status(404).json({ error: 'Employee not found' });
            }
        
            // Delete the employee
            await employeeToDelete.destroy();
        
            res.json({ success: true, message: 'Employee deleted successfully' });
          } catch (error) {
            console.error('Error deleting employee:', error);
            res.status(500).json({ error: 'Internal server error' });
          }
      },
      updateEmployee: async (req, res) => {
        try {
            const employeeId = req.params.employeeId;
    
            // Find the employee by ID
            const employeeToUpdate = await Employee.findByPk(employeeId);
    
            // Check if the employee exists
            if (!employeeToUpdate) {
                return res.status(404).json({ error: 'Employee not found' });
            }
    
            // Update the employee's basic information
            await employeeToUpdate.update({
                fname: req.body.fname,
                lname: req.body.lname,
            });
    
            // Now, update the employee's availability
            const availability = req.body.availability;
            if (availability) {
                // Delete existing availability records for the employee
                await EmployeeAvailability.destroy({
                    where: { employeeId },
                });
                
                // Create new availability records based on the received data
                const availabilityRecords = Object.entries(availability).map(([day, isAvailable]) => ({
                    employeeId,
                    dayOfTheWeek: day, // Assuming day is already a number
                    isAvailable,
                }));

                await EmployeeAvailability.bulkCreate(availabilityRecords);
            }
    
            res.json({ employee: employeeToUpdate });
        } catch (error) {
            console.error('Error updating employee:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    getEmployeeAvailability: async (req, res) => {
        try {
            const employees = await Employee.findAll({
              include: [
                {
                  model: EmployeeAvailability,
                },
              ],
            });
        
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
        
            res.json({ employeeAvailability: employeesWithAvailableDays });
          } catch (error) {
            console.error('Error fetching employee availability:', error);
            res.status(500).json({ error: 'Internal Server Error' });
          }
        },
    
}