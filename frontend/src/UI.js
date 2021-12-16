const BookService = require('./services/BookService')
const timeago = require('timeago.js')
const bookService = new BookService()

class UI {
    async renderBooks(){
        const books = await bookService.getBooks()
        // console.log(books)
        const booksCardContainer = document.getElementById('booksCard');
        booksCardContainer.innerHTML = '';
        books.forEach((book) => {
            const div = document.createElement('div');
            div.className = 'animated fadeInRight';
            div.innerHTML = `
            <div class="card text-center my-3">
                <div class="card-header">
                    <!-- <img src="${book.imagePath}" class="img-fluid" alt=""> -->
                </div>
                <div class="card-body">
                    <h3>${book.title}</h3>
                    <h3>${book.author}</h3>
                    <a href="#" class="btn btn-danger delete" _id="${book._id}">Delete X</a>
                </div>
                <div class="card-footer">
                    <h4>${timeago.format(book.createdAt)}</h4>
                </div>
            </div>
            `;
            booksCardContainer.appendChild(div);
        });
    }
    async addNewBook(book){
        await bookService.postBook(book)
        this.clearBookForm()
        this.renderBooks()
    }
    async clearBookForm(){
        document.getElementById("formBook").reset()
        document.getElementById('title').focus();
    }
    async deleteBook(bookId){
        await bookService.deleteBook(bookId)
        this.renderBooks()
    }
    renderMessage(message, colorMessage, secondsToRemove) {
        // Creating a div
        const div = document.createElement('div');
        // Styling the div
        div.className = `alert alert-${colorMessage} message`;
        // Adding Text to the div
        div.appendChild(document.createTextNode(message));
        // Puting in the documnet
        const container = document.querySelector('.card-body');
        const bookForm = document.querySelector('#formBook');
        container.insertBefore(div, bookForm);
        // Removing the div after some secconds
        setTimeout(() => {
            document.querySelector('.message').remove();
        }, secondsToRemove);
    }
}

module.exports = UI