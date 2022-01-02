const {Schema, model} = require('mongoose');

const productSchema = Schema({
    
    name: {
        type: String,
        required: [true,"El nombre es requerido"],
        uniqued: true
    },

    state: {
        type: Boolean,
        required: true,
        default: true
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    price: {
        type: Number,
        default: 0
    },

    categorie: {
        type: Schema.Types.ObjectId,
        ref: 'Categorie',
        required: true
    },

    description:{
        type: String
    },

    disposable:{
        type: Boolean,
        default: true
    },

    img:{ type: String }

});

productSchema.methods.toJSON = function () {
    const { __v, _id, ...product } = this.toObject();
    product.uid = _id
    return product
}

module.exports = model( 'Product', productSchema )