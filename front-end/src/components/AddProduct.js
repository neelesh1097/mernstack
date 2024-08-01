import React from 'react'
import { useState } from 'react'

function AddProduct() {
    

    const [price,setPrice] = useState('');
    const [name,setName] = useState('');
    const [category,setCategory] = useState('');
    const [company,setCompany] = useState('');
    const [error,setError] = useState('false')


    const addProduct= async (e) =>{

        e.preventDefault();

        if(!name|| !price || !company || !category){
            setError('true')
            return false;
        }
        console.log(name,price,company,category)
         const userid =JSON.parse(localStorage.getItem("user"))
         console.log(userid._id)
        let result = await fetch("http://localhost:5000/add", {
            method: "post",
            body: JSON.stringify({ name, price,category,company,userid}),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        result = await result.json();
        console.log(result);
        

    }

  return (
    <div className='product'>
        <h1>Product</h1>
         <form className='product-form'>
         
        <input type='text' id='name' className='inputbox' value ={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter name' />
       {error && !name && <span className='invalid'>Enter a valid name</span>}

        <label htmlFor='Price'>Price</label>
        <input type='text' id='Price' className='inputbox' value ={price} onChange={(e)=>setPrice(e.target.value)} placeholder='Enter product price' />
        {error && !name && <span className='invalid'>Enter a valid Price</span>}

        <label htmlFor='Company'>Company</label>
        <input type='text' id='Company' className='inputbox' value ={company} onChange={(e)=>setCompany(e.target.value)} placeholder='Enter Company' />
        {error && !name && <span className='invalid'>Enter a valid Company</span>}

        
        <label htmlFor='Category'>Category</label>
        <input type='text' id='Category' className='inputbox' value ={category} onChange={(e)=>setCategory(e.target.value)} placeholder='Enter Category ' />
        {error && !name && <span className='invalid'>Enter a valid Category</span>}

        <button type='submit' onClick={addProduct} className='product-button'>Add Product</button>
      </form>
    </div>
  )
}

export default AddProduct