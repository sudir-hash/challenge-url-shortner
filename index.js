require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const {search,addUrl,searchUrl} = require('./utils')
// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});


app.post('/api/shorturl',(req,res)=>{
  let url = req.body.url;
  console.log(`Url : ${url}`);
  let result= {
    original_url : url
  };

  let searchResult  = search(url);
  console.log("Search Result",searchResult);
  if(searchResult.availability===true){
    let short_url = searchResult.short_url;
    result  = {
      ...result,
      short_url     : short_url
    };
  }else{
    let short_url = addUrl(url);
    result  = {
      original_url  :url,
      short_url     : short_url
    };
  }


  res.json(result);
})

app.get('/api/shorturl/:short_url',(req,res)=>{
  let short_url = req.params.short_url;
  short_url     = Number(short_url);
  let searchResult  = searchUrl(short_url)
  console.log(typeof searchResult);
  if(typeof searchResult!=="undefined")res.redirect(`${searchResult}`);
  
  console.log("Invalid Url",searchResult);
  result= { error: 'invalid url' };
  
  
  res.json(result).end();
  
})


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
  console.log(`Url : http://localhost:${port}`);
});
