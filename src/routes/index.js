const fs = require('fs');
const { Router } = require("express");
const router = Router();

// WSDL
const productsWSDL = fs.readFileSync('src/wsdl/products.wsdl', 'utf8');
const categoriesWSDL = fs.readFileSync('src/wsdl/categories.wsdl', 'utf8');
const brandsWSDL = fs.readFileSync('src/wsdl/brands.wsdl', 'utf8');

//rutas
router.get("/", (req, res) => {
    res.send(`
        <html>
            <head>
            <title>Servicio de Catálogo de Productos</title>
            </head>
            <body>
            <h1>Bienvenido a Servicio de Catálogo de Productos SEXSHOP 👙🩲</h1>
            <p>Este servicio SOAP permite navegar para explorar las categorias, marcas y el catalogo relacionado a nuestra tienda:</p>
            <ul>
                <li><a href="/categories">CATEGORIAS</a></li>
                <li><a href="/brands">MARCAS</a></li>
                <li><a href="/products">PRODUCTOS</a></li>
            </ul>
            </body>
        </html>
        `);
}); 

router.get("/categories", (req, res) => {
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
});

router.get("/brands", (req, res) => {
    res.send(`
    <html>
        <head>
        <title>Servicio de Marcas</title>
        </head>
        <body>
        <h1>Bienvenido al Servicio de Marcas</h1>
        <p>Este servicio SOAP permite realizar las siguientes operaciones:</p>
        <ul>
            <li>Obtener todas las marcas: <code>getAllBrands</code></li>
            <li>Crear una marca: <code>createBrand</code></li>
        </ul>
        <p>Puedes ver el archivo WSDL desde el siguiente enlace:</p>
        <a href="/brands/wsdl">Ver WSDL</a>
        </body>
    </html>
    `);
});

router.get("/products", (req, res) => {
    res.send(`
    <html>
        <head>
        <title>Servicio de Productos SexSHOP</title>
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
});

// Servir archivos WSDL
router.get('/categories/wsdl', (req, res) => {
    res.set('Content-Type', 'text/xml');
    res.send(categoriesWSDL);
});

router.get('/brands/wsdl', (req, res) => {
    res.set('Content-Type', 'text/xml');
    res.send(brandsWSDL);
});

router.get('/products/wsdl', (req, res) => {
    res.set('Content-Type', 'text/xml');
    res.send(productsWSDL);
});

module.exports = router;