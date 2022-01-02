const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL );

const { request, response } = require("express");
const { upLoadFile } = require("../helpers");
const {  User, Product } = require("../models");



const viewImgs = async( req = request, res= response ) => {

    const {idcollection, collection} = req.params

    let model

    switch ( collection ) {
        case 'users':

            model = await User.findById(idcollection);

            if ( !model ) {
                res.status(400).json({
                    msg: `El Usuario con el id ${idcollection}, no existe.`
                })
            }
            
            break;

        case 'products':

            model = await Product.findById(idcollection);

            if ( !model ) {
                res.status(400).json({
                    msg: `El producto con el id ${idcollection}, no existe.`
                })
            }
            
            break;
    
        default:
            return res.status(500).json({msg: 'Comunicate con el administrador'});
    }


    //Limpiar variables previas
    if ( model.img ) {
        
        const pathImg = path.join(__dirname, "../uploads/", collection, model.img);

        if (fs.existsSync(pathImg)) {
           return res.sendFile( pathImg );
        }
    }

    const pathImg = path.join(__dirname, "../assest/no-image.jpg");

    res.sendFile(pathImg);
}


const loadFile = async(req = request, res= response) => {

    try {
        
        const nameFile = await upLoadFile(req.files,undefined,'imgs');
    
        res.status(200).json({
            nameFile
        });

    } catch (msg) {

        res.status(400).json( {msg} );
        
    }
}

const updateImge = async( req=request, res=response ) => {

    const {idcollection, collection} = req.params

    let model

    switch ( collection ) {
        case 'users':

            model = await User.findById(idcollection);

            if ( !model ) {
                res.status(400).json({
                    msg: `El Usuario con el id ${idcollection}, no existe.`
                })
            }
            
            break;

        case 'products':

            model = await Product.findById(idcollection);

            if ( !model ) {
                res.status(400).json({
                    msg: `El producto con el id ${idcollection}, no existe.`
                })
            }
            
            break;
    
        default:
            return res.status(500).json({msg: 'Comunicate con el administrador'});
    }


    //Limpiar variables previas
    if ( model.img ) {
        
        const pathImg = path.join(__dirname, "../uploads/", collection, model.img);

        if (fs.existsSync(pathImg)) {
            fs.unlinkSync( pathImg )
        }
    }

    const nameFile = await upLoadFile(req.files, undefined, collection);

    model.img = nameFile;

    await model.save();

    res.status(200).json({ model })


}

const updateImgeCloudinary = async( req=request, res=response ) => {

    const {idcollection, collection} = req.params

    let model

    switch ( collection ) {
        case 'users':

            model = await User.findById(idcollection);

            if ( !model ) {
                res.status(400).json({
                    msg: `El Usuario con el id ${idcollection}, no existe.`
                })
            }
            
            break;

        case 'products':

            model = await Product.findById(idcollection);

            if ( !model ) {
                res.status(400).json({
                    msg: `El producto con el id ${idcollection}, no existe.`
                })
            }
            
            break;
    
        default:
            return res.status(500).json({msg: 'Comunicate con el administrador'});
    }


    //Limpiar variables previas
    if ( model.img ) {
        
        const nameUrl = model.img.split('/')

        const nameFileC = nameUrl[ nameUrl.length - 1]

        const [ public_id ] = nameFileC.split('.');
        
        cloudinary.uploader.destroy( public_id )
    }

    const { tempFilePath } = req.files.file

    const { secure_url } = await cloudinary.uploader.upload( tempFilePath );

    model.img = secure_url;
    
    await model.save();

    res.status(200).json({ model })


}

module.exports = {
    loadFile,
    updateImge,
    viewImgs,
    updateImgeCloudinary
}