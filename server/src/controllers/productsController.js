const { ProductServices, Categories } = require("../db");
const filterProducts = require("../../utils/filterProducts");
const { Op } = require("sequelize");

const getProductServices = async () => {
  try {
    const allProducts = await ProductServices.findAll({
      order: [["name", "ASC"]],
    });
    return { Items: allProducts };
  } catch (error) {
    throw new Error({ error: error.message });
  }
};

const getProductServicesById = async (id) => {
  try {
    const product = await ProductServices.findByPk(id);
    return product;
  } catch (error) {
    throw new Error({ error: error.message });
  }
};

const createProductServices = async (
  name,
  price,
  description,
  status,
  code,
  image_url,
  stock,
  category_id
) => {
  try {
    // Buscamos la categoria correspondiente con el id proporcionado.
    const category = await Categories.findByPk(category_id);

    if (!category) {
      throw new Error("Categoría no encontrada.");
    }

    const product = await ProductServices.create({
      name,
      price,
      description,
      status,
      code,
      image_url,
      stock,
    });

    // Agregamos la categoría correspondiente al producto.
    await category.addProductServices(product);

    // Establecemos que un producto solo puede pertenecer a una categoría.
    await product.setCategories(category);

    return { message: "Producto creado con exito.", product };
  } catch (error) {
    throw new Error(`Error al crear el producto: ${error.message}`);
  }
};

const updateProductServices = async (id, newData) => {
  try {
    const product = await ProductServices.findByPk(id);
    await product.update(newData);
    const updatedProducts = await ProductServices.findAll();
    return {
      message: "Producto actualizado exitosamente.",
      products: updatedProducts,
    };
  } catch (error) {
    throw new Error({ error: error.message });
  }
};

const deleteProductServices = async (id) => {
  try {
    const product = await ProductServices.findByPk(id);
    await product.destroy();
    const updatedProducts = await ProductServices.findAll();
    return {
      message: "Product deleted successfully",
      products: updatedProducts,
    };
  } catch (error) {
    throw new Error({ error: error.message });
  }
};

// ESTE ES EL CONROLLER DE  FILTROS Y ORDENAMIENTOS COMBINADOS
const filterAndOrder = async (
  sortOrder,
  minPrice,
  maxPrice,
  category_id,
  name,
  code
) => {
  try {
    const validate = sortOrder && sortOrder.toUpperCase();
    let whereClause = {};
    // Si se proporcionan minPrice y maxPrice, aplicar filtro por rango
    if (minPrice !== undefined && maxPrice !== undefined) {
      // Convertir las cadenas a números usando parseFloat
      const minPriceNum = parseFloat(minPrice);
      const maxPriceNum = parseFloat(maxPrice);

      // Verificar si las conversiones fueron exitosas
      if (!isNaN(minPriceNum) && !isNaN(maxPriceNum)) {
        const priceFilter = {
          price: {
            [Op.between]: [minPriceNum, maxPriceNum],
          },
        };
        whereClause = { ...whereClause, ...priceFilter };
      } else {
        throw new Error(
          "Los valores de minPrice y maxPrice deben ser números válidos."
        );
      }
    }
    //Si se proporciona category_id, name o code, aplicar filtro
    if (category_id || name || code) {
      const filterConditions = filterProducts(category_id, name, code);
      whereClause = { ...whereClause, ...filterConditions };
    }

    const orderClause = validate ? [["price", validate]] : undefined;

    const productosFilteredandOrdered = await ProductServices.findAll({
      where: whereClause,
      order: orderClause,
    });

    if (productosFilteredandOrdered.length === 0) {
      throw new Error(
        "No existen productos que cumplan con los criterios de búsqueda."
      );
    }

    return { Items: productosFilteredandOrdered };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getProductServices,
  getProductServicesById,
  createProductServices,
  updateProductServices,
  deleteProductServices,
  filterAndOrder,
};
