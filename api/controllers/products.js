const Product = require('../models/product');
const mongoose = require('mongoose');

exports.products_get_all = (req, res, next) => {
    Product.find()
    .select('_id name price productImage')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            products: docs.map(doc => {
                return {
                    name: doc.name,
                    price: doc.price,
                    productImage: doc.productImage,
                    _id: doc._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/' + doc._id
                    }
                }
            })
        }
        console.log(docs);
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err); 
        res.status(500).json({error: err})
    });
}

exports.products_create =  (req, res, next) => {
    console.log(req.file);
    const product = new Product({
        _id:  new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });
    product
    .save()
    .then(result => {
        console.log(result)
    })
    .catch(err => console.log(err));

    res.status(201).json({
        message: "Product created",
        createProduct: {
            name: product.name,
            price: product.price,
            _id: product._id,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/products/'+product._id
            }
        }
    });
}

exports.products_get_one =  (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
    .select('_id name price productImage')
    .exec()
    .then(doc => {
        console.log("From database", doc);
        if (doc) {
            res.status(200).json({
                products: doc,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/products/'+doc._id
                }
            });
        } else {
            res.status(404).json({message: 'No valid entry found for provided ID'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
}

exports.products_update =  (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body){
        // catch the field(s) which need to be updated 
        updateOps[ops.propName] = ops.value;
    }
    // set the fields which need to updated
    Product.update({_id: id}, {$set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Product updated',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/products/'+id
            }
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err})
    });
}

exports.products_delete =  (req, res, next) => {
    const id = req.params.productId;
    Product.deleteOne({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Product deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:3000/products/',
                body: {
                    name: 'String',
                    price: 'Number'
                }
            }
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err})
    });
}