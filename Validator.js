const dnsLookup =   require("dns-lookup");



let result  =   dnsLookup("https://www.google.com",(error,address,family)=>{
   try {
    if(error)
    {
      throw error;
    }
     return true;    
   } catch (error) {
    return false
   }
    
})
console.log(typeof result);
console.log("helo");