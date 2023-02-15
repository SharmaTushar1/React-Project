import React from 'react'
import Product from './Product'
import { useState, useEffect } from 'react';
import LoadingComponent from './LoadingComponent';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    return fetch("https://dummyjson.com/products")
          .then((response) => response.json())
          .then((data) => {setProducts(data.products)
            
            setFilteredList(data.products);
          })
          .finally(() => {
            setLoading(false);
          });
  }


  const [filteredList, setFilteredList] = useState([products]);

  useEffect(() => {
    setLoading(true)
    fetchData();
  }, [])

  const filterBySearch = (event) => {
    const query = event.target.value;
    let updatedList = [...products];
    updatedList = updatedList.filter((item) => {
      return item.title.toLowerCase().includes(query.toLowerCase());
    })
    setFilteredList(updatedList);

 }

 if (loading) {
  return <LoadingComponent />;
 }

  return (
    <div>
      <label for = "search">Search: </label>
      <input type = "text" onChange={filterBySearch} id = "search"></input>
        {filteredList.map((product) => ( 
          <Product 
            id = {product.id}
            title = {product.title}
            img = {product.thumbnail}
            description = {product.description}
            price = {product.price}
            rating = {product.rating}
          />
          )
        )}
    </div>
  )
}

export default Home