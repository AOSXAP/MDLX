const express = require('express');
const fetch = require('node-fetch');
const btoa = require('btoa');
const ejs =require("ejs");
const DiscordOauth2 = require("discord-oauth2");
const oauth = new DiscordOauth2();
const {ConnectRateDB, RateSchema} = require('./db/ConnectRateDB');
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));

app.set('view engine' , ejs);

ConnectRateDB();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/' , (req,res) => {
    res.sendFile(__dirname + '/main' +'/index.html');
})

app.post('/',async(req,res) => {
  const {name , text , desc} = req.body;
  console.log(name + " " + text + " " + desc);

  const Review = new RateSchema({
    name,
    text,
    experience:desc
  })

  await Review.save();

  res.redirect('/');
})

app.get('/leaderboard', (req,res)=>{
  fetch("https://serverapi.aosxap.repl.co")
    .then((resp) => resp.json())
    .then((data) => res.render("leaderboard2.ejs" , {data:data.data}));

})

app.get('/redirect', (req,res) => {
  res.render('redirect.ejs');
})



let CLIENT_ID= process.env.CLIENT_ID ; 

const CLIENT_SECRET = process.env.CLIENT_SECRET ; 

const PUBLICKEY = process.env.PUBLICKEY;

let redirect = process.env.redirect ; 


app.get("/auth/redirect", async(req, res) => {
  const userdata = [];
  if (!req.query.code) {
    res.render('404.ejs')
  }
  const code = req.query.code;

  await oauth
    .tokenRequest({
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,

      code: code,
      grantType: "authorization_code",

      redirectUri: redirect,
    })
    .then(async(data) => {
      await oauth.getUserConnections(data.access_token)
        .then(async(data1) => {
          await userdata.push(data1);
        });

      await oauth.getUser(data.access_token)
        .then(async(data2) => {
          await userdata.push(data2)
        });

      await oauth.getUserGuilds(data.access_token)
        .then(async(data3) => {
         await userdata.push(data3);
        });

    });

    res.render('redirect.ejs' , {data:userdata})
});


const Stripe = require('stripe')('sk_test_51I44QAFzKbwZM6CUu8y4uoyUHm0dFRZaE3MRMGaDTqZ3Q5ntl2a5y5x4t5VOmhJNAZLMHQd9Jlpf9P8ZludVsDra003iRw9gDB');

app.get('/payxd' , (req,res) => {
  res.render("pay.ejs", {
    key:
      "pk_test_51I44QAFzKbwZM6CURrNiBa2zxG76Rqh9wgcQ98M3qcDfgn6f51DDIrHEGmzCxFjjN78eMHvGZ9WZ3gKLtFg4Fb4600enE52NQi",
  });
})

app.post('/payment' , (req,res) => {
    Stripe.customers
      .create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
      })
      .then((customer) => {
        return Stripe.charges.create({
          amount: 2500,
          description: "Product",
          currency: "EUR",
          customer: customer.id,
        });
      })
      .then((charge) => {
        res.send("Success"); 
      })
      .catch((err) => {
        res.send(err); 
      }); 
})


app.use('/', (req,res) => {
  res.render('404.ejs');
})

app.listen(port, (err) => {
  if (!err) {
    console.log(`Server Started at ${process.env.PORT}`);
  }
});

//934 lines of code 29 - 12 - 2020

//1189 lines of code 30 - 12 - 2020