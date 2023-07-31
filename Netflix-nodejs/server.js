const http=require("http")
const fs=require("fs")
const {parse}=require("querystring")

http.createServer((req,res)=>{
    if(req.method==="POST"){
        if(req.headers["content-type"]==="application/x-www-form-urlencoded"){
               let body=""
               req.on("data",(chunk)=>{
                body+=chunk;
               })
               req.on("end",()=>{
                let result=parse(body).email
                console.log(result); //also get the data in terminal
                res.end(result)
               })
        }
        else{
            res.end(null)
        }
    }
    else{
        if(req.url==="/" || req.url==="/home"){
            let html=fs.createReadStream("./Netflix.html","utf-8")
            html.pipe(res)
        }
        else if(req.url==="/style"){
        let css=fs.createReadStream("./Netflix.css","utf-8")
        css.pipe(res)
        }
        else if(req.url==="/image"){
            let image=fs.createReadStream
            ("http://localhost:5000/image")
            image.pipe(res)
        }
        else{
            res.end("page not found")
        }
    }
}).listen(5000,(err)=>{
    if(err)console.log(err);
    console.log("server running on port 5000");
})