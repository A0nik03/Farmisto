import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import { FaBucket, FaMinus, FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import assets from "../../assets/assets";
import { useAuth } from "../../utils/Auth";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { authToken, userDetails } = useAuth();
  const [cart, setCart] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [shippingCost] = useState(10);
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (userDetails && authToken) {
      console.log("Fetching cart...");
      fetchCart();
    }
  }, [userDetails, authToken]);

  const fetchCart = async (dsnt) => {
    const id = userDetails?._id;
    console.log("UserID", id);
    if (authToken) {
      try {
        const response = await axios.post(
          `http://localhost:4000/cart/user`,
          { id, dsnt },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        console.log("Cart data:", response.data);
        if (response.status === 200 && response.data.cart) {
          setCart(response.data.cart);
          setTotalCost(response.data.grandTotal);
        } else {
          console.warn("No cart data received");
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    }
  };

  const updateItem = async (itemId, newQuantity) => {
    if (authToken) {
      try {
        const response = await axios.patch(
          `http://localhost:4000/cart/update/${itemId}`,
          { updatedQuantity: newQuantity },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        console.log("Cart updated:", response);
        if (response.status === 200) {
          fetchCart();
        }
      } catch (error) {
        console.error("Error updating cart:", error);
      }
    }
  };

  const handleQuantityChange = (itemId, value) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(item.quantity + value, 1) }
          : item
      );

      console.log(updatedCart);

      const updatedItem = updatedCart.find((item) => item.id === itemId);

      if (updatedItem) {
        updateItem(itemId, updatedItem.quantity);
      }

      return updatedCart;
    });
  };

  const handlePromoCode = async (e) => {
    e.preventDefault();
    const code = e.target.elements.promoCode.value;
    const data = {
      code: code,
    };
    if (authToken && code) {
      try {
        const response = await axios.post(
          "http://localhost:4000/promo/apply-promo",
          data,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        console.log("Promo: ", response.data);
        setDiscount(response.data.promo);

        if (response.status === 200) {
          const discountAmount = response.data.promo || 0;
          setDiscount(discountAmount);
          setTotalCost((prevTotal) => prevTotal - discountAmount);
          console.log("Promo code applied");
        } else {
          console.warn("Invalid promo code");
        }
      } catch (error) {
        console.error("Error applying promo code:", error);
      }
    }
  };

  const deleteItem = async (itemId) => {
    if (authToken) {
      try {
        setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));

        const response = await axios.delete(
          `http://localhost:4000/cart/delete/${itemId}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (response.status === 200) {
          console.log("Item deleted successfully");
          fetchCart();
        }
      } catch (error) {
        console.error("Error deleting item:", error);
        fetchCart();
      }
    }
  };

  const ClearCart = async () => {
    const id = userDetails._id;

    if (authToken) {
      try {
        const response = await axios.delete(
          `http://localhost:4000/cart/clear`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
            data: {
              id: id,
            },
          }
        );
        console.log("Cart cleared successfully", response.data);
        if (response.status === 200) {
          console.log("Cart cleared successfully");
          fetchCart();
          setCart([]);
          setTotalCost(0);
          setDiscount(0);
          return;
        }
      } catch (error) {
        console.error("Error clearing cart:", error);
      }
    }
  };

  const handleCODCheckout = async () => {
    const farmers = cart.map(item => ({
      id: item.farmer.id,
      name: item.farmer.name, 
      email: item.farmer.email,
    }));

    console.log(farmers)
  
    const orderDetails = {
      farmers: farmers,
      cartItems: cart,
      totalAmount: totalCost + shippingCost - discount,
      address: {
        street: "BH",
        city: "Greater Noida",
        state: "UP",
        zip: "130619",
        country: "India",
      },
      buyerEmail: "nikhilscn@gmail.com",
    };
  
    if (authToken) {
      try {
        const response = await axios.post(
          "http://localhost:4000/payments/create-payment",
          orderDetails,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
            responseType: "blob",
          }
        );
  
        if (response.status === 200) {
          const blob = new Blob([response.data], { type: "application/pdf" });
  
          const link = document.createElement("a");
          const fileName = `invoice-${orderDetails.buyerId}.pdf`;
          link.href = URL.createObjectURL(blob);
          link.download = fileName;
          link.click();
  
          console.log("Payment created and invoice downloaded");
          ClearCart();
  
          // navigate("/order-confirmation");
        } else {
          console.error("Failed to create payment");
        }
      } catch (error) {
        console.error("Error creating payment:", error);
      }
    }
  };
  

  return (
    <div className="h-full w-full bg-gradient-to-b from-green-200 to-green-400">
      <NavBar transparent={true} />
      <div className="w-[90%] h-[80%] rounded-xl bg-white mx-auto p-4 flex gap-2 mt-5">
        <div className="w-2/3 flex flex-col gap-2 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="text-center text-xl font-semibold text-zinc-500 mt-10">
              Your cart is empty!
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="h-44 w-full rounded-xl border-[1px] border-zinc-100 flex items-center justify-between px-2"
              >
                <div className="flex gap-2">
                  <div className="h-40 w-40 bg-zinc-100 rounded-xl flex justify-center items-center">
                    <img
                      src={item.imageUrl || assets.defaultImage}
                      alt={item.itemName || "Product"}
                      className="h-40 w-40 object-contain"
                    />
                  </div>
                  <div className="h-full ml-4">
                    <h1 className="text-xl font-semibold mt-5">
                      {item.itemName}
                    </h1>
                    <p className="text-md font-medium text-zinc-400 mt-2">
                      Price:{" "}
                      <span className="text-green-500">{item.itemPrice} g</span>
                    </p>
                    <span
                      onClick={() => deleteItem(item.id)}
                      className="flex gap-1 mt-3 cursor-pointer"
                    >
                      <MdDelete
                        size={20}
                        className="text-red-600"
                        onClick={() => deleteItem(item.id)}
                      />
                      <p className="text-md text-red-600 font-semibold">
                        Delete
                      </p>
                    </span>
                  </div>
                </div>
                <div className="w-40 h-full">
                  <div className="h-1/2 flex flex-col gap-1 w-full rounded-lg overflow-hidden">
                    <p className="text-md font-medium text-zinc-400 mt-1 mb-1">
                      Quantity
                    </p>
                    <div className="h-full w-full flex bg-zinc-100 rounded-lg border-[2px]">
                      <div
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="w-1/3 h-full flex justify-center items-center cursor-pointer"
                      >
                        <FaMinus className="text-zinc-500" />
                      </div>
                      <div className="w-1/3 h-full flex justify-center items-center bg-white">
                        <p className="text-zinc-500 font-medium text-md">
                          {item.quantity}
                        </p>
                      </div>
                      <div
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="w-1/3 h-full flex justify-center items-center cursor-pointer"
                      >
                        <FaPlus className="text-zinc-500" />
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-1/2 mt-1">
                    <span className="flex gap-3 mt-3">
                      <p className="text-md text-zinc-500 font-medium line-through decoration-2">
                        Rs {item.itemPrice}
                      </p>
                      <p className="text-md font-medium">
                        Rs {item.discountedPrice}
                      </p>
                    </span>
                    <p className="text-zinc-400 font-medium text-md mt-2">
                      You save {item.saving}%
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="h-full w-1/3 flex flex-col p-2">
          <p className="text-xl font-semibold">Details</p>
          <span className="w-full flex justify-between p-1 mt-4">
            <p className="text-md text-zinc-500 font-medium">
              Temporary Amount
            </p>
            <p className="text-md font-semibold">Rs {totalCost}</p>
          </span>
          <span className="w-full flex justify-between p-1 mt-1">
            <p className="text-md text-zinc-500 font-medium">Shipping</p>
            <p className="text-md font-semibold">Rs {shippingCost}</p>
          </span>
          <hr className="border-[1px] w-full rounded-xl border-zinc-300 mt-4 mb-4" />
          <span className="w-full flex justify-between p-1 mt-1">
            <p className="text-xl font-semibold">Total</p>
            <p>Rs {totalCost + shippingCost}</p>
          </span>
          <p className="mt-1 text-md text-zinc-400 font-medium">
            Including GST
          </p>

          <div className="w-full flex gap-2">
          <button
            onClick={handleCODCheckout}
            className="w-full h-12 bg-[#0d331c] flex justify-center items-center text-white font-semibold rounded-xl mt-8"
          >
            Place Order (COD)
          </button>
          <button
            onClick={()=>navigate('/place-order')}
            className="w-full h-12 bg-[#0d331c] flex justify-center items-center text-white font-semibold rounded-xl mt-8"
          >
            Card
          </button>
          </div>
          <button className="w-full h-12 bg-black text-white font-semibold rounded-xl mt-2">
            Negotiate
          </button>

          <h1 className="text-xl font-semibold mt-12">Apply promo code</h1>
          <form
            className="w-full flex items-center gap-2 mt-4"
            onSubmit={handlePromoCode}
          >
            <input
              type="text"
              name="promoCode"
              className="border-[1px] border-zinc-300 w-full px-2 py-1 rounded-md"
            />
            <button className="bg-green-600 px-4 py-2 text-white font-medium rounded-lg">
              Apply
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cart;
