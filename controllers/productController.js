const { request, response } = require("express");
const { Product } = require("../models");


const getProductAll = async(req = request, res = response) =>{

  const { offset = 0, limit = 5 } = req.query;

  const filter = { state: true };

  const [totalProduct, product] = await Promise.all([
    Product.countDocuments(filter),
    Product.find(filter)
      .populate("user", "name")
      .populate("categorie", "name")
      .skip(Number(offset))
      .limit(Number(limit))
  ]);

  res.status(200).json({
    totalProduct,
    product,
  });

}

const getProductById = async(req = request, res = response) =>{
  
  const idProdruct = req.params.idProdruct;

  const prodruct = await Product.findById(idProdruct)
                                .populate("user", "name")
                                .populate("categorie", "name");

  res.status(200).json({
    prodruct,
  });

}


const createProduct = async(req = request, res= response) => {

    const {state, disposable, ...datanew } = req.body;

    datanew.name = datanew.name.toUpperCase();
    datanew.user = req.userAuth._id;
    datanew.categorie = datanew.categorie

    const product = new Product(datanew);

    const createProd = await product.save();

    if (createProd) {
        return res.status(201).json({
          msg: "Producto creado correctamente.",
          createProd,
        });
    } else {
        return res.status(400).json({
          msg: "Error al crear.",
        });
    }


}

const updateProductById = async(req = request, res = response) => {

  const idProdruct = req.params.idProdruct;

  const { state, user, ...data } = req.body;

  if (data.name) {
    
    data.name = data.name.toUpperCase();
    
  }
  data.user = req.userAuth._id

  const prodructNew = await Product.findByIdAndUpdate(idProdruct, data, { new: true })

  if ( prodructNew ) {
    return res.status(200).json({
      msg: "Producto actualizado correctamente.",
      prodructNew,
    });
  } else {
    return res.status(400).json({
      msg: "Error al actualizar.",
    });
  }

}

const deleteProductById = async(req = request, res = response) => {

  const idProdruct = req.params.idProdruct;
  const query = { state: false }

  const productDel = await Product.findByIdAndUpdate( idProdruct, query, { new: true } )


  if (productDel) {
   return res.status(200).json({
     msg: "Producto eliminado correctamente.",
     productDel,
   });
 } else {
   return res.status(400).json({
     msg: "Error al eliminar.",
   });
 }

}


module.exports = {
    createProduct,
    deleteProductById,
    updateProductById,
    getProductAll,
    getProductById
}