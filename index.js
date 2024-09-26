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
        app.get("/categories", (req, res) => {
            res.send(`
        <html>
            <head>
            <title>Servicio de Categorias</title>
            </head>
            <body>
            <h1>Bienvenido al Servicio de Categorias</h1>
            <p>Este servicio SOAP permite realizar las siguientes operaciones:</p>
            <ul>
                <li>Obtener todas las categorias: <code>getAllCategories</code></li>
                <li>Crear una categoria: <code>createCategory</code></li>
            </ul>
            <p>Puedes ver el archivo WSDL desde el siguiente enlace:</p>
            <a href="/categories/wsdl">Ver WSDL</a>
            </body>
        </html>
        `);
        }
        );

        app.get("/products", (req, res) => {
            res.send(`
        <html>
            <head>
            <title>Servicio de Productos</title>
            </head>
            <body>
            <h1>Bienvenido al Servicio de Productos</h1>
            <p>Este servicio SOAP permite realizar las siguientes operaciones:</p>
            <ul>
                <li>Obtener todos los productos: <code>getAllProducts</code></li>
                <li>Crear un producto: <code>createProduct</code></li>
            </ul>
            <p>Puedes ver el archivo WSDL desde el siguiente enlace:</p>
            <a href="/products/wsdl">Ver WSDL</a>
            </body>
        </html>
        `);
        }
        );

        // Servir archivos WSDL
        app.get('/categories/wsdl', (req, res) => {
            res.set('Content-Type', 'text/xml');
            res.send(categoriesWSDL);
        });

        app.get('/products/wsdl', (req, res) => {
            res.set('Content-Type', 'text/xml');
            res.send(productsWSDL);
        });

        app.listen(port, function () {
            soap.listen(app, '/categories', categoryService, categoriesWSDL);
            soap.listen(app, '/products', productsService, productsWSDL);
            console.log(`Servidor SOAP corriendo en el puerto ${port}`);
        });

    })
    .catch(err => {
        console.error('No se puede conectar a la base de datos:', err);
    });
