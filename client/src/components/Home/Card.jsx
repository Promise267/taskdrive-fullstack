import React from 'react'
import * as api from '../../middleware/api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';


export default function Card(props) {

  const id = props.id;
  const name = props.name;
  const handleDelete = () => {
    fetch(`${api.deleteCard + id}`, {
      method: 'DELETE',
    }).then((res) => {
      if(res.status === 200){
        res.json();
        props.update();
        toast.success("Deleted from Collection!")
      };
    })
      .then((data) => {
        console.log('Collection deleted successfully');
      })
      .catch((err) => {
        console.log('Error deleting collection:', err);
      });
  };
  return (
    <div>
      <div className="card shadow border-0">
          <div className="card-body">
              <h5 className="card-title">{props.name}</h5>
              <p className="card-text">{props.description}</p>
              <div className="d-flex justify-content-end">
              <Link to={{ pathname : `/collection/${id}`}} 
                    state={{collectionName: name}}
                  >
                  <button className="btn btn-primary me-2">Open</button>
              </Link>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
              </div>
          </div>
      </div>
    </div>
  )
}
