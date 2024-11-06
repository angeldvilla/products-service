// models/Product.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Brand = require('./brand');
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
    discount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    category_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Category,
            key: 'id',
        },
    },
    brand_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Brand,
            key: 'id',
        },
    },
},
    {
        timestamps: false
    }
);


Product.belongsTo(Brand, { foreignKey: 'brand_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Brand.hasMany(Product, { foreignKey: 'brand_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Product.belongsTo(Category, { foreignKey: 'category_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Category.hasMany(Product, { foreignKey: 'category_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

module.exports = Product;
