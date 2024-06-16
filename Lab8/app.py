# Import necessary dependencies
from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)



# Sample list of books (you can replace it with your own data or use a database)
books = [
    {"id": 1, "title": "To Kill a Mockingbird", "author": "Harper Lee", "genre": "Fiction"},
    {"id": 2, "title": "1984", "author": "George Orwell", "genre": "Science Fiction"},
    {"id": 3, "title": "Pride and Prejudice", "author": "Jane Austen", "genre": "Classic"},
    {"id": 4, "title": "The Great Gatsby", "author": "F. Scott Fitzgerald", "genre": "Classic"},
    {"id": 5, "title": "The Catcher in the Rye", "author": "J.D. Salinger", "genre": "Fiction"},
    {"id": 6, "title": "To the Lighthouse", "author": "Virginia Woolf", "genre": "Classic"},
    {"id": 7, "title": "The Hobbit", "author": "J.R.R. Tolkien", "genre": "Fantasy"},
    {"id": 8, "title": "Brave New World", "author": "Aldous Huxley", "genre": "Science Fiction"},
    {"id": 9, "title": "Moby-Dick", "author": "Herman Melville", "genre": "Classic"},
    {"id": 10, "title": "The Lord of the Rings", "author": "J.R.R. Tolkien", "genre": "Fantasy"}
]

maxid = len(books)

# Route for the homepage
@app.route('/')
def index():
    return render_template('index.html', books=books)

# Route for adding a book
@app.route('/Books/Add', methods=['GET', 'POST'])
def add_book():
    if request.method == 'POST':
        title = request.form.get('title')
        author = request.form.get('author')
        genre = request.form.get('genre')
        global maxid
        maxid=maxid+1
        books.append({"id": maxid, "title": title, "author": author, 'genre' : genre})
        return redirect(url_for('index'))
    return render_template('add_book.html')

# Route for editing a book
@app.route('/Books/Edit/<int:book_id>', methods=['GET', 'POST'])
def edit_book(book_id):
    book = next((book for book in books if book['id'] == book_id), None)
    if not book:
        return redirect(url_for('index'))

    if request.method == 'POST':
        title = request.form.get('title')
        author = request.form.get('author')
        genre = request.form.get('genre')
        book['title'] = title
        book['author'] = author
        book['genre'] = genre
        return redirect(url_for('index'))

    return render_template('edit_book.html', book=book)

# Route for deleting a book
@app.route('/Books/Delete/<int:book_id>')
def delete_book(book_id):
    book = next((book for book in books if book['id'] == book_id), None)
    if book:
        books.remove(book)
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)