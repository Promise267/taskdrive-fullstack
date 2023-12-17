import { useParams, useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import * as api from '../../middleware/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash, faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import Header from '../Header';
import Footer from '../Footer';

export default function Note() {
  const [notes, setNotes] = useState([]);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [selectedRowCount, setSelectedRowCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const location = useLocation();
  const props = location.state;
  const { id } = useParams();

  const handleNoteSelection = (noteId) => {
    setSelectedNotes((prevSelectedNotes) => {
      if (prevSelectedNotes.includes(noteId)) {
        return prevSelectedNotes.filter((selectedNoteId) => selectedNoteId !== noteId);
      } else {
        return [...prevSelectedNotes, noteId];
      }
    });
  };

  const handleDelete = () => {
    selectedNotes.forEach((noteId) => {
      notes.findIndex((note)=>{
        if (noteId === note._id) {
          fetch(api.deleteNote.replace(':id', note._id), {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ noteIds: selectedNotes }),
            })
            .then((res) => {
              if (res.status === 200) {
                return res.text();
              } else {
                throw new Error('Error deleting note');
              }
            })
            .then((data) => {
              fetchNotes();
              toast.success('Deleted from Notes!');
              resetSelection();
            })
            .catch((err) => {
              console.log('Error deleting notes:', err);
            });
        }
      })
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchNotes();
  }

  const handleSearchChange = (e)=>{
    setSearchQuery(e.target.value);
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  const resetSelection = () => {
    setSelectedNotes([]);
    setSelectedRowCount(0);
  };

  const fetchNotes = () => {
    fetch(api.getNote.replace(":id", id))
      .then((res) => res.json())
      .then((data) => {
        if (searchQuery !== "") {
          const filteredNotes = data.filter((note) =>
            note.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setNotes(filteredNotes);
        } else {
          setNotes(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setSelectedRowCount(selectedNotes.length);
  }, [selectedNotes.length]);

  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <h1 className="text-start">{props.collectionName} Notes</h1>
          </div>
          <div className="col d-flex justify-content-end">
            <Link to={{ pathname: `/collection/${id}/newnote` }} state={{ collectionId: id }}>
              <button type="button" className="btn btn-primary me-2 px-4 py-3">
                Create <FontAwesomeIcon icon={faPlus}/>
              </button>
            </Link>
            <button
              type="button"
              className="btn btn-danger px-4"
              disabled={selectedNotes.length === 0}
              onClick={handleDelete}
            >
              <FontAwesomeIcon icon={faTrash} />&nbsp;
              {selectedRowCount > 0 ? selectedRowCount + ' item(s)' : ''}
            </button>
          </div>
        </div>
        <div className="container mt-5">
          <div onClick={handleSearch}>
            <div class="d-flex justify-content-start">
            <input
              className="form-control mr-sm-2 shadow"
              type="search"
              placeholder="Search"
              aria-label="Search"
              style={{ borderBottomRightRadius: 0, borderTopRightRadius: 0 }}
              value={searchQuery}
              onChange={handleSearchChange}
              />
              <button type = "submit" className="btn btn-primary shadow" style={{borderBottomLeftRadius:0 , borderTopLeftRadius:0 }} onClick={handleSearch}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
              </div>

          </div>
        </div>
        <div className="container mt-5 table-responsive">
          <table className="table table-striped mt-5 shadow">
            <thead className="thead-dark text-center">
              <tr>
                <th scope="col">Select</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Date Created</th>
                <th scope="col" colSpan={2}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {notes.map((note) => (
                <tr key={note._id} className="text-center">
                  <th scope="row">
                    <input
                      className="checkbox-flip"
                      type="checkbox"
                      id={`check-${note._id}`}
                      checked={selectedNotes.includes(note._id)}
                      onChange={() => handleNoteSelection(note._id)}
                    />
                    <label htmlFor={`check-${note._id}`}>
                      <span className="text-center"></span>
                    </label>
                  </th>
                  <td>{note.title}</td>
                  <td>{note.description.substring(0, 25)}</td>
                  <td>{note.date}</td>
                  <td>
                    <Link 
                      to={{ pathname: `/collection/${id}/newnote` }} 
                      state={{ collectionId: id, 
                                editTitle: "Edit", 
                                noteId : note._id,
                                noteTitle : note.title, 
                                noteDescription : note.description 
                    }}>
                    <button className="btn">
                      <FontAwesomeIcon icon={faPencil} />
                    </button>
                  </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />

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
  );
}
