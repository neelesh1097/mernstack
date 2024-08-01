import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function Productlist() {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = async () => {
        let result = await fetch("http://localhost:5000/product");
        result = await result.json();
        setProduct(result);
    };

    console.log("product", product);

    const deleteProduct = async (id) => {
        try {
            let result = await fetch(`http://localhost:5000/product/${id}`, {
                method: 'DELETE'
            });
            result = await result.json();
            if (result) {
                getProduct();
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const searchHandle = async (event)=>{
        let key = event.target.value;
        if(key){
            let result = await fetch(`http://localhost:5000/search/${key}`);
            result = await result.json()
            if(result){
                setProduct(result)
            }
        }else{
            getProduct();
        }
        
    }

    return (
        <div className='product-list'>
            <h1>Product List</h1>
            <input type="" className='search-product-box' placeholder='Search Product'
            onChange={searchHandle}
             />
            <ul>
                <li>S.no</li>
                <li>Name</li>
                <li>Price</li>
                <li>Company</li>
                <li>Operation</li>
            </ul>
            {
                product.map((item, index) =>
                    <ul key={item}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>${item.price}</li>
                        <li>{item.company}</li>
                        <li>
                            <button onClick={() => deleteProduct(item._id)} className='product-btn'>Delete</button>
                            <Link className='update-link'to ={"/update/"+item._id}>update</Link>
                        </li>
                        
                    </ul>
                )
            }
        </div>
    );
}

export default Productlist;
