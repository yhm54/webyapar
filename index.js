import mongodb from "mongodb";
import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// import bodyParser from "body-parser";
// import indexPage from "./index.ejs";
const app = express();




app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname, 'public'));

app.set('view engine', 'ejs');
// app.set('view engine', 'ejs');

const uri = "mongodb://localhost:27017";




const client = new mongodb.MongoClient(uri);


const port = 3001;





app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/adminlog", (req, res) => {
    // document.getElementById("log-reg").action = "/adminlogin";
    res.render("admin_login.ejs",);
});
app.get("/userlog", (req, res) => {
    // document.getElementById("log-reg").action = "/adminlogin";
    res.render("user_login.ejs",);
});

app.post("/userlog", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const database = client.db('webyapar');
    const cred = database.collection('auth');

    // Query for a movie that has the title 'Back to the Future'
    const query = { username: username, password: password };
    cred.insertOne(query);
    // const movie = await movies.insertOne(query);
    await cred.findOne(query) == null ? res.render("user_login.ejs", { repeat: true }) : res.render("user_details.ejs", { userdata: { username: username }, repeat: true });

    // res.render("user_details.ejs");

});



app.get("/reg", (req, res) => {
    res.render("register.ejs", {
        uploadImg: () => {
            // console.log('hi');
            var file = document.querySelector("#imgButton").get(0).files;
            var reader = new FileReader();
            reader.readAsDataURL(file[0]);
            reader.addEventListener("load", function (e) {
                var image = e.target.result;
                document.querySelector("#imgthumbnail").attr('src', image);
            });
        }
    });
})



app.post("/adminlog", async (req, res) => {
    // console.log('hi2');
    // var alreadyExists = false;
    const username = req.body.username;
    const password = req.body.password;
    console.log(req.body);


    // res.render("index.ejs", {
    //     request: req.body.username
    // });
    // res.render("index.ejs", {userna: req.body.username});
    try {


        const database = client.db('webyapar');
        const movies = database.collection('auth');
        // Query for a movie that has the title 'Back to the Future'
        const query = { username: username, password: password };
        console.log(movies);

        // const movie = await movies.insertOne(query);
        await movies.findOne(query) == null ? () => { movies.insertOne({
            username: "hi", password: "yash"
        });res.render("admin_edit.ejs", { users: [movies[0]], repeat: true }); } : res.render("admin_home.ejs",);

        // console.log(movies.findOne);
    } finally {

        // Ensures that the client will close when you finish/error

        // await client.close();
        // res.render("home.ejs", alreadyExists ? { login: true } : { cred: req.body })
    }
})
// Replace the uri string with your connection string.


app.listen(port, () => console.log('hi'));



