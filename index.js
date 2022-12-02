require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const {search,addUrl,searchUrl} = require('./utils')
// Basic Configuration
const port = process.env.PORT || 3000;
const URL = require('url').URL
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const isValidURL  = url =>{
  url = url.trim();
  try {
    let urlObject = new URL(url);
      let protocol  =urlObject.protocol.toString().replace(":","");
     if((protocol!=='https'))
        return false;
    
    return true;
  } catch (error) {
    console.log(error);
    return true
  }

}


// Your first API endpoint
app.post('/api/shortur', function(req, res) {
  let url = req.body.url;
  isValidURL(url);
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
  if(isValidURL(url)!==true){
    result  = { error: 'invalid url' };
  }
  else if(searchResult.availability===true){
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
 try {
   
   if(typeof searchResult!=="undefined"){
    if(isValidURL(searchResult)==true){
      res.redirect(`${searchResult}`);
    }
   }
   console.log("Invalid Url",searchResult);
   throw Error("Invalid Url");
  } catch (error) {
   result= { error: 'invalid url' };
   res.json(result).end();
  
 }
  
})


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
  console.log(`Url : http://localhost:${port}`);
});
