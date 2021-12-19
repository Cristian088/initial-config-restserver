const { response, request } = require("express");

const usersGet = (req = request, res = response) => {

    const {limit, offset, identy} = req.query;

  res.json({
    msg: "GET API - controlador",
    limit,
    offset,
    identy
  });
};

const usersPost = (req = request, res = response) => {
  const {name, age, phone} = req.body;

  res.json({
    msg: "POST API - controlador",
    name,
    age,
    phone
  });
};

const usersPut = (req = request, res = response) => {

    const idsUser = req.params.idUser;

  res.json({
    msg: "PUT API - controlador",
    idsUser
  });
};

const usersDelete = (req = request, res = response) => {
  res.json({
    msg: "DELETE API - controlador",
  });
};

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
};
