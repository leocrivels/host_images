var express = require('express');
const fs = require('fs');
const parser = require('body-parser')
//const cors = require("cors");
var app = express();
//app.use(cors());
const dir = './photos';

app.use(express.static(dir));

app.use(parser.json({limit: '10mb'}));

app.use(parser.urlencoded({limit: '10mb', extended: true}));

app.get('/files', function (req, res) {
    console.log(req.query.date)
    var files = [];

    try {
        fs.readdirSync(dir+'/2022-'+req.query.date+'/'+req.query.block).forEach(file => {
            if(!file.includes('._'))
            files.push(file);
        });
    } catch (error) {
        console.log('no-data',req.query.date,req.query.block)
    }
    res.header("Access-Control-Allow-Origin", "*");
    res.send(files);
})

//Serves all the request which includes /images in the url from Images folder
app.use('/images', express.static(dir));
const port = 5001
console.log(`serving on ${port}...`)
/*var server =*/ app.listen(port);