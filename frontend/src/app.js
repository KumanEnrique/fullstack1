import './styles/style.css'
// const BookService = require('./services/BookService')
const UI = require('./UI')
const form = document.getElementById("formBook")

document.addEventListener("DOMContentLoaded",()=>{
    const ui = new UI()
    ui.renderBooks()
})
form.addEventListener("submit",(e)=>{
    e.preventDefault()
    const title = document.getElementById("title")
    const author = document.getElementById("author")
    const isbn = document.getElementById("isbn")
    const image = document.getElementById("image")
    const formData = new FormData()
    formData.append('title',title.value)
    formData.append('author',author.value)
    formData.append('isbn',isbn.value)
    formData.append('image',image.files[0])

    // const bookService = new BookService()
    const ui = new UI()
    ui.addNewBook(formData)
    ui.renderMessage('New Book Added Successfully', 'success', 2000);
})
document.getElementById("booksCard").addEventListener("click",e=>{
    e.preventDefault()
    if(e.target.classList.contains("delete")){
        const ui = new UI ()
        ui.deleteBook(e.target.getAttribute("_id"))
        ui.renderMessage('Book Deleted Successfully', 'info', 3000);
    }
})
