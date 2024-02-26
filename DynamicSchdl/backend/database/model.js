// need my imports up here
import { Model, DataTypes } from 'sequelize'
import util from 'util'
import connectToDB from './db.js'


//this is so my sql can access my database and use it in building all the tables
export const db = await connectToDB('postgresql:///schedule')


//this is the User that has access to the specific dataset of the database that corolates to their inputs they have put in the past.
export class User extends Model {
    [util.inspect.custom]() {
        return this.toJSON();
    }

}

User.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(500),
            allowNull: false,
        }
    },
    {
        modelName: 'user',
        sequelize: db,
    },
);
// Employee is a person that the user creates to have specific values and work avaliblity
export class Employee extends Model {
    [util.inspect.custom]() {
        return this.toJSON();
    }

}

Employee.init(
    {
        employeeId:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        fname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lname: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        modelName: 'employee',
        sequelize: db,
    },
);
// Stations are the areas that people can work and there will be multiple
export class Station extends Model {
    [util.inspect.custom]() {
        return this.toJSON();
    }

}

Station.init(
    {
        stationId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        stationName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        modelName: 'station',
        sequelize: db,
    },
);
// employee Availablity is designed to compare the days of the week that the employee can work using 1-7 and true or false for the employee
export class EmployeeAvailability extends Model {
    [util.inspect.custom]() {
        return this.toJSON();
    }
}

EmployeeAvailability.init(
    {
        avaliabilityId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        dayOfTheWeek: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 7
            }
        },
        isAvalible:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    },
    {
        modelName: 'employeeavailability',
        sequelize: db,
    },
);

// The shift is the table that takes in the day of the week and the avaliblity and the stations and generates a new table to make the acctual schedule
  export class Shift extends Model {
    [util.inspect.custom]() {
      return this.toJSON();
    }
  }

  Shift.init(
    {
        shiftId:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        dayOfTheWeek: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 7
            }
        },
          timeStamp:{
            type: DataTypes.INTEGER,
          }
    },
    {
        modelName: 'shift',
        sequelize: db,
    },
  )

// Employee has many different days they are avalible for
  Employee.hasMany(EmployeeAvailability, { foreignKey: 'employeeId'})
  EmployeeAvailability.belongsTo(Employee, {foreignKey:'employeeId'})

// A Shift can have multiple employees work on that shift
  Shift.hasMany(Employee, { foreignKey: 'shiftId'})
  Employee.belongsTo(Shift, {foreignKey: 'shiftId'})
// A shift can also have multiple stations in the same shift
  Shift.hasMany(Station, { foreignKey: 'shiftId'})
  Station.belongsTo(Shift, {foreignKey: 'shiftId'})
// both employees and stations belong to many of eachother and are created under the table of EmployeeQualification.
  Employee.belongsToMany(Station, {through: 'EmployeeQualification'})
  Station.belongsToMany(Employee, {through: 'EmployeeQualification'})

// linking the user to the employee table
  User.hasMany(Employee, {foreignKey: 'userId'})
  Employee.belongsTo(User, {foreignKey: 'userId'})
// linking the user to the station table 
  User.hasMany(Station, {foreignKey: 'userId'})
  Station.belongsTo(User, {foreignKey: 'userId'})
// linking the user to the EmployeeAvaliblilty
  User.hasMany(EmployeeAvailability, {foreignKey: 'userId'})
  EmployeeAvailability.belongsTo(User, {foreignKey: 'userId'})
// linking the user to the Shift
  User.hasMany(Shift, {foreignKey: 'userId'})
  Shift.belongsTo(User, {foreignKey: 'userId'})