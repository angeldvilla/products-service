const express = require('express');
const soap = require('soap');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const sequelize = require('./src/config/db');

//rutas
const routes = require('./src/routes/index');

// servicios
const productsService = require('./src/service/productService');
const categoryService = require('./src/service/categoryService');
const brandService = require('./src/service/brandService');

// WSDL
const productsWSDL = fs.readFileSync('src/wsdl/products.wsdl', 'utf8');
const categoriesWSDL = fs.readFileSync('src/wsdl/categories.wsdl', 'utf8');
const brandsWSDL = fs.readFileSync('src/wsdl/brands.wsdl', 'utf8');

const app = express();
const port = 3001

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

        // rutas
        app.use(routes);

        app.listen(port, function () {
            soap.listen(app, '/categories', categoryService, categoriesWSDL);
            soap.listen(app, '/brands', brandService, brandsWSDL);
            soap.listen(app, '/products', productsService, productsWSDL);
            console.log(`Servidor SOAP corriendo en el puerto ${port}`);
        });

    })
    .catch(err => {
        console.error('No se puede conectar a la base de datos: \n', err);
    });
