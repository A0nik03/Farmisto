import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import { FaBucket, FaMinus, FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import assets from "../../assets/assets";
import { useAuth } from "../../utils/Auth";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const Cart = () => {
  const { authToken, userDetails } = useAuth();
  const [cart, setCart] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [shippingCost] = useState(10);
  const [discount, setDiscount] = useState(0);
  const [confirmData, setConfirmData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (userDetails && authToken) {
      console.log("Fetching cart...");
      fetchCart();
    }
  }, [userDetails, authToken]);

  const handleConfirmation = () => {
    navigate("/order-confirmation", {
      state: {
        data: {
          confirmData,
          shippingCost: 10,
        },
      },
    });
  };

  const fetchCart = async (dsnt) => {
    const id = userDetails?.id;
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
        if (response.status === 200 && response.data.cart) {
          setCart(response.data.cart);
          setConfirmData(response.data);
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
    const id = userDetails.id;

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
    const farmers = cart.map((item) => ({
      id: item.farmer.id,
      name: item.farmer.name,
      email: item.farmer.email,
    }));

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
      }
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

        // console.log("Payment: ", response.data);

        if (response.status === 200) {
          const blob = new Blob([response.data], { type: "application/pdf" });

          const link = document.createElement("a");
          const fileName = `invoice-${orderDetails.buyerId}.pdf`;
          link.href = URL.createObjectURL(blob);
          link.download = fileName;
          link.click();

          console.log("Payment created and invoice downloaded");
          handleConfirmation();
          ClearCart();
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
        <div className="w-2/3 flex flex-col gap-2 overflow-y-auto scrollbar-none">
          {cart.length === 0 ? (
            <div
              className="text-center text-xl font-semibold text-zinc-500 relative h-full"
              style={{
                backgroundImage:
                  "url('https://cdn.dribbble.com/users/687236/screenshots/5838300/media/e057a25942aae5272354e78afbac8e8a.png?resize=840x630&vertical=center')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="absolute inset-0 bg-white opacity-5 z-0"></div>
            </div>
          ) : (
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  className="h-44 w-full rounded-xl border-[1px] border-zinc-100 flex items-center justify-between pr-2"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, x: 200 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
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
                        <span className="text-green-500">
                          {item.itemPrice} {item.itemUnit.unit}
                        </span>
                      </p>
                      <motion.span
                        onClick={() => deleteItem(item.id)}
                        className="flex gap-1 mt-3 cursor-pointer"
                        whileTap={{ scale: 0.95 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        <MdDelete
                          size={20}
                          className="text-red-600"
                          onClick={() => deleteItem(item.id)}
                        />
                        <p className="text-md text-red-600 font-semibold select-none">
                          Delete
                        </p>
                      </motion.span>
                    </div>
                  </div>
                  <div className="w-40 h-full">
                    <div className="h-1/2 flex flex-col gap-1 w-full rounded-lg overflow-hidden">
                      <p className="text-md font-medium text-zinc-400 mt-1 mb-1">
                        Quantity
                      </p>
                      <div className="h-full w-full flex bg-zinc-100 rounded-lg border-[2px] select-none">
                        <motion.div
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="w-1/3 h-full flex justify-center items-center cursor-pointer select-none"
                          whileTap={{ scale: 0.95 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 10,
                          }}
                        >
                          <FaMinus className="text-zinc-500" />
                        </motion.div>
                        <div className="w-1/3 h-full flex justify-center items-center bg-white">
                          <p className="text-zinc-500 font-medium text-md">
                            {item.quantity}
                          </p>
                        </div>
                        <motion.div
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="w-1/3 h-full flex justify-center items-center cursor-pointer select-none"
                          whileTap={{ scale: 0.95 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 10,
                          }}
                        >
                          <FaPlus className="text-zinc-500" />
                        </motion.div>
                      </div>
                    </div>
                    {!item.discountedPrice === 0 && (
                      <div className="w-full h-1/2 mt-1">
                        <span className="flex gap-3 mt-3">
                          <p className="text-md text-zinc-500 font-medium line-through decoration-2">
                            Rs {item.itemPrice}
                          </p>
                          <p className="text-md font-medium">
                            Rs {item.discountedPrice}
                          </p>
                        </span>
                        {!item.saving === 0 && (
                          <p className="text-zinc-400 font-medium text-md mt-2">
                            You save {item.saving}%
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
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
            <motion.button
              onClick={handleCODCheckout}
              className="w-full h-12 bg-[#0d331c] flex justify-center select-none items-center text-white font-semibold rounded-xl mt-8"
              whileTap={{ scale: 0.85 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 10,
              }}
            >
              COD
            </motion.button>
            <motion.button
              onClick={() => navigate("/place-order")}
              className="w-full h-12 bg-[#0d331c] flex justify-center select-none items-center text-white font-semibold rounded-xl mt-8"
              whileTap={{ scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 10,
              }}
            >
              Card
            </motion.button>
          </div>
          <motion.button
            className="w-full h-12 bg-black text-white select-none font-semibold rounded-xl mt-2"
            whileTap={{ scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 10,
            }}
          >
            Negotiate
          </motion.button>

          <h1 className="text-lg font-semibold mt-8">Apply promo code</h1>
          <form
            className="w-full flex items-center mt-4"
            onSubmit={handlePromoCode}
          >
            <div className="h-12 w-full flex justify-between items-center">
              <div className="w-full h-full rounded-xl overflow-hidden bg-zinc-50 border-[1px]">
                <input
                  type="text"
                  name="promoCode"
                  className="outline-none bg-transparent px-2 py-1 rounded-md text-green-800 font-semibold ml-1"
                />
                <motion.button
                  className="h-full ml-32 text-green-500 hover:text-green-300 select-none hover:scale-[1.05]  font-medium rounded-lg"
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                  }}
                >
                  Apply
                </motion.button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cart;
