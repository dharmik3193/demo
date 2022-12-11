const products = require("../model/productModel");
const user = require("../model/userModel");
const ObjectId = require('mongodb').ObjectID;

const createProduct = async (req, res) => {
    try {
        const create = new products({
            product_image: req.body.product_image,
            product_name: req.body.product_name,
            product_description: req.body.product_description,
            product_price: req.body.product_price,
            user_id: req.params.id
        });
        const response = await create.save();
        res.status(201).send(response);
    } catch (error) {
        res.status(401).send(error.message);
    }
};
const getproduct = async (req, res) => {
    try {
        const findData = await products.find();
        res.status(200).send(findData);
    } catch (error) {
        res.status(400).send(error);
    }
}
const userSelectProduct = async (req, res) => {
    try {
        const _id = req.params.id;
        const userByProduct = await user.aggregate([{
            '$lookup': {
                'from': 'products',
                'localField': '_id',
                'foreignField': 'user_id',
                'as': 'products'
            }
        }, {
            '$match': {
                '_id': new ObjectId(_id)
            }
        }]);
        res.status(200).send(userByProduct);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const updateproduct = async (req, res) => {
    try {
        const _id = req.params.id;
        console.log(_id);
        const updateProduct = await products.findByIdAndUpdate(_id, req.body, { new: true });
        res.status(201).send(updateProduct);
    } catch (error) {
        res.status(401).send(error.message);
    }
}
const deleteproduct = async (req, res) => {
    try {
        const _id = req.params.id;
        const deleteProduct = await products.findByIdAndDelete(_id);
        res.status(200).send(deleteProduct);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
module.exports = { createProduct, getproduct, userSelectProduct, updateproduct, deleteproduct };