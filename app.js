const express = require("express");
const expressHandelbars = require("express-handlebars");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const { config } = require("dotenv");
require("dotenv").config();



const app = express();
const port = process.env.PORT || 7000;



// Parsing MiddleWare
app.use(bodyParser.urlencoded({extended:false }));

// Parse Application
app.use(bodyParser.json());
// Static Files
app.use(express.static('public'));


//Templating Engine
app.engine('hbs' , expressHandelbars.engine( {extname : '.hbs'}));
app.set('view engine','hbs');


// MySql Connection pool

const pool = mysql.createPool({
    connectionLimit :100,
    host:process.env.DB_HOST,
    user:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database : process.env.DB_NAME

});


// connect to database

pool.getConnection((err,connection)=>{
    if(err) throw err;
    console.log("Connected " + connection.threadId);
    connection.destroy();
});


const routes = require('./server/routes/user');
app.use('/',routes);


app.listen(port,()=>{
    console.log(`Listining on Port no ${port}`);
})