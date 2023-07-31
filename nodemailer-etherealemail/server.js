const http=require("http")
const fs=require("fs")
const{parse}=require("querystring")
// const { text } = require("stream/consumers")
const nodemailer = require("nodemailer")

http.createServer((req,res)=>{
    if(req.method==="POST"){
        if(req.headers["content-type"]==="application/x-www-form-urlencoded"){
               let body=""
               req.on("data",(chunk)=>{
                body+=chunk;
               })
               req.on("end",()=>{
                let resultEmail = parse(body).email

                let transporter = nodemailer.createTransport({
                    host: "smtp.ethereal.email",
                    port: 587,
                    secure: false,
                    auth: {
                        user: "	norval.dicki12@ethereal.email",
                        pass: "R2Sur234aUFSU6tdPE",
                    },
                })
                let options = {
                    from: "norval.dicki12@ethereal.email",
                    to: resultEmail,
                    subject: "Subscription to netflix",
                    text: "plans for netflix",
                    html : "<b>Hello NETFLIX</b>"
                }
                transporter.sendMail(options)
                res.end("mail sent successfully")

                // console.log(body);
                // res.end(body)
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