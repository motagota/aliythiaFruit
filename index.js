const express = require('express')

const path = require('path');

const app = express()
const port = 3000

const fs = require('fs'); 

app.use('/public', express.static(path.join(__dirname, 'public')))
app.use('/public/layer', express.static(path.join(__dirname, 'public/layer')))
app.use('/public/res/import/07', express.static(path.join(__dirname, 'public/res/import/07')))
app.use('/public/res/import/0d', express.static(path.join(__dirname, 'public/res/import/0d')))
app.use('/public/res/import/0e', express.static(path.join(__dirname, 'public/res/import/0e')))
app.use('/public/res/import/28', express.static(path.join(__dirname, 'public/res/import/28')))
app.use('/public/res/import/79', express.static(path.join(__dirname, 'public/res/import/79')))
app.use('/public/res/import/07', express.static(path.join(__dirname, 'public/res/import/07')))
app.use('/public/res/import/6f', express.static(path.join(__dirname, 'public/res/import/6f')))
app.use('/public/res/import/ec', express.static(path.join(__dirname, 'public/res/import/ec')))
app.use('/public/res/import/09', express.static(path.join(__dirname, 'public/res/import/09')))
app.use('/public/res/import/00', express.static(path.join(__dirname, 'public/res/import/00')))
app.use('/public/res/import/0c', express.static(path.join(__dirname, 'public/res/import/0c')))
app.use('/public/res/import/02', express.static(path.join(__dirname, 'public/res/import/02')))
app.use('/public/res/import/2d', express.static(path.join(__dirname, 'public/res/import/2d')))
app.use('/public/res/import/03', express.static(path.join(__dirname, 'public/res/import/03')))
app.use('/public/res/import/3e', express.static(path.join(__dirname, 'public/res/import/3e')))
app.use('/public/res/import/3f', express.static(path.join(__dirname, 'public/res/import/3f')))
app.use('/public/res/import/4b', express.static(path.join(__dirname, 'public/res/import/4b')))
app.use('/public/res/import/4e', express.static(path.join(__dirname, 'public/res/import/4e')))
app.use('/public/res/import/5f', express.static(path.join(__dirname, 'public/res/import/5f')))
app.use('/public/res/import/6f', express.static(path.join(__dirname, 'public/res/import/6f')))
app.use('/public/res/import/8c', express.static(path.join(__dirname, 'public/res/import/8c')))
app.use('/public/res/import/8e', express.static(path.join(__dirname, 'public/res/import/8e')))
app.use('/public/res/import/9e', express.static(path.join(__dirname, 'public/res/import/9e')))
app.use('/public/res/import/13', express.static(path.join(__dirname, 'public/res/import/13')))
app.use('/public/res/import/17', express.static(path.join(__dirname, 'public/res/import/17')))
app.use('/public/res/import/18', express.static(path.join(__dirname, 'public/res/import/18')))
app.use('/public/res/import/19', express.static(path.join(__dirname, 'public/res/import/19')))
app.use('/public/res/import/41', express.static(path.join(__dirname, 'public/res/import/41')))
app.use('/public/res/import/44', express.static(path.join(__dirname, 'public/res/import/44')))
app.use('/public/res/import/47', express.static(path.join(__dirname, 'public/res/import/47')))
app.use('/public/res/import/50', express.static(path.join(__dirname, 'public/res/import/50')))
app.use('/public/res/import/53', express.static(path.join(__dirname, 'public/res/import/53')))
app.use('/public/res/import/55', express.static(path.join(__dirname, 'public/res/import/55')))
app.use('/public/res/import/56', express.static(path.join(__dirname, 'public/res/import/56')))
app.use('/public/res/import/64', express.static(path.join(__dirname, 'public/res/import/64')))
app.use('/public/res/import/66', express.static(path.join(__dirname, 'public/res/import/66')))
app.use('/public/res/import/68', express.static(path.join(__dirname, 'public/res/import/68')))
app.use('/public/res/import/69', express.static(path.join(__dirname, 'public/res/import/69')))
app.use('/public/res/import/74', express.static(path.join(__dirname, 'public/res/import/74')))
app.use('/public/res/import/80', express.static(path.join(__dirname, 'public/res/import/80')))
app.use('/public/res/import/84', express.static(path.join(__dirname, 'public/res/import/84')))
app.use('/public/res/import/85', express.static(path.join(__dirname, 'public/res/import/85')))
app.use('/public/res/import/86', express.static(path.join(__dirname, 'public/res/import/86')))
app.use('/public/res/import/95', express.static(path.join(__dirname, 'public/res/import/95')))
app.use('/public/res/import/97', express.static(path.join(__dirname, 'public/res/import/97')))
app.use('/public/res/import/a5', express.static(path.join(__dirname, 'public/res/import/a5')))
app.use('/public/res/import/a7', express.static(path.join(__dirname, 'public/res/import/a7')))
app.use('/public/res/import/a8', express.static(path.join(__dirname, 'public/res/import/a8')))
app.use('/public/res/import/a9', express.static(path.join(__dirname, 'public/res/import/a9')))
app.use('/public/res/import/ae', express.static(path.join(__dirname, 'public/res/import/ae')))
app.use('/public/res/import/ad', express.static(path.join(__dirname, 'public/res/import/ad')))
app.use('/public/res/import/af', express.static(path.join(__dirname, 'public/res/import/af')))
app.use('/public/res/import/b0', express.static(path.join(__dirname, 'public/res/import/b0')))
app.use('/public/res/import/b1', express.static(path.join(__dirname, 'public/res/import/b1')))
app.use('/public/res/import/b3', express.static(path.join(__dirname, 'public/res/import/b3')))
app.use('/public/res/import/b7', express.static(path.join(__dirname, 'public/res/import/b7')))
app.use('/public/res/import/bb', express.static(path.join(__dirname, 'public/res/import/bb')))
app.use('/public/res/import/bc', express.static(path.join(__dirname, 'public/res/import/bc')))
app.use('/public/res/import/bd', express.static(path.join(__dirname, 'public/res/import/bd')))
app.use('/public/res/import/be', express.static(path.join(__dirname, 'public/res/import/be')))
app.use('/public/res/import/c1', express.static(path.join(__dirname, 'public/res/import/c1')))
app.use('/public/res/import/c2', express.static(path.join(__dirname, 'public/res/import/c2')))
app.use('/public/res/import/cc', express.static(path.join(__dirname, 'public/res/import/cc')))
app.use('/public/res/import/d0', express.static(path.join(__dirname, 'public/res/import/d0')))
app.use('/public/res/import/d2', express.static(path.join(__dirname, 'public/res/import/d2')))
app.use('/public/res/import/d3', express.static(path.join(__dirname, 'public/res/import/d3')))
app.use('/public/res/import/d4', express.static(path.join(__dirname, 'public/res/import/d4')))
app.use('/public/res/import/d7', express.static(path.join(__dirname, 'public/res/import/d7')))
app.use('/public/res/import/db', express.static(path.join(__dirname, 'public/res/import/db')))
app.use('/public/res/import/e3', express.static(path.join(__dirname, 'public/res/import/e3')))
app.use('/public/res/import/e4', express.static(path.join(__dirname, 'public/res/import/e4')))
app.use('/public/res/import/e5', express.static(path.join(__dirname, 'public/res/import/e5')))
app.use('/public/res/import/e9', express.static(path.join(__dirname, 'public/res/import/e9')))
app.use('/public/res/import/ea', express.static(path.join(__dirname, 'public/res/import/ea')))
app.use('/public/res/import/eb', express.static(path.join(__dirname, 'public/res/import/eb')))
app.use('/public/res/import/f2', express.static(path.join(__dirname, 'public/res/import/f2')))
app.use('/public/res/import/ff', express.static(path.join(__dirname, 'public/res/import/ff')))
//app.use('/d', express.static(path.join(__dirname, 'public/6d')))
//app.use('/02', express.static(path.join(__dirname, 'public/02')))
//app.use('/14', express.static(path.join(__dirname, 'public/14')))
//app.use('/c0', express.static(path.join(__dirname, 'public/c0')))
//app.use('/0e', express.static(path.join(__dirname, 'public/0e')))
app.get('/', function(request, response){

    const options = {
        root: path.join(__dirname)
    };

    response.sendFile('aliythiaFruitGame1.html',options);
});



  
const score_path = './scores.json';
const config = { ip: '192.0.2.1', port: 3000 };
let scores =[]


app.get('/reset', function(request, response){
    scores =[]
});

app.get('/scores', function(request, response){
  
    scores = JSON.parse(fs.readFileSync("scores.txt", "utf8")); 
    
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(scores));
});

app.post('/scores/:name/:score', function(req, res){
    console.log(req.params)

    scores = JSON.parse(fs.readFileSync("scores.txt", "utf8")); 
    score ={}
    score.name = req.params.name 
    score.score = req.params.score 
    scores.push(score)
    console.log(scores)

    fs.writeFile("scores.txt", JSON.stringify(scores), (err) => { 
        if (err) 
            console.log(err); 
        else { 
            console.log("File written successfully\n"); 
            console.log("The written has the following contents:");             
        } 
    } );

response = {  
    scores: scores,  
    
};  
console.log(response);  
res.end(JSON.stringify(response));  

})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })