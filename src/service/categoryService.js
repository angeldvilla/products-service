const Category = require('../models/category');

const categoryService = {
    CategoryService: {
        CategoryPort: {
            /* Funciones para categorias */
            getCategories: async function () {
                try {
                    const categories = await Category.findAll();

                    const categoryResponse = categories.map(c => {
                        return {
                            id: c.id,
                            categoria: c.name
                        }
                    });

                    return {
                        categories: categoryResponse
                    };

                } catch (error) {
                    console.error('Error al obtener categorías:', error);
                    throw new Error('Error al obtener categorías:');
                }
            },
            createCategory: async function (args) {
                try {
                    const existingCategory = await Category.findOne({ where: { name: args.name } });
                    
                    if (existingCategory) {
                        console.error('La categoria ya existe');
                    }
                    
                    const categorie = await Category.create(args);

                    return {
                        sucess: "Categoría creada exitosamente",
                        categorieId: categorie.id,
                        name: categorie.name,
                    };

                } catch (error) {
                    console.error('Error al crear la categoría:', error);
                    throw new Error('Error al crear la categoría:');
                }
            },
        }
    }
};

module.exports = categoryService;
