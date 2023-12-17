import React, { useState, useEffect } from 'react';
import * as api from '../../middleware/api';
import Card from './Card';
import CardInput from './CardInput';

export default function Collection() {
 const [collections, setCollections] = useState([]);

  useEffect(() => {
    fetchCollectionData();
  }, []);

  const fetchCollectionData = () => {
    fetch(api.getCard)
      .then((res) => res.json())
      .then((data) => {
        setCollections(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const update = () => {
    fetchCollectionData();
  };

  return (
    <div className="container mt-5">
      <CardInput update = {update}/>
      <h1 className="mt-5 p-5 text-center">Collections</h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-5">
        {collections.map((collection) => (
            <Card key = {collection._id} id = {collection._id} name = {collection.name} description = {collection.description} update = {update}/>
            ))}
        </div>
    </div>
  );
}
