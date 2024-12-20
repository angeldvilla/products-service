const Product = require('../models/Product');
const Category = require('../models/category');
const Brand = require('../models/brand');
const { Op } = require('sequelize');

const productService = {
    ProductService: {
        ProductsPort: {
            /* Funciones para productos */
            getProducts: async function () {
                try {
                    const products = await Product.findAll({
                        include: [Category, Brand]
                    });

                    const productResponse = products.map(product => {
                        return {
                            id: product.id,
                            nombre: product.name,
                            descripcion: product.description,
                            precio: `$${product.price} COP`,
                            cantidad: product.stock,
                            descuento: `${product.discount}%`,
                            categoria: product.Category ? product.Category.name : null,
                            marca: product.Brand ? product.Brand.name : null
                        }
                    })

                    return { products: productResponse };

                } catch (error) {
                    console.log('Error al obtener productos:', error);
                    return { message: 'Error al obtener productos' };
                }
            },

            /* Funciones para obtener detalles de un producto */
            getProductDetails: async function (args) {
                try {
                    const product = await Product.findByPk(args.id, {
                        include: [Category, Brand]
                    });
                    if (!product) {
                        return {
                            message: 'Producto no encontrado',
                        }
                    }

                    const productResponse = {
                        id: product.id,
                        nombre: product.name,
                        descripcion: product.description,
                        precio: `$${product.price} COP`,
                        cantidad: product.stock,
                        descuento: `${product.discount}%`,
                        categoria: product.Category ? product.Category.name : null,
                        marca: product.Brand ? product.Brand.name : null
                    }

                    return { product: productResponse };

                } catch (error) {
                    console.log('Error al obtener detalles del producto:', error);
                    return { message: 'Error al obtener detalles del producto' };
                }
            },

            /* Funcion para filtrar productos por categoria */
            getProductsByCategory: async function (args) {
                try {
                    const products = await Product.findAll({
                        include: [{
                            model: Category,
                            where: { 
                                name: { 
                                    [Op.like]: `%${args.category_name}%`
                                } 
                            }
                        }],
                    });

                    if (products.length === 0) {
                        console.error('No se encontraron productos para la categoría especificada');
                        return {
                           message: "No se encontraron productos para la categoría especificada",
                           products: []
                        };
                    }

                    const productResponse = products.map(product => {
                        return {
                            id: product.id,
                            nombre: product.name,
                            descripcion: product.description,
                            precio: `$${product.price} COP`,
                            cantidad: product.stock,
                            descuento: `${product.discount}%`,
                            categoria: product.Category ? product.Category.name : null
                        }
                    })

                    return { products: productResponse };

                } catch (error) {
                    console.log('Error al obtener productos por categoría:', error);
                    return { message: 'Error al obtener productos por categoría' };
                }
            },

            /* Funcion para filtrar productos por marca */
            getProductsByBrand: async function (args) {
                try {
                    const products = await Product.findAll({
                        include: [{
                            model: Brand,
                            where: { 
                                name: { 
                                    [Op.like]: `%${args.brand_name}%`
                                } 
                            }
                        }],
                    });

                    if (products.length === 0) {
                        console.error('No se encontraron productos para la marca especificada');
                        return {
                           message: "No se encontraron productos para la marca especificada",
                           products: []
                        };
                    }

                    const productResponse = products.map(product => {
                        return {
                            id: product.id,
                            nombre: product.name,
                            descripcion: product.description,
                            precio: `$${product.price} COP`,
                            cantidad: product.stock,
                            descuento: `${product.discount}%`,
                            marca: product.Brand ? product.Brand.name : null
                        }
                    })

                    return { products: productResponse };

                } catch (error) {
                    console.log('Error al obtener productos por marca:', error);
                    return { message: 'Error al obtener productos por marca' };
                }
            },

            /* Función para buscar un producto por nombre */
            getProductsByName: async function (args) {
                try {
                    const products = await Product.findAll({
                        where: { name: {
                            [Op.like]: `%${args.product_name}%`
                        } },
                        include: [Category, Brand],
                    });
            
                    if (products.length === 0) {
                        console.error('Producto no encontrado');
                        return {
                            message: "Producto no encontrado",
                            products: []
                        };
                    }

                    const productResponse = products.map(product => {
                        return {
                            id: product.id,
                            nombre: product.name,
                            descripcion: product.description,
                            precio: `$${product.price} COP`,
                            cantidad: product.stock,
                            descuento: `${product.discount}%`,
                            categoria: product.Category ? product.Category.name : null,
                            marca: product.Brand ? product.Brand.name : null
                        }
                    })

                    return { products: productResponse };
                } catch (error) {
                    console.log('Error al obtener el producto por nombre:', error);
                    return { message: 'Error al obtener el producto por nombre' };
                }
            },

            /* Funciones para crear productos */
            createProduct: async function (args) {
                try {
                    const existingProduct = await Product.findOne({ where: { name: args.name } });

                    if (existingProduct) {
                        return { message: 'El producto ya existe' }
                    }

                    const newProduct = await Product.create(args);
                    const category = await Category.findOne({ where: { id: args.category_id } })
                    const brand = await Brand.findOne({ where: { id: args.brand_id } })

                    return {
                        sucess: "Producto creado exitosamente",
                        productId: newProduct.id,
                        nombre: newProduct.name,
                        categoria: category.name,
                        marca: brand.name
                    };

                } catch (error) {
                    console.log('Error al crear el producto:', error);
                    return { message: 'Error al crear el producto:' };
                }
            },

            updateProduct: async function (args) {
                try {
                    const product = await Product.findByPk(args.id);
                    if (!product) {
                        return { message: 'Producto no encontrado' }
                    }

                    //Actualizar campos de producto
                    product.name = args.name || product.name;
                    product.description = args.description || product.description;
                    product.price = args.price || product.price;
                    product.stock = args.stock || product.stock;
                    product.discount = args.discount || product.discount;
                    product.category_id = args.category_id || product.category_id;
                    product.brand_id = args.brand_id || product.brand_id;

                    const productUpdated = await product.save();

                    const productResponse = {
                        id: productUpdated.id,
                        nombre: productUpdated.name,
                        descripcion: productUpdated.description,
                        precio: `$${productUpdated.price} COP`,
                        cantidad: productUpdated.stock,
                        descuento: `${productUpdated.discount}%`,
                        categoria: productUpdated.Category ? productUpdated.Category.name : null,
                        marca: product.Brand ? product.Brand.name : null
                    };

                    return {
                        success: "Producto actualizado exitosamente",
                        product: productResponse
                    };

                } catch (error) {
                    console.log('Error al actualizar el producto:', error);
                    return { message: 'Error al actualizar el producto' };
                }
            },

            deleteProduct: async function (args) {
                try {
                    const product = await Product.findByPk(args.id);
                    if (!product) {
                        return { message: 'Producto no encontrado' }
                    }
                    await product.destroy();
                    return { success: "Producto eliminado exitosamente" };

                } catch (error) {
                    console.log('Error al eliminar el producto:', error);
                    return { message: 'Error al eliminar el producto' };
                }
            },

            newStock: async function (args) {
                try {
                    const product = await Product.findByPk(args.id);
                    if (!product) {
                        return { message: 'Producto no encontrado' };
                    }

                    if(args.quantity <= 0) {
                        return { message: 'El stock no puede ser negativo o cero' }
                    }

                    const newStock = product.stock + parseInt(args.quantity);

                    // Actualizar el stock de producto
                    product.stock = newStock;
            
                    const productUpdated = await product.save();

                    return {
                        success: "Stock ajustado con éxito",
                        productId: args.id,
                        nombre: productUpdated.name,
                        cantidad: productUpdated.stock
                    };

                } catch (error) {
                    console.log('Error al ajustar el stock de productos:', error);
                    return { error: 'Error al ajustar el stock de productos' };
                }
            },

            adjustStock: async function (args) {
                try {
                    const product = await Product.findByPk(args.id);
                    if (!product) {
                        return { message: 'Producto no encontrado' };
                    }

                    if(product.stock < args.quantity) {
                        return { message: 'Stock insuficiente' }
                    }

                    const newStock = product.stock - args.quantity;

                    if(!args.quantity) {
                        // Actualizar el stock de producto
                        product.stock = product.stock;
                    } else {
                        product.stock = newStock;
                    }

                    const productUpdated = await product.save();

                    return {
                        success: "Stock ajustado con éxito",
                        productId: args.id,
                        nombre: productUpdated.name,
                        cantidad: productUpdated.stock
                    };

                } catch (error) {
                    console.log('Error al ajustar el stock de productos:', error);
                    return { error: 'Error al ajustar el stock de productos' };
                }
            },
        }
    }
};

module.exports = productService;
