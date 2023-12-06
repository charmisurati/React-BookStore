

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../../Actions/bookActions';
import '../../CSS/Custom.css';
import { v4 as uuidv4 } from 'uuid';

const Modal = ({ closeModal }) => {
    const dispatch = useDispatch();
    

    const [newBook, setNewBook] = useState({
        id: uuidv4(),
        name: '',
        price: '',
        category: '',
        description: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBook({ ...newBook, [name]: value });
    };

    const handleAddBook = () => {
        dispatch(addBook(newBook));

        setNewBook({
            id: uuidv4(),
            name: '',
            price: '',
            category: '',
            description: '',
        });


        closeModal();
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Add Book</h2>
                <form>
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={newBook.name}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        placeholder="Price"
                        name="price"
                        value={newBook.price}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        placeholder="Category"
                        name="category"
                        value={newBook.category}
                        onChange={handleInputChange}
                    />
                    <textarea
                        placeholder="Description"
                        name="description"
                        value={newBook.description}
                        onChange={handleInputChange}
                    />
                    <div className="modal-buttons">
                        <button type="button" onClick={handleAddBook}>
                            Add Book
                        </button>
                        <button type="button" onClick={closeModal}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default Modal;
