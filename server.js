const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const mongoos = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const multer = require('multer')
const mailer = require('./mailer')
const userRouter = require('./router/userRouter')
const transection = require('./router/transection')
const path = require('path')
const userModel = require('./model/userModel')
var XLSX = require('xlsx');
const Product = require('./model/Product')
const ProductGroupModel = require('./model/ProductGroupModel')
const e = require('express')





app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './client/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now().toString() + file.originalname)
    }
})

const storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now().toString() + file.originalname)
    }
})

const upload = multer({ storage: storage })
const upload2 = multer({ storage: storage2 })



app.use(userRouter)
app.post('/send-email', upload2.single('file'), (req, res) => {
    mailer(
        req.body.from,
        req.body.to.split(','),
        req.body.subject,
        req.body.massage,
        req.file.filename,
        res
    )
})

app.post('/uploadPP', upload.single('file'), (req, res) => {
    userModel.findOne({ _id: req.body.uid })
        .then(user => {
            user.pp = req.file.filename
            user.save()
                .then(user => {
                    res.status(200).json(user)
                })
                .catch(err => {
                    return res.status(500).json({ message: "Server error occurd " })
                })
        })
        .catch(err => {
            console.log(err);
        })
})

app.post('/upload-product', upload2.single('file'), (req, res) => {
    var workbook = XLSX.readFile(`./uploads/${req.file.filename}`, { cellDates: true });
    var sheet_name_list = workbook.SheetNames;
    let result = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])

    async function importToDB() {
        // let pushDb = result.map(async element => {
        //     await new Product({
        //         productCode: element['Product Code'],
        //         description: element.Description,
        //         productGroupCode: element['Product Group Code'],
        //         MOQ: element.MOQ,
        //         status: element.Status,
        //         catalogCode: element.CatalogCode
        //     })
        //         .save()
        //         .then(doc => {
        //             // console.log('added');
        //         })
        //         .catch(err => {
        //             return console.log(err);
        //         })
        // })
        let createProductGroup=result.map(async el=>{            
            // await ProductGroupModel.findOne({ productGroupCode: el['Product Group Code'] })
            await ProductGroupModel.findOne({ productGroupCode: el['Product Group Code'] })
                .then(productGroup => {
                    let =[]
                    console.log(productGroup);

                    // if (productGroup) {
                    //     console.log('Existing Grup');
                    // } else {
                    //      new ProductGroupModel({
                    //         productGroupCode: el['Product Group Code']
                    //     }).save()
                    //         .then(doc => {
                    //             // console.log('added');
                    //         })
                    //         .catch(err => {
                    //             return console.log(err);
                    //         })
                    // }
                })
                .catch(err => {
                    return console.log(err);
                })
        })
        await Promise.all(createProductGroup)
        // await Promise.all(pushDb)
        // console.log('done');
        return res.status(200).json({ message: "Product Uploaded" })
    }
    importToDB()
})

app.use("/uploads", express.static("uploads"));

app.use(express.static(path.join(__dirname, './client/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.listen(PORT, (req, res) => {
    console.log('Server started on port ', PORT)
    // mongoos.connect('mongodb+srv://user:user@mern.a77ou.mongodb.net/loadapplication?retryWrites=true&w=majority', { useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true }, (err => {
    mongoos.connect('mongodb://localhost/material-business', { useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true }, (err => {
        if (err) {
            console.log(err)
            return
        }
        console.log('Mongodb  connected')
        ProductGroupModel.find()
        .then(groups=>{
            if(groups.length<1){
                new ProductGroupModel({})
                .save()
                .then(doc=>{})
                .catch(err=>{
                    console.log(err);
                })
            }
        })
    }))
})