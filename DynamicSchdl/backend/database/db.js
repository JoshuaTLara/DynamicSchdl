import { Sequelize } from "sequelize";


//the function below connects my database page to the const db on model page where my dbURI is the address to my database when i type create db the rest is to catch for errors and print them to the console
async function connectToDB(dbURI) {
    console.log(`connecting to DB: ${dbURI}`);
    const sequelize = new Sequelize(dbURI, {
        logging: console.log,
        define: {
            underscored: true,
            timestamps:false,
        },
    });
    
    try {
        await sequelize.authenticate();
        console.log('Connected to DB successfully!');
    } catch (error) {
        console.log('Unable to connect to DB', error);
    }
    return sequelize;
}

export default connectToDB;