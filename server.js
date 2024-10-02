const  express = require ('express')
const app = express()
const mysql = require('mysql2')
const dotenv = require('dotenv') 
const cors = require('cors')

app.use(express.json());
app.use(cors());
dotenv.config();


const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});


db.connect((err)=>{
  if (err) {
    return console.log('Error Connecting To The Mysql Database')
  } else {
    console.log("Connected To Mysql successfully as id: ", db.threadId)
  }
  app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
  });

  console.log("Sending message to the server")

  
});

app.get('/', (req,res)=>{
    res.send('Server Started Successfully')
  })

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('views',__dirname + '/views')

// question 1
app.get('/data', (req, res) => {
  // Retrieve data from database
  db.query('SELECT * FROM patients', (err, results) => {
    if (err) {
      console.error(err)
      res.status(500).send('Error Retrieving data')
    } else {
      //Display the records to the browser
      res.render('data', { results: results })
    }
  })
})
  
// question 2
app.get('/provider', (req,res)=>{
  db.query('SELECT * FROM providers',(err,results)=>{
    if (err) {
      console.log('Error Fetching Data')
      res.status(500).send("Error Retrieving Data")
    } else {
      res.render('provider',{results:results})
    }
  })
})

// question 3
app.get('/patients',(req,res)=>{
  db.query('SELECT first_name FROM patients',(err,results)=>{
    if (err) {
      console.log("Error Fetching Data")
      res.status(500).send("Error Retrieving Data")
    }
     else {
      res.render('patients',{results: results})
     }
  })
})


//question 4
app.get('/specialty',(req,res)=>{
  db.query('SELECT provider_specialty from providers',(err,results)=>{
    if (err) {
      console.log('Error Fetching Data')
      res.status(500).send('Error Retrieving Data')
    } else {
      res.render('specialty', { results: results })
    }
  })
})