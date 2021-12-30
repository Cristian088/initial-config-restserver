const { response, request } = require("express");
const { ObjectId } = require('mongoose').Types;
const { User, Category, Product } = require('../models');
const collectionPermit = [
    'users',
    'categories',
    'products',
    'roles'
]

const findUsers = async( terms='', res=response ) => {

    const isMongoId = ObjectId.isValid( terms );

    if ( isMongoId ) {

        const user = await User.findById( terms );

        return res.status(200).json({
            results: ( user ) ? [ user ] : [ ]
        });

    }
    
    const regex = new RegExp( terms, 'i' );

    const users = await User.find({ 
        $or: [{ name: regex }, { email: regex}],
        $and: [{ state: true }]
     });

    return res.status(200).json({
        results: users 
    });

    
}

const findCategories = async( terms='', res=response ) => {

    const isMongoId = ObjectId.isValid( terms );

    if ( isMongoId ) {

        const category = await Category.findById( terms );

        return res.status(200).json({
            results: ( category ) ? [ category ] : [ ]
        });

    }
    
    const regex = new RegExp( terms, 'i' );

    const categories = await Category.find({ 
        $or: [{ name: regex }],
        $and: [{ state: true }]
     });

    return res.status(200).json({
        results: categories 
    });
 
}

const findProducts = async( terms='', res=response ) => {

    const isMongoId = ObjectId.isValid( terms );

    if ( isMongoId ) {

        const product = await Product.findById( terms )
                            .populate('categorie', 'name');

        return res.status(200).json({
            results: ( product ) ? [ product ] : [ ]
        });

    }
    
    const regex = new RegExp( terms, 'i' );

    const products = await Product.find({ 
        $or: [{ name: regex }],
        $and: [{ state: true }]
     }).populate('categorie', 'name');

    return res.status(200).json({
        results: products 
    });
 
}

const findAll = (req= request, res= response) => {

    const {collection, terms} = req.params

    if ( !collectionPermit.includes( collection ) ) {
        
        return res.status(404).json({
            msg: `Las colecciónes permitidas son: ${collectionPermit}`,
        })

    }

    switch ( collection ) {
        case 'users':
            findUsers( terms, res);   
        break;
        case 'categories':
            findCategories(terms, res)
        break;
        case 'products':
            findProducts(terms, res)
        break;
        default:
            res.status(500).json({
                msg:'Se me olvido de hacer esta busqueda'
            })
    }

}

module.exports = {
    findAll
}