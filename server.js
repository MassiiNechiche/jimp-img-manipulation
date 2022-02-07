const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const multer = require('multer')
const path = require('path')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const resize = require('./resize')
const Jimp = require('jimp')

app.post('/upload', (req, res) => {
    const storage = multer.diskStorage({
        destination: path.join(__dirname, './assets', 'uploads'),
        filename: function (req, file, cb) {
            // null as first argument means no error
            cb(null, file.originalname)
        },
    })

    let upload = multer({ storage: storage }).single('image')

    upload(req, res, function (err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields

        if (!req.file) {
            return res.send('Please select an image to upload')
        } else if (err instanceof multer.MulterError) {
            return res.send(err)
        } else if (err) {
            return res.send(err)
        }

        Jimp.read(`./assets/uploads/${req.file.originalname}`)
            .then(async (img) => {
                // Duplicate
                await resize(img, 'duplicate', req.file.originalname)

                // Thumbnail
                await resize(img, 'thumbnail', req.file.originalname)

                // Small
                await resize(img, 'small', req.file.originalname)

                // Medium
                await resize(img, 'medium', req.file.originalname)

                // Large
                await resize(img, 'large', req.file.originalname)
            })
            .catch((err) => console.log(err))

        res.send({ success: 1 })
    })
})

app.listen(5000, () => {
    console.log('server up & running !')
})
