import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
      getProductDetails();
  }, );

  const getProductDetails = async () => {
      console.warn(params);
      let result = await fetch(`http://localhost:5000/product/${params.id}`);
      result = await result.json();
      setName(result.name);
      setPrice(result.price);
      setCategory(result.category);
      setCompany(result.company);
  };

  const updateProduct = async (e) => {
      e.preventDefault();
      console.warn(name, price, category, company);
      let result = await fetch(`http://localhost:5000/product/${params.id}`, {
          method: 'PUT',
          body: JSON.stringify({ name, price, category, company }),
          headers: {
              'Content-Type': 'application/json'
          }
      });
      result = await result.json();
      if (result) {
          navigate('/');
      }
  };

  return (
    <div className='update'>
      <h1>Update</h1>
      <form className='update-form' onSubmit={updateProduct}>
        <label htmlFor='name'>Name</label>
        <input type='text' id='name' className='inputbox' value={name} onChange={(e) => { setName(e.target.value) }} placeholder='Update name' />
  
        <label htmlFor='Price'>Price</label>
        <input type='text' id='Price' className='inputbox' value={price} onChange={(e) => { setPrice(e.target.value) }} placeholder='Update product price' />

        <label htmlFor='Company'>Company</label>
        <input type='text' id='Company' className='inputbox' value={company} onChange={(e) => { setCompany(e.target.value) }} placeholder='Update Company' />

        <label htmlFor='Category'>Category</label>
        <input type='text' id='Category' className='inputbox' value={category} onChange={(e) => { setCategory(e.target.value) }} placeholder='Update Category' />

        <button type='submit' className='update-button'>Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
