const Urls  =   require('./Urls.json');
const fs    =   require('fs');



const search    = url =>{
    url=url.trim();
    if(Urls.hasOwnProperty(url)){
        console.log(Urls[url]);
        return {
                availability    :   true,
                original_url    :   url,
                short_url       :   Urls[url]
            };
    }else{
        return {
            availability    :   false,
        };
    }
}


const searchUrl = url=>{
    url =   Number(url);
    let shortUrls      =    Object.keys(Urls);
    let originalUrl    =    shortUrls.find(key => Urls[key] === url);
    console.log(`url is ${originalUrl}`);
    
    return originalUrl;

}


const addUrl   =  url =>{
    url=url.trim();
    let length  =   Object.keys(Urls).length;
    Urls[url]    =   length+1;
    let urlObject   =   JSON.stringify(Urls);
    try {
        fs.writeFile("./Urls.json",urlObject,(err)=>{
            if(err){
                throw Error("Error While Writting to File")
            }
        })
    } catch (error) {
        console.log("Error While Writting to File");
        console.log(error);
    }
    return  length+1
}


module.exports  =   {addUrl,search,searchUrl};

