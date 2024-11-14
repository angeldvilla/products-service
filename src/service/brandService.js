const Brand = require('../models/brand');

const brandService = {
    BrandService: {
        BrandPort: {
            /* Funciones para categorias */
            getBrands: async function () {
                try {
                    const brands = await Brand.findAll();

                    const brandResponse = brands.map(c => {
                        return {
                            id: c.id,
                            marca: c.name
                        }
                    });

                    return {
                        brands: brandResponse
                    };

                } catch (error) {
                    console.error('Error al obtener marcas:', error);
                    return { message: 'Error al obtener marcas' };
                }
            },
            createBrand: async function (args) {
                try {
                    const existingBrand = await Brand.findOne({ where: { name: args.name } });
                    
                    if (existingBrand) {
                        console.error('La marca ya existe');
                    }
                    
                    const brand = await Brand.create(args);

                    return {
                        sucess: "Marca creada exitosamente",
                        brandId: brand.id,
                        name: brand.name,
                    };

                } catch (error) {
                    console.error('Error al crear la marca:', error);
                    return { messsage: 'Error al crear la marca' };
                }
            },
        }
    }
};

module.exports = brandService;
