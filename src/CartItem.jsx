import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Zadatak 3: Računanje ukupnog iznosa u korpi
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach((item) => {
      const costNumber = parseFloat(item.cost.substring(1));
      total += costNumber * item.quantity;
    });
    return total.toFixed(2);
  };

  // Zadatak 3: Nastavak kupovine
  const handleContinueShopping = (e) => {
    if (onContinueShopping) {
      onContinueShopping(e);
    }
  };

  // Zadatak 3: Checkout alert
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  // Zadatak 3: Povećanje količine (+1)
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Zadatak 3: Smanjenje količine (-1) ili uklanjanje ako spadne na 0
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // Zadatak 3: Uklanjanje artikla iz korpe
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Zadatak 3: Računanje podzbroja za pojedinačnu biljku (subtotal)
  const calculateTotalCost = (item) => {
    const costNumber = parseFloat(item.cost.substring(1));
    return (costNumber * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">Subtotal: ${calculateTotalCost(item)}</div>
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', display: 'flex', gap: '20px' }}>
        <button
          className="get-started-button1"
          onClick={(e) => handleContinueShopping(e)}
        >
          Continue Shopping
        </button>
        <button
          className="get-started-button1"
          onClick={(e) => handleCheckoutShopping(e)}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;