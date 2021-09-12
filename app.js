/**
 * express app
 */

const express = require('express');
const path = require('path');
const StorageCenter = require('./storageCenter/StorageCenter');


const app = express();
const PORT = process.env.PORT ||8080;
const title = "RAID5 simulator";

app.use('/static', express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');


app.get("/", (req, res)=>{
    
    let numberOfDisks = req.query.col;
    let numberOfBlocks = req.query.row;
    
    if(numberOfDisks && numberOfBlocks){
        let storageCenter = new StorageCenter(numberOfDisks, numberOfBlocks);
        let structure = storageCenter.buildStorageCenterStructure();
        storageCenter = null;
        res.render('index', {title: title, structure: structure, numberOfBlocks: numberOfBlocks});
    }
    else{
        res.render('index', {title: title});
    }
});

app.listen(PORT, ()=>{
    console.log(`App is listening at port : ${PORT}`);
})