import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import assets from "../../assets/assets";
import { useAuth } from "../../utils/Auth";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import CartItems from "./CartItems";
import MobileCartItems from "./MobileCartItems";

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
          `/cart/user`,
          { id, dsnt }
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
          `/cart/update/${itemId}`,
          { updatedQuantity: newQuantity }
        );
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
    const data = { code };
    if (authToken && code) {
      try {
        const response = await axios.post(
          "/promo/apply-promo",
          data
        );
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
          `/cart/delete/${itemId}`
        );
        if (response.status === 200) {
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
          `/cart/clear`,
          {
            data: { id },
          }
        );
        if (response.status === 200) {
          setCart([]);
          setTotalCost(0);
          setDiscount(0);
          fetchCart();
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
      farmers,
      cartItems: cart,
      totalAmount: totalCost + shippingCost - discount,
      address: {
        street: "BH",
        city: "Greater Noida",
        state: "UP",
        zip: "130619",
        country: "India",
      },
    };

    if (authToken) {
      try {
        const response = await axios.post(
          "/payments/create-payment",
          orderDetails,
          {
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
          handleConfirmation();
          ClearCart();
        }
      } catch (error) {
        console.error("Error creating payment:", error);
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-emerald-200 to-emerald-100">
      <NavBar transparent={true} />
      <div className="w-full sm:w-[90%] max-w-8xl mx-auto p-4 flex flex-col lg:flex-row gap-4 sm:gap-6 mt-4 sm:mt-5">
        {/* Cart Items */}
        <div className="lg:hidden w-full">
          <MobileCartItems
            cart={cart}
            deleteItem={deleteItem}
            handleQuantityChange={handleQuantityChange}
          />
        </div>

        <div className="hidden lg:block w-full">
          <CartItems
            cart={cart}
            deleteItem={deleteItem}
            handleQuantityChange={handleQuantityChange}
          />
        </div>
        

        {/* Cart Details */}
        <div className="w-full lg:w-1/3 flex flex-col p-3 sm:p-4 md:p-6 bg-green-50 rounded-xl shadow-md mt-4 lg:mt-0">
          <p className="text-lg sm:text-xl md:text-2xl font-semibold text-green-900">Details</p>
          <div className="flex flex-col gap-2 mt-3 sm:mt-4">
            <span className="flex justify-between">
              <p className="text-sm sm:text-md md:text-lg text-emerald-700 font-medium">Temporary Amount</p>
              <p className="text-sm sm:text-md md:text-lg font-semibold text-green-900">Rs {totalCost}</p>
            </span>
            <span className="flex justify-between">
              <p className="text-sm sm:text-md md:text-lg text-emerald-700 font-medium">Shipping</p>
              <p className="text-sm sm:text-md md:text-lg font-semibold text-green-900">Rs {shippingCost}</p>
            </span>
            {discount > 0 && (
              <span className="flex justify-between">
                <p className="text-sm sm:text-md md:text-lg text-emerald-700 font-medium">Discount</p>
                <p className="text-sm sm:text-md md:text-lg font-semibold text-green-600">-Rs {discount}</p>
              </span>
            )}
            <hr className="border-t border-green-300 my-3 sm:my-4" />
            <span className="flex justify-between">
              <p className="text-md sm:text-lg md:text-xl font-semibold text-green-900">Total</p>
              <p className="text-md sm:text-lg md:text-xl font-semibold text-green-900">
                Rs {totalCost + shippingCost - discount}
              </p>
            </span>
            <p className="text-xs sm:text-sm md:text-md text-emerald-700 font-medium">Including GST</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-6">
            <motion.button
              onClick={handleCODCheckout}
              className="w-full h-10 sm:h-11 md:h-12 bg-[#0d331c] text-white font-semibold rounded-xl flex justify-center items-center"
              whileTap={{ scale: 0.95 }}
            >
              COD
            </motion.button>
            <motion.button
              onClick={() => navigate("/place-order")}
              className="w-full h-10 sm:h-11 md:h-12 bg-[#0d331c] text-white font-semibold rounded-xl flex justify-center items-center"
              whileTap={{ scale: 0.95 }}
            >
              Card
            </motion.button>
          </div>
          <motion.button
            className="w-full h-10 sm:h-11 md:h-12 bg-black text-white font-semibold rounded-xl mt-2 sm:mt-3"
            whileTap={{ scale: 0.95 }}
          >
            Negotiate
          </motion.button>

          <h1 className="text-md sm:text-lg md:text-xl font-semibold text-green-900 mt-4 sm:mt-6 md:mt-8">
            Apply promo code
          </h1>
          <form className="w-full flex items-center mt-3 sm:mt-4" onSubmit={handlePromoCode}>
            <div className="w-full h-10 sm:h-11 md:h-12 flex items-center bg-green-50 border border-green-200 rounded-xl overflow-hidden">
              <input
                type="text"
                name="promoCode"
                className="w-full h-full outline-none bg-transparent px-3 sm:px-4 text-green-800 font-medium text-lg sm:text-md placeholder-emerald-600"
                placeholder="Enter promo code"
              />
              <motion.button
                className="h-full px-3 sm:px-4 text-emerald-800 hover:text-emerald-700 font-medium"
                whileTap={{ scale: 0.95 }}
              >
                Apply
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cart;