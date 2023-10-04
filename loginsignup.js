const http = require("http");
const fs = require("fs");
const express = require("express");
const app = express();

const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.get("/", (req, res) => {
  fs.readFile("Signup.html", (err, data) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);

    res.end();
  });
});

app.post("/signup", (req, res) => {
  fs.readFile("password.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }

    try {
  
      const jsonObject = JSON.parse(data);

  
      const name = jsonObject.name;

      console.log("Name:", name);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  });

  fs.readFile("Home.html", (err, data) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);

    res.end();
  });
});

app.post("/Signup", (req, res) => {


  fs.readFile("Signup.html", (err, data) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);

    res.end();
  });
});

app.post("/sucess", async (req, res) => {
  const password = await  req.body.password;
  const Cpassword =  await req.body.Cpassword;


  const myObject = {
    name: req.body.username,
    password: password,
    Cpassword: Cpassword,
  };



  if(password == Cpassword){


    const jsonString = JSON.stringify(myObject);

    await fs.appendFile("password.json", jsonString, (err) => {});

    fs.readFile("Home.html", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);

      res.end();
    })






  }else{
    res.send("password and conform password is not mathched")
  }


 
});

app.listen(80, () => {
  console.log("Listinig to port 80");
});
