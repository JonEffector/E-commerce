 import React, {useEffect} from 'react';
import { addToCart, removeFromCart } from '../actions/cartActions';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
 
 function CartScreen(props){

    const productDetails = useSelector( state => state.productDetails);
    const {product} = productDetails; 

    const productId = props.match.params.id;
    const qty = props.location.search ? Number (props.location.search.split("=")[1]):1;
    const dispatch = useDispatch();
    const removeFromCartHandler = (productId)=>{
        dispatch(removeFromCart(productId));
    }

    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, qty));
        }
    }, [])

    return <div className="cart">
        <div className="cart-list">
            <ul className="cart-list-container">
                <li>
                    <h3>Shopping Cart</h3>
                    <div>
                        Price
                    </div>
                </li>
                {
                    product.length ===0 ?
                    <div>
                        Cart is empty
                    </div>
                    :
                    // product.map(product=>
                        <li>
                            <div className="cart-img">
                                <img src={product.image} alt="product" />
                            </div>
                            
                            <div className="cart-name">
                                <div>
                                    <Link to={"/product/" + product}>
                                        {product.name}
                                    </Link>
                                    
                                </div>
                                <div>
                                    Qty:
                                    <select>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                                    <button type="button" className="button" onClick={()=> removeFromCartHandler(product)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <div className="cart-price">
                                ${product.price}
                            </div>
                        </li>
                    // )
                }
            </ul>
        </div>
        <div className="cart-action">
            <h3>
                Subtotal ( {(qty)} items)
                :
                $ {(qty * product.price)}
            </h3>
            <button className="button primary" disable={product.length === 0}>
                Proceed to Checkout
            </button>
        </div>
    </div>
 }
 export default CartScreen;