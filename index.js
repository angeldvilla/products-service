const express = require('express');
const soap = require('soap');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const sequelize = require('./src/config/db');

// servicios
const productsService = require('./src/service/productService');
const categoryService = require('./src/service/categoryService');

// WSDL
const productsWSDL = require('fs').readFileSync('src/wsdl/products.wsdl', 'utf8');
const categoriesWSDL = require('fs').readFileSync('src/wsdl/categories.wsdl', 'utf8');

const app = express();

app.name = 'Products API';

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

sequelize.authenticate()
    .then(() => {
        console.log('La conexión se ha establecido correctamente.');
        
        const server = app.listen(3001, function () {
            console.log('Servidor SOAP corriendo en el puerto 3001');
        });
        
        soap.listen(server, '/products', productsService, productsWSDL);
        soap.listen(server, '/categories', categoryService, categoriesWSDL);
    })
    .catch(err => {
        console.error('No se puede conectar a la base de datos:', err);
    });
