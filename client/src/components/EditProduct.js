import { useState } from "react";

const EditProduct = ({
  title,
  price,
  quantity,
  id,
  onClickUpdate,
  setEditTrue,
}) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newPrice, setNewPrice] = useState(price);
  const [newQuantity, setnewQuantity] = useState(quantity);

  const changeEditState = () => {
    setEditTrue((oldEditState) => !oldEditState);
  };

  return (
    <div className="edit-form">
      <h3>Edit Product</h3>
      <form>
        <div className="input-group">
          <label htmlFor="product-name">Product Name</label>
          <input
            type="text"
            id="product-name"
            value={newTitle}
            aria-label="Product Name"
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-price">Price</label>
          <input
            type="number"
            id="product-price"
            value={newPrice}
            aria-label="Product Price"
            onChange={(e) => setNewPrice(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-quantity">Quantity</label>
          <input
            type="number"
            id="product-quantity"
            value={newQuantity}
            aria-label="Product Quantity"
            onChange={(e) => setnewQuantity(e.target.value)}
            min="0"
          />
        </div>

        <div className="actions form-actions">
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              onClickUpdate(
                {
                  title: newTitle,
                  price: newPrice,
                  quantity: newQuantity,
                  id,
                },
                changeEditState,
              );
            }}
          >
            Update
          </button>
          <button
            type="button"
            onClick={() => setEditTrue((editIsTrue) => !editIsTrue)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
