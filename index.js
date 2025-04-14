const express = require('express');
const app = express();
const userRoutes = require('../testrepo1/user/user.routes.js')
app.use(express.json());
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/newDb')
.then(()=> console.log('mongodb connected'))
.catch( (err) => console.log('error generated',err));  

app.use('/api',userRoutes);


app.listen(3333,()=>{
    console.log('server is running on port 3333')
})      