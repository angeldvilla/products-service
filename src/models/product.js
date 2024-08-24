// models/Product.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Category = require('./category');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    },
},
    {
        timestamps: false
    }
);


Product.belongsTo(Category, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE'
});
Category.hasMany(Product, {
    foreignKey: {
        allowNull: false
    }
});

module.exports = Product;
