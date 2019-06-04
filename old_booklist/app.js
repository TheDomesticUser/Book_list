class Book
{
    constructor(title, author, genre, bookYearOfRelease, bookNumberOfPages) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.bookYearOfRelease = bookYearOfRelease;
        this.bookNumberOfPages = bookNumberOfPages;
    } 
    
    // Store the book object into the local storage
    storeBookInLocalStorage(key, book) {
        // Set the variable to the array in the local storage through the key
        let arrayItem = !localStorage.getItem(key) ? [] : JSON.parse(localStorage.getItem(key));

        console.log(arrayItem);
        arrayItem.push(book);
        localStorage.setItem(key, JSON.stringify(arrayItem));    
    }

    
    appendBookToTable(tableBody) {
        // Create the unordered book list to be appended
        const bookList = document.createElement('tr');

        bookList.innerHTML = `
          <td>${this.title}</td>
          <td>${this.author}</td>
          <td>${this.genre}</td>
          <td><a href="#" class="delete">X</a></td>
          `;
          // Append the book list to the table
        tableBody.appendChild(bookList);
    }
    
    static removeBook(e) {
        // Get the elements target parent parent
        const tableRow = e.target.parentElement.parentElement;
        // Remove the table row
        tableRow.remove();

        console.log(e.target);
        
        // Remove the object from the local storage
        const localStorageBooks = JSON.parse(localStorage.getItem('books'));
        
        for (let iter = 0; iter < localStorageBooks.length; iter++) {
            if (localStorageBooks[iter] === this) {
                console.log(this);
            }
        }

        
        e.preventDefault();
    }

}

if (localStorage.getItem('books')) {
    // Get the table body list for appendation
    const tableBodyList = document.querySelector('table tbody#book-list');
    
    // Get the book list array from the local storage
    bookLocalStorageArray = JSON.parse(localStorage.getItem('books'));

    // Append the book elements to the unordered book list
    bookLocalStorageArray.forEach(function(book){
        // Get the table body
        const tableBookListBody = document.querySelector('tbody#book-list');

        // Create the book object for storing
        const bookObject = new Book(book.title, book.author, book.genre, book.bookYearOfRelease, book.bookNumberOfPages);

        bookObject.appendBookToTable(tableBookListBody);
    });
}

// Get the button for adding the book in the book list
const addBookButton = document.getElementById('addBookButton');
// Get the delete mark attribute
const deleteAttribute = document.querySelectorAll('tbody#book-list tr td a[class=delete]');

// Add an event listener for the add book button
addBookButton.addEventListener('click', addBookToList);

// Iterate through the delete attributes
deleteAttribute.forEach(function(deleteItem){
    console.log(deleteItem);
    // Add an event listener for each delete item
    deleteItem.addEventListener('click', Book.removeBook);
});


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
        showAlert('Please input the book title', 'error');
    } else if (!bookAuthor) {
        showAlert('Please input the book author', 'error');
    } else if (!bookGenre) {
        showAlert('Please input the book genre', 'error');
    } else if (!bookYearOfRelease) {
        showAlert('Please input the book year of release', 'error');
    } else if (!bookNumberOfPages) {
        showAlert('Please input the number of pages', 'error');
    } else {
        // Make a book object
        book = new Book(bookTitle, bookAuthor, bookGenre, bookYearOfRelease, bookNumberOfPages);

        // Store the book into the local storage
        book.storeBookInLocalStorage('books', book);

        // Get the table book body for appendation
        const tableBookBody = document.querySelector('tbody#book-list');

        // Append the book to the table body
        book.appendBookToTable(tableBookBody);

        showAlert('The book was successfully added!', 'success');

        // Clear the input fields
        clearFields();
    }

    e.preventDefault();
}

function clearFields()
{
    const bookInputs = document.querySelectorAll('.container form input[type=text]');

    bookInputs.forEach(function(input){
        input.value = null;
    });
}

function showAlert(message, className)
{
    // Create div
    const div = document.createElement('div');

    // Add classes
    div.className = `alert ${className}`;
    
    // Add text
    div.appendChild(document.createTextNode(message));

    // Get parent
    const container = document.querySelector('div.container');
    // Get the books header
    const booksHeader = document.querySelector('h2#booksHeader');

    // Insert alert
    container.insertBefore(div, booksHeader);

    // Timeout after 3 seconds
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000);
}