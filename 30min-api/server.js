const express = require('express');
const morgan = require('morgan');
const router = require('./routes/api');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path')


const PORT = process.env.PORT || 8080;
const app = express();


app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))



app.use(morgan('tiny'));
app.use(cors());
app.use('/gym', router);

if (process.env.NODE_ENV === 'production') {
    //app.use(express.static('client/build'))
   }
   
app.listen(PORT, console.log(`30min server runig on PORT${PORT} `));

