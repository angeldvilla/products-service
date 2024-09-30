const Product = require('../models/Product');
const Category = require('../models/category');

const productService = {
    ProductService: {
        ProductsPort: {
            /* Funciones para productos */
            getProducts: async function () {
                try {
                    const products = await Product.findAll({
                        include: [Category]
                    });

                    const productResponse = products.map(product => {
                        return {
                            id: product.id,
                            nombre: product.name,
                            descripcion: product.description,
                            precio: product.price,
                            cantidad: product.stock,
                            categoria: product.Category ? product.Category.name : null
                        }
                    })

                    return { products: productResponse };

                } catch (error) {
                    console.error('Error al obtener productos:', error);
                    throw new Error('Error al obtener productos');
                }
            },
            getProductDetails: async function (args) {
                try {
                    const product = await Product.findByPk(args.id, {
                        include: [Category]
                    });
                    if (!product) {
                        throw new Error('Producto no encontrado');
                    }

                    const productResponse = {
                        id: product.id,
                        nombre: product.name,
                        descripcion: product.description,
                        precio: product.price,
                        cantidad: product.stock,
                        categoria: product.Category ? product.Category.name : null
                    }

                    return { product: productResponse };

                } catch (error) {
                    console.error('Error al obtener detalles del producto:', error);
                    throw new Error('Error al obtener detalles del producto');
                }
            },
            createProduct: async function (args) {
                try {
                    const existingProduct = await Product.findOne({ where: { name: args.name } });

                    if (existingProduct) {
                        throw new Error('El producto ya existe');
                    }

                    const newProduct = await Product.create(args);
                    const category = await Category.findOne({ where: { id: args.category_id } })

                    return {
                        sucess: "Producto creado exitosamente",
                        productId: newProduct.id,
                        nombre: newProduct.name,
                        categoria: category.name
                    };

                } catch (error) {
                    console.error('Error al crear el producto:', error);
                    throw new Error('Error al crear el producto:');
                }
            },
            updateProduct: async function (args) {
                try {
                    const product = await Product.findByPk(args.id);
                    if (!product) {
                        throw new Error('Producto no encontrado');
                    }

                    //Actualizar campos de producto
                    product.name = args.name || product.name;
                    product.description = args.description || product.description;
                    product.price = args.price || product.price;
                    product.stock = args.stock || product.stock;
                    product.imageUrl = args.imageUrl || product.imageUrl;
                    product.category_id = args.category_id || product.category_id;

                    const productUpdated = await product.save();

                    const productResponse = {
                        id: productUpdated.id,
                        nombre: productUpdated.name,
                        descripcion: productUpdated.description,
                        precio: productUpdated.price,
                        cantidad: productUpdated.stock,
                        categoria: productUpdated.Category ? productUpdated.Category.name : null
                    };

                    return {
                        success: "Producto actualizado exitosamente",
                        product: productResponse
                    };

                } catch (error) {
                    console.error('Error al actualizar el producto:', error);
                    throw new Error('Error al actualizar el producto');
                }
            },
            deleteProduct: async function (args) {
                try {
                    const product = await Product.findByPk(args.id);
                    if (!product) {
                        throw new Error('Producto no encontrado');
                    }
                    await product.destroy();
                    return { success: "Producto eliminado exitosamente" };

                } catch (error) {
                    console.error('Error al eliminar el producto:', error);
                    throw new Error('Error al eliminar el producto');
                }
            },
            adjustStock: async function (args) {
                try {
                    const product = await Product.findByPk(args.id);
                    if (!product) {
                        throw new Error('Producto no encontrado');
                    }

                    const newStock = product.stock + args.quantity;

                    if (newStock < 0) {
                        throw new Error('El stock no puede ser negativo');
                    }

                    // Actualizar el stock de producto
                    product.stock = newStock || product.stock;

                    const productUpdated = await product.save();

                    return {
                        success: "Stock ajustado con éxito",
                        productId: args.id,
                        nombre: productUpdated.name,
                        cantidad: productUpdated.stock
                    };

                } catch (error) {
                    console.error('Error al ajustar el stock de productos:', error);
                    throw new Error('Error al ajustar el stock de productos');
                }
            },
        }
    }
};

module.exports = productService;
