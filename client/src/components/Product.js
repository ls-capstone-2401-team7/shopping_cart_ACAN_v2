import { useState } from "react";
import EditProduct from "./EditProduct";

const Product = ({
  title,
  quantity,
  price,
  onHandleAddToCart,
  _id,
  onClickUpdate,
  onClickDelete
}) => {
  const handleAddToCart = () => {
    onHandleAddToCart(_id);
  };

  const [isEditFormVisible, setisEditFormVisible] = useState(false);

  return (
    <li className="product">
      <div className="product-details">
        <h3>{title}</h3>
        <p className="price">${price}</p>
        <p className="quantity">{quantity} left in stock</p>
        <div className="actions product-actions">
          {quantity === 0 ? (
            <button disabled className="add-to-cart">
              Add to Cart
            </button>
          ) : (
            <button onClick={handleAddToCart} className="add-to-cart">
              Add to Cart
            </button>
          )}
          <button className="edit" onClick={() => setisEditFormVisible(!isEditFormVisible)}>
            Edit
          </button>
        </div>
        <button 
          className="delete-button"
          onClick={() => onClickDelete(_id)}
        >
          <span>X</span>
        </button>
      </div>
      {isEditFormVisible && (
        <EditProduct
          title={title}
          quantity={quantity}
          price={price}
          _id={_id}
          onClickUpdate={onClickUpdate}
          setisEditFormVisible={setisEditFormVisible}
        />
      )}
    </li>
  );
};

export default Product;
