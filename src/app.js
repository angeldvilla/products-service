const sequelize = require('./config/db');
const Product = require('./models/Product');
const Category = require('./models/category');

sequelize.sync({ force: true })
    .then(() => {
        console.log("Database & tables created!");
    })
    .catch(err => {
        console.error('Error syncing database:', err);
    });