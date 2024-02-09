import Product from "./Product";

const ProductList = ({ products, onHandleAddToCart, onClickUpdate, onClickDelete}) => {
  return (
    <div className="product-listing">
      <h2>Products</h2>
      <ul className="product-list">
        {products.map((product) => {
          return <Product key={product._id} {...product} onHandleAddToCart={onHandleAddToCart} onClickUpdate={onClickUpdate} onClickDelete={onClickDelete}/>;
        })}
      </ul>
    </div>
  );
};

export default ProductList;
