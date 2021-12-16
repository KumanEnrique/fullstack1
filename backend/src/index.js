// if(process.env.NODE_ENV !== 'production'){
//     require('dotenv').config()
// }

require('dotenv').config()
const path = require('path')
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const multer = require('multer')
const IndexRoutes = require('./routes/index.routes')
const BooksRoutes = require('./routes/Books.routes')
require('./database')

//settings
app.set('port',process.env.PORT || 3000)
//static files
app.use(express.static(path.join(__dirname,'public/build')))
//middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())
const storage = multer.diskStorage({
    destination:path.join(__dirname,'public/uploads'),
    filename(req,file,cb){
        cb(null,new Date().getTime()+path.extname(file.originalname))
    }
})
app.use(multer({storage}).single('image'))
//routes
app.use('/api',BooksRoutes)
//starting server
app.listen(app.get('port'),()=>{
    console.log(`server on http://localhost:${app.get('port')}`)
})

