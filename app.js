class Book
{
    constructor(title, author, ISBN) {
        this.title = title;
        this.author = author;
        this.ISBN = ISBN;
    }
}

class UI
{
    static addBookToTable(book) {
        // Get the book list table
        const bookListTable = document.getElementById('bookListTable');
        
        // Create a book table body
        const bookBody = document.createElement('tbody');
        
        // Set the inner HTML of the book body to the book information
        bookBody.innerHTML = `
        <td id="bookTitle">${book.title}</td>
        <td id="bookAuthor">${book.author}</td>
        <td id="bookISBN">${book.ISBN}</td>
        <td><a href="#" class="delete">X</a></td>`;

        // Navigate to the book body delete attribute, and store it in a variable
        const deleteAttribute = bookBody.firstElementChild.lastElementChild.firstElementChild;

        // Add an event listener for the delete attribute
        deleteAttribute.addEventListener('click', UI.removeBookFromTable);

        // Append the book to the book list table
        bookListTable.appendChild(bookBody);
    }
    static removeBookFromTable(attribute) {
        // Get the table book body
        const tableBookBody = attribute.target.parentElement.parentElement;

        // Get the ISBN
        const bookISBN = tableBookBody.lastElementChild.previousElementSibling.innerText;

        // Remove the book from the local storage
        LocalStorage.removeBookFromStorage(bookISBN);

        // Remove the table body 
        tableBookBody.remove();

        attribute.preventDefault();
    }

    static inputClearAll() {
        // Get all of the text and number inputs
        const textInputs = document.querySelectorAll('input.bookInput');

        // Iterate through them, setting their values to null
        textInputs.forEach(function(input){
            input.value = null;
        });
    }

    static errorOrSuccess(message, className) {
        // Get the book form for appendation
        const bookForm = document.getElementById('bookForm');

        // Create the text paragraph containing message and class name
        const messageParagraph = document.createElement('p');
        messageParagraph.className = className;
        messageParagraph.appendChild(document.createTextNode(message));

        // Insert the message paragraph before the book form
        bookForm.insertBefore(messageParagraph, bookForm.firstElementChild);
        
        // Set a 3 second timeout for the error or success paragraph
        setTimeout(function(){
            messageParagraph.remove();
        }, 3000);
    }
}

class LocalStorage
{
    static loadAllBooksFromStorage() {
        // Get the book array in the local storage
        const bookArray = JSON.parse(localStorage.getItem('books'));

        if (bookArray) {
            /* Iterate through the book array, appending
            each book to the book table */
            bookArray.forEach(function(book){
                UI.addBookToTable(book);
            })
        }
    }

    static addBookToStorage(book) {
        // Get the book array in the local storage. If it doesn't exist, make an empty array
        const bookArray = !localStorage.getItem('books') ? [] : JSON.parse(localStorage.getItem('books'));
        
        // Add the book to the book array
        bookArray.push(book);

        // Add the book array to the local storage
        localStorage.setItem('books', JSON.stringify(bookArray));
    }

    static removeBookFromStorage(ISBN) {
        // Get the book array from the local storage
        const bookArray = JSON.parse(localStorage.getItem('books'));

        bookArray.forEach(function(book, index) {
            if (book.ISBN === ISBN) {
                bookArray.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(bookArray));
    }
}

// Add an event listener for when the dom loads
document.addEventListener('DOMContentLoaded', loadContent);

// Functions for event listeners
function loadContent()
{
    // Get the add book submit button
    const addBookButton = document.querySelector('div.container form input#addBookButton');

    // Load all of the books from the storage
    LocalStorage.loadAllBooksFromStorage();

    // Add an event listener for the add book button when it is clicked
    addBookButton.addEventListener('click', addBook);
}

function addBook(e)
{
    // Get the book information
    const bookTitle = document.querySelector('div.container form input#titleInput').value;
    const bookAuthor = document.querySelector('div.container form input#authorInput').value;
    const bookISBN = document.querySelector('div.container form input#isbnInput').value;

    // Verify each book data has a value
    if (!bookTitle) {
        UI.errorOrSuccess('Please input the book title.', 'fail');
    } else if (!bookAuthor) {
        UI.errorOrSuccess('Please input the book author.', 'fail');
    } else if (!bookISBN) {
        UI.errorOrSuccess('Please input the book ISBN.', 'fail');
    } else {
        // Create a book object
        inputtedBook = new Book(bookTitle, bookAuthor, bookISBN);
        // Add the book to the book list table
        UI.addBookToTable(inputtedBook);

        // Add the book to the local storage
        LocalStorage.addBookToStorage(inputtedBook);

        // Clear all of the text and number inputs
        UI.inputClearAll();

        // Add a success bar
        UI.errorOrSuccess('Book was successfully added!', 'success');
    }

    e.preventDefault();
}
