import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import assets from "../../assets/assets";

const CartItems = ({ cart, deleteItem, handleQuantityChange }) => {
  return (
    <div className="w-full flex flex-col gap-3 bg-green-50 rounded-2xl p-2 sm:gap-4 overflow-y-auto scrollbar-none h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh]">
      {cart.length === 0 ? (
        <div
          className="text-center text-md sm:text-lg md:text-xl font-semibold text-emerald-800 relative h-full flex items-center justify-center"
          style={{
            backgroundImage: `url(${assets.cart})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-white opacity-5 z-0"></div>
          <p>Your cart is empty</p>
        </div>
      ) : (
        <AnimatePresence>
          {cart.map((item) => (
            <motion.div
              key={item.id}
              className="h-36 sm:h-40  w-full rounded-xl border border-green-200 flex flex-col sm:flex-row items-center justify-between p-2 md:pr-6 bg-green-100 shadow-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, x: 200 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto">
                <div className="h-28 w-28 sm:h-36 sm:w-36  bg-green-200 rounded-xl flex justify-center items-center">
                  <img
                    src={item.imageUrl || assets.defaultImage}
                    alt={item.itemName || "Product"}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="text-center sm:text-left mt-2 sm:mt-0">
                  <h1 className="text-md sm:text-lg md:text-xl font-semibold text-green-900">
                    {item.itemName}
                  </h1>
                  <p className="text-sm sm:text-md font-medium text-emerald-700 mt-1 sm:mt-2">
                    Price:{" "}
                    <span className="text-emerald-800">
                      {item.itemPrice} {item.itemUnit.unit}
                    </span>
                  </p>
                  <motion.span
                    onClick={() => deleteItem(item.id)}
                    className="flex items-center justify-center sm:justify-start gap-1 mt-2 sm:mt-3 cursor-pointer"
                    whileTap={{ scale: 0.95 }}
                  >
                    <MdDelete
                      size={16}
                      sm:size={18}
                      md:size={20}
                      className="text-red-600"
                    />
                    <p className="text-sm sm:text-md text-red-600 font-semibold">
                      Delete
                    </p>
                  </motion.span>
                </div>
              </div>
              <div className="w-full sm:w-32 md:w-40 mt-2 sm:mt-0 flex flex-col items-center sm:items-end gap-2">
                <div className="w-full sm:w-28 md:w-32 flex flex-col gap-1">
                  <p className="text-xs sm:text-sm md:text-md font-medium text-emerald-700">
                    Quantity
                  </p>
                  <div className="flex h-8 sm:h-9 md:h-10 bg-emerald-300 rounded-lg border overflow-hidden border-emerald-500">
                    <motion.div
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="w-1/3 flex justify-center items-center cursor-pointer hover:bg-emerald-200"
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaMinus
                        className="text-emerald-800"
                        size={15}
                        sm:size={16}
                      />
                    </motion.div>
                    <div className="w-1/3 flex justify-center items-center bg-green-100">
                      <p className="text-md sm:text-lg font-medium text-emerald-600">
                        {item.quantity}
                      </p>
                    </div>
                    <motion.div
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="w-1/3 flex justify-center items-center cursor-pointer hover:bg-emerald-200"
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaPlus
                        className="text-emerald-800"
                        size={15}
                        sm:size={16}
                      />
                    </motion.div>
                  </div>
                </div>
                {item.discountedPrice !== 0 && (
                  <div className="text-center sm:text-right">
                    <span className="flex gap-2 sm:gap-3 justify-center sm:justify-end">
                      <p className="text-xs sm:text-sm md:text-md text-emerald-800 font-medium line-through">
                        Rs {item.itemPrice}
                      </p>
                      <p className="text-xs sm:text-sm md:text-md font-medium text-emerald-700">
                        Rs {item.discountedPrice}
                      </p>
                    </span>
                    {item.saving !== 0 && (
                      <p className="text-xs sm:text-sm text-emerald-800 font-medium mt-1">
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
  );
};

export default CartItems;
