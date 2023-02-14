import React from 'react'
import products from '../data/data'
import Product from './Product'

function Home() {
  return (
    <div>
        {products.products.map((product) => {
            <Product 
            id = {products.id}
            title = {product.title}
            img = {product.img}
            description = {product.description}
            price = {product.price}
            rating = {product.rating}
            />
        })}
        {/* asdf */}
    </div>
  )
}

export default Home