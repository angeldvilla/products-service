const Product = require('../models/Product');
const Category = require('../models/category');

const catalogService = {
    CatalogService: {
        CatalogPort: {
            getCategories: async function () {
                try {
                    const categories = await Category.findAll();
                    return { categories: categories.map(c => c.dataValues) };
                } catch (error) {
                    console.error('Error fetching categories:', error);
                    throw new Error('Error fetching categories');
                }
            },
            createCategory: async function (args) {
                try {
                    const categorie = await Category.create(args);
                    return {
                        sucess: "Category created successfully",
                        categorieId: categorie.id,
                        name: categorie.name,
                    };
                } catch (err) {
                    console.error('Error creating product:', err);
                    throw new Error('Error creating product');
                }
            },
            getProducts: async function (args) {
                try {
                    const products = await Product.findAll();
                    return { products: products.map(p => p.dataValues) };
                } catch (err) {
                    console.error('Error fetching products:', err);
                    throw new Error('Error fetching products');
                }
            },
            getProductDetails: async function (args) {
                try {
                    const product = await Product.findByPk(args.id);
                    if (!product) {
                        throw new Error('Product not found');
                    }
                    return product.dataValues;
                } catch (err) {
                    console.error('Error fetching product details:', err);
                    throw new Error('Error fetching product details');
                }
            },
            createProduct: async function (args) {
                try {
                    const product = await Product.create(args);
                    return {
                        sucess: "Product created successfully",
                        productId: product.id,
                        name: product.name,
                    };
                } catch (err) {
                    console.error('Error creating product:', err);
                    throw new Error('Error creating product');
                }
            },
            updateProduct: async function (args) {
                try {
                    const product = await Product.findByPk(args.id);
                    if (!product) {
                        throw new Error('Product not found');
                    }
                    await product.update(args);
                    return { success: "Product updated successfully", productId: args.id, name: args.name };

                } catch (error) {
                    console.error('Error updating product:', err);
                    throw new Error('Error updating product');
                }
            },
            deleteProduct: async function (args) {
                try {
                    const product = await Product.findByPk(args.id);
                    if (!product) {
                        throw new Error('Product not found');
                    }
                    await product.destroy();
                    return { success: "Product deleted successfully" };

                } catch (error) {
                    console.error('Error deleting product:', err);
                    throw new Error('Error deleting product');
                }
            },
            adjustStock: async function (args) {
                try {
                    const product = await Product.findByPk(args.id);
                    if (!product) {
                        throw new Error('Product not found');
                    }
                    const newStock = product.stock + args.quantity;
                    if (newStock < 0) {
                        throw new Error('Stock cannot be negative');
                    }
                    product.stock = newStock;
                    await product.save();
                    return { success: "Stock adjusted successfully", productId: args.id, name: product.name, stock: newStock };
                } catch (error) {
                    console.error('Error adjust the stock of products:', err);
                    throw new Error('Error adjust the stock of products');
                }
            },
        }
    }
};

module.exports = catalogService;
