import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import * as api from '../../middleware/api'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowUp, faPlus } from '@fortawesome/free-solid-svg-icons';
import currentDate from '../../middleware/date'

export default function AddNote() {
    const { id } = useParams();

    const location = useLocation();

    const [note, setNote] = useState({
      title: location.state.noteTitle || "",
      description: location.state.noteDescription || "",
    });
    
    const handleChange = (event) => {
      const { name, value } = event.target;
      setNote((prevNote) => ({
        ...prevNote,
        [name]: value,
      }));
    };
    const handleAdd = async (e) => {
        e.preventDefault();
        if (note.title.length !== 0 && note.description.length !== 0) {
          try {
            const res = await fetch(api.addNote.replace(":id", id), {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                title: note.title,
                description: note.description,
                date: currentDate,
              }),
            });
      
            if (res.status === 200) {
              setNote({ title: "", description: "" });
              toast.success("Note Added to Collection!");
            } else if (res.status === 404) {
              toast.error("Collection not found");
            } else {
              throw new Error('Failed to add note');
            }
          } catch (error) {
            console.error("Error adding note:", error);
            toast.error("Failed to add note");
          }
        } else {
          toast.warn("Fields are empty");
        }
      };


      const handleEdit = async(e) => {
        e.preventDefault();
        if (note.title.length !== 0 && note.description.length !== 0) {
          try {
            const res = await fetch(api.editNote.replace(":id", location.state.noteId), {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                title: note.title,
                description: note.description
              }),
            });
      
            if (res.status === 200) {
              toast.success("Note Updated!");
            } else if (res.status === 404) {
              toast.error("Collection not found");
            } else {
              throw new Error('Failed to update note');
            }
          } catch (error) {
            console.error("Error updating note:", error);
            toast.error("Failed to update note");
          }
        } else {
          toast.warn("Fields are empty");
        }
      }

  return (
    <>
    <Header/>
    <div className="container mt-5">
        <h1 className="text-center">{location.state.editTitle === "Edit"? location.state.editTitle : "Create"} Your Note</h1>
        <form>
        <input
          className="text-center"
          type="text"
          name="title"
          placeholder="Note Title..."
          value={note.title}
          onChange={handleChange}
        />
        <textarea
          className="text-center"
          name="description"
          placeholder="Write Something..."
          value={note.description}
          onChange={handleChange}
          cols="30"
          rows="20"
        ></textarea>
        {location.state.editTitle === "Edit" ? (
          <button type="submit" onClick={handleEdit}>
            <FontAwesomeIcon icon={faFileArrowUp} />
          </button>
        ) : (
          <button type="submit" onClick={handleAdd}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        )}
        </form>
    </div>
    <Footer/>
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
    
    </>
  )
}
