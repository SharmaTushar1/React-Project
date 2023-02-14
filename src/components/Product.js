import React from 'react'

function Product(props) {
  return (
    <div className='product'>
        <div className='title'>asdf{props.title}</div>
        <img src = {props.product.images[0]}></img>
        <div>{props.description}</div>
        <div>{props.price}</div>
        <div>{props.rating}</div>
    </div>
  )
}

export default Product