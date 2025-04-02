import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddMenu = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [menu, setMenu] = useState([]);  // State to store menu items

    // Fetch existing menu items
    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/menu');
                setMenu(response.data);  // Set the fetched menu items
            } catch (error) {
                console.error('Error fetching menu items:', error);
            }
        };

        fetchMenu();
    }, []);

    // Add a new menu item
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newMenuItem = { name, price, category };

        try {
            const response = await axios.post('http://localhost:5000/api/menu', newMenuItem);

            // Clear the form fields after submission
            setName('');
            setPrice('');
            setCategory('');

            // Fetch updated menu items after adding a new item
            setMenu((prevMenu) => [...prevMenu, response.data]);

            alert('Menu item added successfully!');
        } catch (error) {
            console.error('Error adding menu item:', error);
            alert('Failed to add menu item. Please try again.');
        }
    };

    // Delete a menu item
    const deleteMenu = async (id) => {
        //yes its run
        try {
            const response = await axios.delete(`http://localhost:5000/api/menu/${id}`);
            
            // Update the state to remove the deleted item
            setMenu(menu.filter((item) => item._id !== id));

            alert('Menu item deleted successfully!');
        } catch (error) {
            console.error('Error deleting menu item:', error);
            alert('Failed to delete menu item. Please try again.');
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
            <h1>Add Menu Item</h1>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Enter menu item name"
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Price:</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        placeholder="Enter menu item price"
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Category:</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        placeholder="Enter menu item category"
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        backgroundColor: 'blue',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    Add Item
                </button>
            </form>

            <h2 style={{ marginTop: '30px' }}>Menu Items</h2>
            <ul>
                {menu.map((item) => (
                    <li key={item._id} style={{ marginBottom: '10px' }}>
                        <strong>{item.name}</strong> - ₹{item.price} - {item.category}
                        <button
                            onClick={() => deleteMenu(item._id)}
                            style={{
                                marginLeft: '10px',
                                backgroundColor: 'red',
                                color: 'white',
                                border: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AddMenu;
