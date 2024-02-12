import Header from "./Header";
import ProductList from "./ProductList";
import AddProductForm from "./AddProductForm";
import { useEffect, useState } from "react";
import cartServices from "../services/cart";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cartState, setCartState] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const data = await cartServices.getAllProducts();
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };
    getAllProducts();
  }, []);

  useEffect(() => {
    const getCart = async () => {
      try {
        const data = await cartServices.getCart();
        console.log(data);
        setCartState(data);
      } catch (error) {
        console.error(error);
      }
    };

    getCart();
  }, []);

  const handleSubmit = async (newObj, callback) => {
    try {
      const newProduct = await cartServices.addProduct(newObj);
      setProducts((prev) => prev.concat(newProduct));

      if (callback) {
        callback();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToCart = async (productId) => {
    const { product: updatedProduct, item: productInCart } =
      await cartServices.addToCart(productId);
    console.log(updatedProduct, productInCart);
    setProducts((oldProducts) => {
      return oldProducts.map((product) => {
        if (product._id === productId) {
          const itemInCart = cartState.find(
            (product) => product.productId === productId,
          );
          console.log(itemInCart);
          if (itemInCart) {
            setCartState((prevCart) => {
              return prevCart.map((product) => {
                if (product.productId === itemInCart.productId) {
                  return productInCart;
                }
                return product;
              });
            });
          } else {
            setCartState((prev) => prev.concat(productInCart));
          }

          return updatedProduct;
        } else {
          return product;
        }
      });
    });
  };

  const handleClickUpdate = async (
    { title, price, quantity, _id },
    callback,
  ) => {
    let updatedProduct;
    try {
      quantity = Math.max(quantity, 0).toFixed(2);
      updatedProduct = await cartServices.updateProduct(
        { title, price, quantity },
        _id,
      );
      setProducts((oldProducts) => {
        return oldProducts.map((product) => {
          if (product._id === _id) {
            return updatedProduct;
          }
          return product;
        });
      });

      if (callback) {
        callback();
      }
    } catch (error) {
      console.error(error);
    }

    // console.log(updatedProduct)
    // // FIX LATER
    // setCartState((products) => {
    //   return products.map((product) => {
    //     if (product.productId === _id) {
    //       console.log('found')
    //       return updatedProduct;
    //     }
    //     return product;
    //   });
    // });
  };

  const handleDeleteProduct = async (id) => {
    try {
      await cartServices.deleteProduct(id);
      // const data = await cartServices.getAllProducts()
      setProducts(data => data.filter((product) => id !== product.id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckout = async () => {
    try {
      await cartServices.checkoutCart();
      setCartState([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="app">
      <Header cartState={cartState} onCheckout={handleCheckout} />
      <main>
        <ProductList
          products={products}
          onHandleAddToCart={handleAddToCart}
          onClickUpdate={handleClickUpdate}
          onClickDelete={handleDeleteProduct}
        />
        <AddProductForm handleSubmit={handleSubmit} />
      </main>
    </div>
  );
};

export default App;
