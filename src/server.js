const express = require("express");
const path = require("path");
const hbs = require("hbs");
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
console.log(req.body);
res.status(200).render("submit", { title: "Thank You" ,name:req.body.username});
})
app.get("*", (req, res) => {
  res.status(404).render("404", { title: "Page Not Found" });
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
