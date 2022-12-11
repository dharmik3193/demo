const user = require("../model/userModel");
const bcrypt = require("bcryptjs");
const userRegister = async (req, res) => {
    try {
        const register = new user({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        register.password = await bcrypt.hash(register.password, 10);
        const userdata = await register.save();
        res.status(201).send(userdata);
    } catch (error) {
        res.status(401).send(error);
    }
};

const userLogin = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const userData = await user.findOne({ email: email });
        const isMatch = await bcrypt.compare(password, userData.password);
        if (isMatch) {
            const token = await userData.generatToken();
            res.status(201).send(userData);
        }
        else {
            res.status(400).send("password is not valid")
        }
    } catch (error) {
        res.status(401).send(error.message);
    }
};

const getUser = async (req, res) => {
    try {
        const response = await user.find();
        res.status(200).send(response)
    } catch (error) {
        res.status(400).send(error);
    }
}

const updateUser = async (req, res) => {
    const _id = req.params.id;
    try {
        const updateData = await user.findByIdAndUpdate(_id, req.body, { new: true });
        res.status(201).send(updateData);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const deleteUser = async (req, res) => {
    const _id = req.params.id;
    try {
        const deleteData = await user.findByIdAndDelete(_id);
        res.status(200).send(deleteData);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
module.exports = { userRegister, userLogin, getUser, updateUser, deleteUser };