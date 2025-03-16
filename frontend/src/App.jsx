import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css"

const API_URL = "http://localhost:5000/api/items";

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  // fetch items from API

  useEffect(() => {
    axios
      .get(API_URL)
      .then(response => setItems(response.data))
      .catch(error => console.error("Error Fetching Item:", error));
  }, []);

  // Add a new item

  const addItem = () => {
    axios
      .post(API_URL, { name: newItem })
      .then(response => setItems(...items, response.data))
      .catch(error => console.error("Error Adding Item:", error));
  };




   // Update an item
   const updateItem = (id, name) => {
    axios.put(`${API_URL}/${id}`, { name })
        .then(response => {
            setItems(items.map(item => (item.id === id ? response.data : item)));
        })
        .catch(error => console.error("Error updating item:", error));
};
  // Delete

  const deleteItem = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        setItems(items.filter(item => item.id !== id));
      })
      .catch((error) => console.error("Error Deleting Item:", error));
  };




  return (
    
    <div className="container">
    <h1>React + Express REST API</h1>
    <input 
        type="text" 
        value={newItem} 
        onChange={(e) => setNewItem(e.target.value)} 
        placeholder="Add Item" 
        className="input-field"
    />
    <button onClick={addItem} className="add-button">Add Item</button>
    <ul className="item-list">
        {items.map(item => (
            <li key={item.id} className="item">
                <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateItem(item.id, e.target.value)}
                    className="edit-input"
                />
                <button onClick={() => deleteItem(item.id)} className="delete-button">Delete</button>
            </li>
        ))}
    </ul>
</div>

  );
}

export default App;