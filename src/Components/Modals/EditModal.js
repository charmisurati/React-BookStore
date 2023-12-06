
import React, { useState, useEffect } from 'react';

const EditModal = ({ book, closeModal, saveChanges }) => {
    const [editedBook, setEditedBook] = useState({ ...book });

    useEffect(() => {
        setEditedBook({ ...book });
    }, [book]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedBook({ ...editedBook, [name]: value });
    };

    const handleSave = () => {
        saveChanges(editedBook);
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Edit Book</h2>
                <form>
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={editedBook.name}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        placeholder="Price"
                        name="price"
                        value={editedBook.price}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        placeholder="Category"
                        name="category"
                        value={editedBook.category}
                        onChange={handleInputChange}
                    />
                    <textarea
                        placeholder="Description"
                        name="description"
                        value={editedBook.description}
                        onChange={handleInputChange}
                    />
                    <div className="modal-buttons">
                        <button type="button" onClick={handleSave}>
                            Save Changes
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

export default EditModal;
