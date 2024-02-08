const Header = ({ cartState }) => {
  // console.log(cartState);
  const total = cartState.reduce((result, product) => result + (product.quantity * product.price), 0).toFixed(2);

  if (cartState.length === 0) {
    return (
      <header>
        <h1>The Shop!</h1>
        <div className="cart">
          <h2>Your Cart</h2>
          <p>Your cart is empty</p>
          <p>Total: $0</p>
          <button className="checkout" disabled>
            Checkout
          </button>
        </div>
      </header>
    );
  }

  return (
    <header>
      <h1>The Shop!</h1>
      <div className="cart">
        <h2>Your Cart</h2>
        <table className="cart-items">
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {cartState.map(product => {
              return (
                <tr key={product.id}>
                  <td>{product.title}</td>
                  <td>{product.quantity}</td>
                  <td>{product.price}</td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" className="total">
                Total: ${total}
              </td>
            </tr>
          </tfoot>
        </table>
        <div className="checkout-button">
          <button className="checkout">Checkout</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
