const Category = require("../model/Category");
const LocationModel = require("../model/Location");
const Store = require("../model/Store");
const Transection = require("../model/Transection");
const userModel = require("../model/userModel");



const getAllUser = (req, res) => {
    let data = {}
    async function getData() {
        await Category.find()
            .then(doc => {
                data.Category = doc.length
            })
            .catch(err => {
                console.log(err)
            })
        await LocationModel.find()
            .then(doc => {
                data.LocationModel = doc.length
            })
            .catch(err => {
                console.log(err)
            })

        await Store.find()
            .then(doc => {
                data.Store = doc.length
            })
            .catch(err => {
                console.log(err)
            })
        await Transection.find()
            .then(doc => {
                data.Transection = doc.length
            })
            .catch(err => {
                console.log(err)
            })
        await userModel.find()
            .then(doc => {
                data.usermo = doc.length
            })
            .catch(err => {
                console.log(err)
            })
        console.log(data);
        return res.json(data)
    }
    getData()
}



module.exports = {
    getAllUser
}