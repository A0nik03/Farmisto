import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import assets from "../../assets/assets";

const MobileCartItems = ({ cart, deleteItem, handleQuantityChange }) => {
  return (
    <div className="w-full flex flex-col gap-3 bg-white rounded-2xl p-3 overflow-y-auto scrollbar-none h-[60vh] sm:h-[65vh]">
      {cart.length === 0 ? (
        <div
          className="text-center text-md font-semibold text-zinc-500 relative h-full flex items-center justify-center"
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
              className="w-full h-48 rounded-xl border border-zinc-200 bg-white shadow-sm flex flex-col p-3 gap-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, x: 200 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              {/* Image and Name */}
              <div className="flex items-center gap-3">
                <div className="h-20 w-20 bg-zinc-100 rounded-xl flex justify-center items-center flex-shrink-0">
                  <img
                    src={item.imageUrl || assets.defaultImage}
                    alt={item.itemName || "Product"}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h1 className="text-md font-semibold text-green-900 truncate">
                    {item.itemName}
                  </h1>
                  <p className="text-sm font-medium text-zinc-500 mt-1">
                    Price: <span className="text-green-600">{item.itemPrice} {item.itemUnit.unit}</span>
                  </p>
                </div>
              </div>

              {/* Quantity and Discount */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex flex-col gap-1 w-1/2">
                  <p className="text-xs font-medium text-zinc-500">Quantity</p>
                  <div className="flex h-8 bg-zinc-100 rounded-lg border border-zinc-200">
                    <motion.div
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="w-1/3 flex justify-center items-center cursor-pointer hover:bg-zinc-200"
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaMinus className="text-zinc-500" size={12} />
                    </motion.div>
                    <div className="w-1/3 flex justify-center items-center bg-white">
                      <p className="text-sm font-medium text-zinc-600">{item.quantity}</p>
                    </div>
                    <motion.div
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="w-1/3 flex justify-center items-center cursor-pointer hover:bg-zinc-200"
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaPlus className="text-zinc-500" size={12} />
                    </motion.div>
                  </div>
                </div>
                {item.discountedPrice !== 0 && (
                  <div className="text-right">
                    <span className="flex gap-2 justify-end">
                      <p className="text-xs text-zinc-500 font-medium line-through">
                        Rs {item.itemPrice}
                      </p>
                      <p className="text-xs font-medium text-green-600">
                        Rs {item.discountedPrice}
                      </p>
                    </span>
                    {item.saving !== 0 && (
                      <p className="text-xs text-zinc-400 font-medium mt-1">
                        Save {item.saving}%
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Delete Button */}
              <motion.div
                onClick={() => deleteItem(item.id)}
                className="flex items-center justify-end gap-1 cursor-pointer mt-1"
                whileTap={{ scale: 0.95 }}
              >
                <MdDelete size={16} className="text-red-600" />
                <p className="text-sm text-red-600 font-semibold">Delete</p>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </div>
  );
};

export default MobileCartItems;