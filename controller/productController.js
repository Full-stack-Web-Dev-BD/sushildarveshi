const Product = require("../model/Product");
const ProductCatalogModel = require("../model/ProductCatalogModel");
const ProductGroupModel = require("../model/ProductGroupModel");

module.exports = {
    createProduct(req, res) {
        async function create() {
            new Product(req.body)
                .save()
                .then(doc => {
                    // console.log('added');
                })
                .catch(err => {
                    return console.log(err);
                })
            ProductGroupModel.findOne()
                .then(doc => {
                    let existingGroup = doc.productGroup
                    let updatedGroup = [...existingGroup]

                    function mapAndPush() {
                        if (updatedGroup.findIndex(group => (req.body.productGroupCode === group.groupName)) === -1) {
                            console.log('pushed');
                            updatedGroup.push({ groupName: req.body.productGroupCode.toUpperCase(), description: '' })
                        } else {
                            // console.log('existing group');
                        }
                        ProductGroupModel.findOne()
                            .then(doc => {
                                doc.productGroup = updatedGroup
                                doc.save()
                                    .then(updated => {
                                        // return console.log(updated);
                                    })
                                    .catch(err => {
                                        return console.log(err);
                                    })
                            })

                            .catch(err => {
                                return console.log(err);
                            })
                    }
                    mapAndPush()
                })
                .catch(err => {
                    return console.log(err);
                })

            ProductCatalogModel.findOne()
                .then(doc => {
                    let existingcatalog = doc.catalog
                    let updatedcatalog = [...existingcatalog]

                    function mapAndPushCatalog() {
                            if (updatedcatalog.findIndex(catalog => (req.body.catalogCode === catalog.catalogName)) === -1) {
                                updatedcatalog.push({ catalogName: req.body.catalogCode.toUpperCase(), description: '' })
                            } else {
                                console.log('existing catalog');
                            }
                        ProductCatalogModel.findOne()
                            .then(doc => {
                                doc.catalog = updatedcatalog
                                doc.save()
                                    .then(updated => {
                                        return console.log(updated);
                                    })
                                    .catch(err => {
                                        return console.log(err);
                                    })
                            })

                            .catch(err => {
                                return console.log(err);
                            })
                    }
                    mapAndPushCatalog()
                })
                .catch(err => {
                    return console.log(err);
                })
            return res.status(200).json({ message: "Product Uploaded" })
        }
        create()
    },
    createProductCatalog(req,res){
        ProductCatalogModel.findOne()
        .then(doc=>{
            let existingCatalog=[...doc.catalog]
            let index=existingCatalog.findIndex(el=>el.catalogName===req.body.catalogCode)
            if(index!==-1) return res.sendStatus(400)
            existingCatalog.push({catalogName:req.body.catalogCode,description:req.body.description})
            doc.catalog=existingCatalog
            doc.save()
            .then(updatedDoc=>{
                res.json(updatedDoc)
            })
            .catch(err=>{
                res.sendStatus(500)
            })     
        })
    },
    createProductGroup(req,res){
        ProductGroupModel.findOne()
        .then(doc=>{
            let existingproductGroup=[...doc.productGroup]
            let index=existingproductGroup.findIndex(el=>el.groupName===req.body.groupName)
            if(index!==-1) return res.sendStatus(400)
            existingproductGroup.push({groupName:req.body.groupName,description:req.body.description})
            doc.productGroup=existingproductGroup
            doc.save()
            .then(updatedDoc=>{
                res.json(updatedDoc)
            })
            .catch(err=>{
                res.sendStatus(500)
            })     
        })
    },
// retrive
    getAllProduct(req, res) {
        Product.find()
            .then(doc => {
                return res.json(doc)
            })
            .catch(err => {
                console.log(err);
            })
    },
    getAllProductGroup(req, res) {
        ProductGroupModel.findOne()
            .then(doc => {
                return res.json(doc.productGroup)
            })
            .catch(err => console.log(err))
    },
    getAllProductCatalog(req, res) {
        ProductCatalogModel.findOne()
            .then(doc => {
                return res.json(doc.catalog)
            })
            .catch(err => {
                console.log(err)
                return res.status(500).json({ massage: "Server err" })
            })
    },


    // update
    updateProduct(req, res) {
        Product.findByIdAndUpdate({ _id: req.params.id }, req.body)
            .then(doc => {
                return res.json(doc)
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json({ massage: "Server err" })
            })
    },



// delete

    deleteProduct(req, res) {
        Product.findByIdAndDelete(req.params.id)
            .then(doc => {
                return res.json(doc)
            })
            .catch(err => {
                return res.status(500).json({ massage: "Server err" })
            })
    },
    deleteProductCatalog(req,res){
        // return  console.log(req.params.id);
        ProductCatalogModel.findOne()
        .then(doc=>{
            let existingCatalog=doc.catalog
            let index=existingCatalog.findIndex(el=>el.catalogName===req.params.id)
            existingCatalog.splice(index,1)
            doc.catalog=existingCatalog
            doc.save()
            .then(updatedDoc=>{
                console.log('catalog deleted ',updatedDoc);
                res.json(updatedDoc)
            })
            .catch(err=>{
                res.sendStatus(500)
            })            
        })
    },
    deleteProductGroup(req,res){
        // return  console.log(req.params.id);
        ProductGroupModel.findOne()
        .then(doc=>{
            let existing=doc.productGroup
            let index=existing.findIndex(el=>el.groupName===req.params.id)
            existing.splice(index,1)
            doc.productGroup=existing
            doc.save()
            .then(updatedDoc=>{
                console.log('catalog deleted ',updatedDoc);
                res.json(updatedDoc)
            })
            .catch(err=>{
                res.sendStatus(500)
            })            
        })
    },
}