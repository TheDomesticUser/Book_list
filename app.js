class Book
{
    constructor(title, author, genre, bookYearOfRelease, bookNumberOfPages) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.bookYearOfRelease = bookYearOfRelease;
        this.bookNumberOfPages = bookNumberOfPages;
    }
    
    storeBookInLocalStorage() {
        // Store the book object into the local storage
        addItemToLocalStorageArray('Books', this);
    }
}

// Get the button for adding the book in the book list
const addBookButton = document.getElementById('addBookButton');

// Add an event listener for the add book button
addBookButton.addEventListener('click', addBookToList);

function addBookToList(e)
{
    // Get the book information inputs
    const bookTitle = document.querySelector('form input[id=bookTitle]').value;
    const bookAuthor = document.querySelector('form input[id=bookAuthor]').value;
    const bookGenre = document.querySelector('form input[id=bookGenre]').value;
    const bookYearOfRelease = document.querySelector('form input[id=bookYearRelease]').value;
    const bookNumberOfPages = document.querySelector('form input[id=bookNumberOfPages').value;

    // Verify each input has a value
    if (!bookTitle) {
        alert('Please input the book title.');
    } else if (!bookAuthor) {
        alert('Please input the book author.');
    } else if (!bookGenre) {
        alert('Please input the book genre.');
    } else if (!bookYearOfRelease) {
        alert('Please input the book year of release.');
    } else if (!bookNumberOfPages) {
        alert('Please input the number of pages.');
    } else {
        // Make a book object
        book = new Book(bookTitle, bookAuthor, bookGenre, bookYearOfRelease, bookNumberOfPages);
        
        // Store the book into the local storage
        book.storeBookInLocalStorage();

        window.alert('Book successfully added!');

        location.reload();
    }
}

function addItemToLocalStorageArray(key, item)
{
    // Set the variable to the array in the local storage through the key
    let arrayItem = !localStorage.getItem(key) ? [] : JSON.parse(localStorage.getItem(key));

    arrayItem.push(item);
    localStorage.setItem(key, JSON.stringify(arrayItem));
}