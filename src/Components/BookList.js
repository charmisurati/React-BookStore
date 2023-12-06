import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteBook, updateBook } from '../Actions/bookActions';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import Modal from './Modals/Modal';
import EditModal from './Modals/EditModal';

import '../CSS/Custom.css';



const BookList = () => {
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const books = useSelector((state) => state.books.books);
    const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
        const selectedBookExists = books.find((book) => book.id === selectedBook?.id);
        if (!selectedBookExists) {
            setSelectedBook(null);
            setEditModalVisible(false);
        }
    }, [books, selectedBook]);


    const handleEdit = (book) => {
        setSelectedBook(book);
        setEditModalVisible(true);
    };

    const handleDelete = (bookId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this record!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteBook(bookId));

                setTimeout(() => {
                    if (selectedBook && selectedBook.id === bookId) {
                        setSelectedBook(null);
                        setEditModalVisible(false);
                    }
                }, 100);

                Swal.fire(
                    'Deleted!',
                    'Your record has been deleted.',
                    'success'
                );
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                setSelectedBook(null);
                setEditModalVisible(false);
            }
        });

    };

    const handleSaveChanges = (updatedBook) => {
        dispatch(updateBook(updatedBook));
        setEditModalVisible(false);
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className='container'>
            <h1>Book List</h1>
            <button onClick={openModal} className='add-btn'>Add Book</button>
            {showModal && <Modal closeModal={closeModal} />}

            {books.length > 0 ? (
                <div className="table-container">
                    <table className="book-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book) => (
                                <tr key={book.id} onClick={() => handleEdit(book)}>
                                    <td>{book.name}</td>
                                    <td>{book.price}</td>
                                    <td>{book.category}</td>
                                    <td>{book.description}</td>
                                    <td>
                                        <div className='actions'>
                                            <div>
                                                <button onClick={() => handleEdit(book)} className='btn-update'>
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </button>
                                            </div>
                                            <div>
                                                <button onClick={() => handleDelete(book.id)} className='btn-delete'>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </div>
                                        </div>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No records available</p>
            )}


            {editModalVisible && selectedBook && (
                <EditModal
                    book={selectedBook}
                    closeModal={() => setEditModalVisible(false)}
                    saveChanges={handleSaveChanges}
                />
            )}


        </div>
    );
};

export default BookList;