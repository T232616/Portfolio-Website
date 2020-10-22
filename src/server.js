const express = require("express");
const path = require("path");
const hbs = require("hbs");
var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  service:"gmail",
  auth:{
    user:"tajhamnani_b18@ce.vjti.ac.in",
    pass:"JAIGURUDEV"
  }
})
const port = process.env.PORT || 3000;
app = express();
app.use(express.urlencoded({extended:true}));
const staticPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");
app.use(express.static(staticPath));
app.set("views", viewPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialPath);
app.get("/", (req, res) => {
  res.status(200).render("home", { title: "Home Page" });
});
app.get("/about", (req, res) => {
  res.status(200).render("about", { title: "About Page" });
});
app.get("/projects", (req, res) => {
  res.status(200).render("projects", { title: "Projects"});
})
app.get("/skills", (req, res) => {
  res.status(200).render("skills", { title:"Skills"})
})
app.get("/contact", (req, res) => {
  res.status(200).render("contact", { title: "Contact Page" });
});
app.post("/contact",(req,res)=>{
  var mailOptions1 = {
    from:"tajhamnani_b18@ce.vjti.ac.in",
    to:`${req.body.email}`,
    subject:"Thanks for Submitting Your Form",
    text : `Hi ${req.body.username}  your response has been recieved .Thanks for filling the form 🙂`
  }
  var mailOptions2 = {
    from:"tajhamnani_b18@ce.vjti.ac.in",
    to:`tajhamnani_b18@ce.vjti.ac.in`,
    subject:"SomeOne submitted Your Form",
    text : `${req.body.username} filled your website form .Email is ${req.body.email} and number is ${req.body.phone} and message is ${req.body.msg}`
  }
  transporter.sendMail(mailOptions1,function(err,info){
    if(err){
      console.log(err);
    }
    else{
      console.log("Email Sent "+info.response );
    }
  })
  transporter.sendMail(mailOptions2,function(err,info){
    if(err){
      console.log(err);
    }
    else{
      console.log("Email Sent "+info.response );
    }
  })
console.log(req.body);
res.status(200).render("submit", { title: "Thank You" ,name:req.body.username});
})
app.get("*", (req, res) => {
  res.status(404).render("404", { title: "Page Not Found" });
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
