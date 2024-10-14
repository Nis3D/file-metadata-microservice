const express= require('express');
const cors= require('cors');
const multer= require('multer');
const path= require ('path');
const app= express();

const port= process.env.Port||3000;

//Enable CORS
app.use(cors());

//serve static files uploads
app.use(express.static('public'));

//Set up multer for file upload
const upload= multer({dest:'upload'});

//Post route for file upload
app.post('api/fileanalyse', upload.single('upfile'), (req,res) => {
    const file = req.file;

    if(!file) {
        return res.status(400).json({error: 'No file uploaded'});
    }

//extract the file metadata
const fileInformation={
    name: file.originalname,
    type: file.mimetype,
    size: file.size
};

//return file metadata as JSON response
res.json(fileInformation);
});

//Start the server
app.listen('port',(req, res) => {
    console.log(`Server is running at ${port}`);
})