const express = require('express');
const fetch = require('node-fetch');
const ejs =require("ejs");
const DiscordOauth2 = require("discord-oauth2");
const oauth = new DiscordOauth2();
const {ConnectRateDB, RateSchema} = require('./db/ConnectRateDB');
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

ConnectRateDB();

app.use(express.static(__dirname + "/public"));

app.set('view engine' , ejs);

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/' , (req,res) => {
    res.sendFile(__dirname + '/main' +'/index.html');
})

app.post('/',async(req,res) => {
  const {name , text , desc ,rec} = req.body;
  console.log(name + " " + text + " " + desc);

  const Review = new RateSchema({
    name,
    text,
    experience:desc,
    rec
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

app.get('/leaderb/:id', async(req,res) => {
  const id = req.params.id;
    fetch("https://gabor500.aosxap.repl.co/")
      .then((resp) => resp.json())
      .then(async(data) => {newdata = await data.filter(ob => ob.guild_id === id); res.render('leaderboard1.ejs' ,{data:newdata})});

})

app.get('/search_guild' , (req,res) => {
  res.render('search_guild.ejs');
})

app.post('/search_guild', (req,res) => {
  const id = req.body.gid;
  console.log(id);
  res.redirect(`/leaderb/${id}`);
})

app.get('/premium' , (req,res)=> {
  res.render('premium.ejs');
})

app.get('/modules' , (req,res) => {
  res.sendFile(__dirname+'/main'+'/trash.html');
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
//1196 lines of code 31 - 12 - 2020 (redesign)
//1329 lines of code 1 - 1- 2021