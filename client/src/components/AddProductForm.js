import { useState } from "react";

const AddProductForm = ({ handleSubmit }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isFormDisplayed, setIsFormDisplayed] = useState(false);

  const handleIsFormDisplayed = () => {
    setIsFormDisplayed(!isFormDisplayed);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newObj = {
      title,
      price,
      quantity
    };
    handleSubmit(newObj, reset)
  }

  const reset = () => {
    setTitle("")
    setPrice("")
    setQuantity("")
  }



  return (
    <div className={isFormDisplayed ? "add-form visible" : "add-form"}>
      {!isFormDisplayed && <p>
        <button onClick={handleIsFormDisplayed} className="add-product-button">Add A Product</button>
      </p>}
      <h3>Add Product</h3>
      {isFormDisplayed && <form onSubmit={onSubmit}>
        <div className="input-group">
          <label htmlFor="product-name">Product Name:</label>
          <input
            type="text"
            id="product-name"
            name="product-name"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="product-price">Price:</label>
          <input
            type="number"
            id="product-price"
            name="product-price"
            min="0"
            step="0.01"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="product-quantity">Quantity:</label>
          <input
            type="number"
            id="product-quantity"
            name="product-quantity"
            min="0"
            required
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="actions form-actions">
          <button type="submit">Add</button>
          <button onClick={handleIsFormDisplayed} type="button">Cancel</button>
        </div>
      </form>}
    </div>
  );
};

export default AddProductForm;
