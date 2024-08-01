import React, { useState, useEffect } from "react";
import axios from "axios";

function Profile() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood")
      .then((res) => {
        setItems(res.data.meals);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  
  const itemsList = items.slice(0, 6).map(({ strMeal, strMealThumb, idMeal }) => {
    return (
      <section key={idMeal} className="card">
        <img src={strMealThumb} alt={strMeal} />
        <section className="content">
          <p>{strMeal}</p>
          <p>#{idMeal}</p>
        </section>
      </section>
    );
  });

  return <div className="items-container">{itemsList}</div>;
}

export default Profile;
