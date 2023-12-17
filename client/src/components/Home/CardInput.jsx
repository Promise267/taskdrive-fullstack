import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import * as api from '../../middleware/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function CardInput(props) {
  const [collectionName, setCollectionName] = useState({
    name : "",
    description : ""
  });

  const handleOnChange = (event) => {
    const {name, value} = event.target;

    setCollectionName((prevValue) =>{
      return{
        ...prevValue,
        [name] : value
      }
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (collectionName.name.length !== 0) {
      try {
        const res = await fetch(api.addCard, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: collectionName.name, description : collectionName.description }),
        });

        if (res.status === 200) {
          props.update();
          setCollectionName({name : "", description : ""});
          toast.success("Added to Collection!");
        } else {
          throw new Error('Failed to add collection');
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.warn("Name cannot be empty")
    }
  };

  return (
    <div className="container p-5">
      <h1 className="text-center">Create A Collection</h1>
      <form>
        <input
          type="text"
          className="text-center"
          placeholder="Collection Name"
          name="name"
          onChange={handleOnChange}
          value={collectionName.name}
        />
        <textarea
          className="text-center"
          placeholder="Collection Description"
          onChange={handleOnChange}
          name = "description"
          value={collectionName.description}
          rows={10}
          cols
          />

        <button type="submit" onClick={handleSubmit}>
        <FontAwesomeIcon icon={faPlus} />
        </button>
      </form>

      {/* ToastContainer should be rendered here */}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
