import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const handleChange = (e) => {
     setName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      // dispalay alert
      showAlert( true, 'please enter a value', 'danger')
    } else if (name && isEditing) {
      // deal with edit
    } else {
      // show alert
      showAlert(true, "New Item Added", "success")
      const newItem = {id: Math.random(), title: name}
      setList([...list, newItem]);
      setName('');
    }
  };

  const showAlert = ( show = false, msg: '', type: '') => {
    setAlert({ show, msg, type})
  }

  const clearList = () => {
    showAlert(true, 'List cleared', 'danger');
    setList([]);
  }

  const removeItem = (id) => {
    showAlert(true, 'Item removed', 'danger')
    const newList = list.filter((item) => {
      return item.id !== id
    })
    setList(newList)
  }

  return (
    <section className="section-center">
      <form onSubmit={handleSubmit} className="grocery-form">
        {alert.show && <Alert {...alert} removeAlert={showAlert}/>}
        <h3>Grocery Bud</h3>
        <div className="form-control">
          <input
            className="grocery"
            type="text"
            placeholder="e.g. milk"
            value={name}
            onChange={handleChange}
          />
          <button className="submit-btn" type="submit">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
      <div className="grocery-container">
      <List items={list} removeItem={removeItem}/>
      <button className="clear-btn" type="button" onClick={clearList}>clear items</button>
    </div>
    )}



    </section>
  );
}

export default App;
