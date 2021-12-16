const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
    // useFindAndModify: false
})
    .then(db =>console.log('db is connected'))
    .catch(err =>console.log(err))

// console.log(process.env.MONGODB_URI)