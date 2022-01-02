const path = require("path");

const { v4: uuidv4 } = require("uuid");

const { request, response } = require("express");

const extsPermit = ['png', 'jpg', 'jpeg', 'gif'];

const upLoadFile = (files, extenPermit = extsPermit, folder = '' ) => {

  return new Promise((resolve, reject) => {

    const { file } = files;
    const extPermit = extenPermit;
    const cutName = file.name.split(".");
    const ext = cutName[cutName.length - 1];

    if ( !extPermit.includes(ext) ) {
        return reject(`Extensión no permitida - ${ext} - ${extPermit}`) ;
    }

    const nameTemp = uuidv4() + "." + ext;
    uploadPath = path.join(__dirname, "../uploads/", folder, nameTemp);

    file.mv(uploadPath, (err) => {
      if (err) {
        reject( err );
      }
      resolve( nameTemp );
    });
  });
};

module.exports = {
  upLoadFile,
};
