import { Sequelize } from 'sequelize';


export const sequelize = new Sequelize("Assignment8_squalize", "root", "", {
  host: "localhost", //'127.0.0.1'
  port: "3306",
  dialect: "mysql",
  //   timezone: "+08:00",
});

//check connection
export const checkDBConnection = async () => {
    await sequelize.authenticate().then((res) => {
        console.log('Connection DB has been established successfully.');
    }).catch((err) => {
        console.error('Unable to connect to the database:', err);
    });
};

//check SyncDB
export const SyncDB = async () => {
    await sequelize.sync({alter:false,force:false}).then((res) => {
        console.log(" DB has been sync successfully.");
    }).catch((err) => {
        console.error("Unable to sync to DB", err);
    });
};

