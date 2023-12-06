

export const addBook = (book) => ({
    type: 'ADD_BOOK',
    payload: book,
});

export const deleteBook = (bookId) => ({
    type: 'DELETE_BOOK',
    payload: bookId,
});

export const updateBook = (updatedBook) => ({
    type: 'UPDATE_BOOK',
    payload: updatedBook,
});
