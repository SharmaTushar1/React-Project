import React from 'react';
import '../components/Product.css'

function Product(props) {
  return (
    <div className='product'>
        <div className='title'>{props.title}</div>
        <img src = {props.img}></img>
        <div>{props.description}</div>
        <div>{props.price}</div>
        <div>{props.rating}</div>
    </div>
  )
}

export default Product