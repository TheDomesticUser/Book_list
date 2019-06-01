class Book
{
    constructor(title, author, genre, bookYearOfRelease, bookNumberOfPages) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.bookYearOfRelease = bookYearOfRelease;
        this.bookNumberOfPages = bookNumberOfPages;
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

    

    console.log(typeof bookTitle);
}