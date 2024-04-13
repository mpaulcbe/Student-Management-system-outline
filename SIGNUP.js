const http = require('http');
const fs = require('fs');
const {URLSearchParams} = require('url');

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/DETAILS')
    .then(function(){
        console.log('DB Connect');

    })

const userSchema = new mongoose.Schema({firstnamename:String,lastname:String,email:String});
const model = mongoose.model('STUDENTS',userSchema);



const server = http.createServer(function(req,res){
        if(req.url === '/'){
            res.writeHead('200',{'Content-Type':'text/html'}); 
            fs.createReadStream('sign.html').pipe(res);
        }
        else if(req.url === '/sign' && req.method === 'POST'){
            var rawdata = '';
            req.on('data',function(data){
                rawdata += data;
            })
            req.on('end',function(){
                var formdata = new URLSearchParams(rawdata);
                model.create({name:formdata.get('a'),
                                name:formdata.get('b'),
                                email:formdata.get('c')
                                })
                res.write('Data Saved');
                res.end();
            })
        }

        
})

server.listen('8000',function(){
    console.log('Server started at port http://127.0.0.1:8000')
})