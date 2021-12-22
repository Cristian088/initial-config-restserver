const { response, request } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/userModel");

const usersGet = async(req = request, res = response) => {
  
  const { offset=0, limit=5 } = req.query;
  
  const filter = { state: true };

  const [totalUsers, users] = await Promise.all([
    User.countDocuments(filter),
    User.find(filter)
        .skip( Number(offset) )
        .limit( Number(limit) )
  ]);

  res.json({
    totalUsers,
    users  
  });
};

const usersPost = async (req = request, res = response) => {
  const { name, email, password, rol } = req.body;

  const user = new User({ name, email, password, rol });

  // encriptar la contraseña
  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(password, salt);

  //Guardar en la base de datos
  const create = await user.save();

  if (create) {
    return res.status(200).json({
      msg: "Usuario creado correctamente.",
      user,
    });
  } else {
    return res.status(400).json({
      msg: "Error al crear.",
    });
  }
};

const usersPut = async (req = request, res = response) => {
  const idUser = req.params.idUser;

  const { _id, password, google, email, ...dataUpd } = req.body;

  if (password) {
    const salt = bcrypt.genSaltSync(10);
    dataUpd.password = bcrypt.hashSync(password, salt);
  }

  const userUpd = await User.findByIdAndUpdate(idUser, dataUpd);

  if (userUpd) {
    return res.status(200).json({
      msg: "Usuario actualizado correctamente.",
      userUpd,
    });
  } else {
    return res.status(400).json({
      msg: "Error al actualizar.",
    });
  }
};

const usersDelete = async(req = request, res = response) => {

    const { idUser } = req.params;
    const query = { state: false }

   const userDelete = await User.findByIdAndUpdate(idUser, query);

   if (userDelete) {
    return res.status(200).json({
      msg: "Usuario eliminado correctamente.",
      userDelete,
    });
  } else {
    return res.status(400).json({
      msg: "Error al eliminar.",
    });
  }

};

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
};
