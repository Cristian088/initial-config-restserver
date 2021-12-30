const { request, response } = require("express");
const { Category } = require("../models");

const categoryGetAll = async (req = request, res = response) => {
  const { offset = 0, limit = 5 } = req.query;

  const filter = { state: true };

  const [totalCategory, category] = await Promise.all([
    Category.countDocuments(filter),
    Category.find(filter)
      .populate("user", "name")
      .skip(Number(offset))
      .limit(Number(limit)),
  ]);

  res.status(200).json({
    totalCategory,
    category,
  });
};

const categoryGetById = async (req = request, res = response) => {
  const idCategory = req.params.idCategory;

  const category = await Category.findById(idCategory).populate("user", "name");

  res.status(200).json({
    category,
  });
};

const createCategoryPost = async (req = request, res = response) => {
  const name = req.body.name.toUpperCase();

  const dataCategory = {
    name,
    user: req.userAuth._id,
  };

  const category = new Category(dataCategory);

  const create = await category.save();

  if (create) {
    return res.status(201).json({
      msg: "Categoria creada correctamente.",
      category,
    });
  } else {
    return res.status(400).json({
      msg: "Error al crear.",
    });
  }
};

const updateCategoryPut = async (req = request, res = response) => {

  const idCateg = req.params.idCategory;

  const { state, user, ...data } = req.body;

  data.name = data.name.toUpperCase();
  data.user = req.userAuth._id

  const categoryNew = await Category.findByIdAndUpdate(idCateg, data, { new: true })

  if ( categoryNew ) {
    return res.status(200).json({
      msg: "Categoria actualizado correctamente.",
      categoryNew,
    });
  } else {
    return res.status(400).json({
      msg: "Error al actualizar.",
    });
  }
};

const deleteCategoryById = async (req = request, res = response) => {

  const idCate = req.params.idCategory;
  const query = { state: false }

  const categoryDel = await Category.findByIdAndUpdate( idCate, query, { new: true } )


  if (categoryDel) {
   return res.status(200).json({
     msg: "Categoria eliminado correctamente.",
     categoryDel,
   });
 } else {
   return res.status(400).json({
     msg: "Error al eliminar.",
   });
 }
};

module.exports = {
  categoryGetAll,
  categoryGetById,
  createCategoryPost,
  updateCategoryPut,
  deleteCategoryById,
};
