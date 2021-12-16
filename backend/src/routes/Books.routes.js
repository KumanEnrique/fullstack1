const {Router} = require('express')
const router = Router()
const Books = require('../models/Book')
const path = require('path')
const fs = require('fs')

router.get('/',async(req,res)=>{
    const books = await Books.find()
    res.json(books)
})
router.post('/',async(req,res)=>{
    const {title,isbn,author} = req.body
    const imagePath = '/uploads/' + req.file.filename
    const newBook = new Books({title,isbn,author,imagePath})
    const book = await newBook.save()
    res.json(book)
})
router.delete('/:id',async(req,res)=>{
    // const books = await Books.
    const {id} = req.params
    const bookDeleted = await Books.findByIdAndDelete(id)
    console.log(path.resolve('./src/public' + bookDeleted.imagePath))
    fs.rmSync(path.resolve('./src/public' + bookDeleted.imagePath))
    // await unlink(path.resolve('./backend/public' + bookDeleted.imagePath))
    res.json("deleted")
})

module.exports = router