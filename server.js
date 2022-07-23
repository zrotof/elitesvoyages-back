const {port} = require('./config/dotEnvConfig.js');
const express = require('express');
const morgan = require('morgan')
const cors = require("./cors");

const app = express();
app.use(morgan('combined'));

const bodyParser = require('body-parser')


app.use(bodyParser.json());

app.get('/', (req,res)=>{ 
        res.send("Le monde chico et tout ce qu'il ya dedans");
});

//calling to the mail route
app.use('/mail', cors.corsWithOptions, require('./routes/mail/mailRoutes'));
  
//calling to the tour route
app.use('/tourisme', cors.corsWithOptions, require('./routes/tourism/tourRoutes'));


app.listen(port, '0.0.0.0', ()=>console.log(`Listening on port : ${port} ...`));

