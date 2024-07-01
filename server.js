const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const File = require('./models/File');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(bodyParser.json());
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/teacherPortal', { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/upload', upload.single('file'), async (req, res) => {
    const newFile = new File({ filename: req.file.filename, originalname: req.file.originalname });
    await newFile.save();
    res.redirect('/upload.html');
});

app.get('/files', async (req, res) => {
    const files = await File.find();
    res.json(files);
});

app.get('/download/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.params.filename);
    res.download(filePath);
});

app.listen(3000, () => {
    console.log('الخادم يعمل على المنفذ 3000');
});
