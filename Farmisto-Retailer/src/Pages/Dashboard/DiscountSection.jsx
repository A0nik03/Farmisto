import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useAuth } from "../../utils/Auth";

const DiscountSection = () => {
  const { authToken, userDetails } = useAuth();
  const [productData, setProductData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [listPromos, setListPromos] = useState([]);
  const [discount, setDiscount] = useState(null);
  const codeRef = useRef(null);
  const discountRef = useRef(null);
  const expiryRef = useRef(null);
  const usageLimitRef = useRef(null);

  const getAllItems = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/market/get-items-farmer`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setProductData(response.data.items);
    } catch (error) {
      console.error("Failed to fetch items: ", error);
    }
  };

  const Discount = async (e) => {
    e.preventDefault();
    try {
      const data = {
        item: selectedProduct._id,
        code: codeRef.current.value,
        discountPercentage: discountRef.current.value,
        expiryDate: expiryRef.current.value,
        usageLimit: usageLimitRef.current.value,
      };
      const response = await axios.post(
        "http://localhost:4000/promo/gen-promo",
        data,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error("Failed to generate discount: ", error);
    }
  };

  const GetPromos = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/promo/list-promos",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setListPromos(response.data.promoCodes);
      console.log(response.data);
    } catch (error) {
      console.error("Failed to fetch promos: ", error);
    }
  };

  const promo = listPromos?.find((promo) => promo.item === selectedProduct._id);

  useEffect(() => {
    if (authToken) {
      getAllItems();
      GetPromos();
    }
  }, [authToken, userDetails]);

  return (
    <div className="flex flex-nowrap gap-5 h-[60vh] m-5 mt-6 p-5 bg-gradient-to-r from-green-50 to-yellow-100 rounded-lg shadow-lg">
      <div className="w-full md:w-1/2">
          {/* Title */}
          <h1 className="text-2xl font-semibold text-[#405f27] mb-6 text-center">
            Select a product
          </h1>

          {/* Select Product */}
          <div className="h-80 w-full rounded-xl scrollbar-none overflow-y-auto bg-[#f6eedb]">
            {productData.map((item, index) => (
              <a
                key={index}
                onClick={() => {
                  setSelectedProduct(item);
                  setDiscount(index);
                }}
                className={`flex justify-between items-center py-2 px-4 cursor-pointer transition-all duration-300 ${
                  discount === index
                    ? "bg-[#fffac7] shadow-md"
                    : "odd:bg-[#f1e1ba] hover:bg-[#e7d2a5]"
                }`}
              >
                <img
                  src={item.itemImage}
                  className="h-10 w-10 rounded-lg"
                  alt={item.itemName}
                />

                <p className="text-md font-medium text-[#405f27]">
                  {item.itemName}
                </p>
                <p className="text-md font-medium text-[#405f27]">
                 Rs {item.itemPrice}
                </p>
              </a>
            ))}
          </div>
      </div>

      <div
        style={{
          backgroundImage:
            "url(https://plus.unsplash.com/premium_photo-1687975124390-65e1be8a6b44?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="relative w-full md:w-1/2 h-full overflow-hidden rounded-lg select-none shadow-lg hover:shadow-xl"
      >
        <div className="absolute top-0 right-0 p-4 bg-black bg-opacity-50 h-full w-full flex justify-center items-center text-xl font-semibold">
          <div className="h-full w-full border-[1px] p-1 border-white rounded-xl flex justify-center items-center">
            {discount === null ? (
              <h1 className="text-4xl md:text-6xl text-center font-bold text-white z-50 cursor-pointer">
                Generate Discount Code!
              </h1>
            ) : (
              <div className="relative h-full w-full bg-gradient-to-r from-green-50 to-yellow-100 flex flex-col z-50 rounded-xl p-1">
                <RxCross2
                  onClick={() => setDiscount(null)}
                  className="absolute right-2 hover:scale-110 cursor-pointer text-white"
                  size={25}
                />
                <div className="flex h-28 w-full gap-5 mb-3 rounded-xl items-center">
                  <div className="h-24 w-24 border-[1px] border-white bg-gradient-to-r from-green-300 to-green-600 flex items-center justify-center rounded-lg">
                    <img
                      src={selectedProduct.itemImage}
                      className="object-cover"
                      alt={selectedProduct.itemName}
                    />
                  </div>
                  <div className="w-28 flex flex-col gap-1">
                    <p className="text-md font-medium text-[#405f27]">
                      {selectedProduct.itemName}
                    </p>
                    <p className="text-md font-medium text-red-400">
                      <span className="text-black">Rs </span>
                      {selectedProduct.itemPrice}{" "}
                      <span className="text-black text-sm">
                        / {selectedProduct.itemUnit?.unit}
                      </span>
                    </p>
                  </div>
                  <p className="pl-48">
                    Discount:
                    <span
                      className={`font-semibold ${
                        promo ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {promo ? " Active" : " Not Active"}
                    </span>
                  </p>
                </div>
                <hr className="h-4 border-black mb-1" />
                <div className="h-full w-full">
                  <form onSubmit={Discount} className="flex flex-col">
                    <div className="w-full flex items-center p-2">
                      <input
                        type="text"
                        placeholder="Code"
                        ref={codeRef}
                        className="p-2 pl-3 ml-2 shadow-md border-[1px] border-black placeholder:text-sm placeholder:text-[#405f27] bg-[#f0fcf2] rounded-lg w-full md:w-1/3 outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Discount"
                        ref={discountRef}
                        className="p-2 pl-3 ml-2 shadow-md border-[1px] border-black placeholder:text-sm placeholder:text-[#405f27] bg-[#f0fcf2] rounded-lg w-full md:w-1/3 outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Limit"
                        ref={usageLimitRef}
                        className="p-2 pl-3 ml-2 shadow-md border-[1px] border-black placeholder:text-sm placeholder:text-[#405f27] bg-[#f0fcf2] rounded-lg w-full md:w-1/3 outline-none"
                      />
                    </div>
                    <div className="flex mt-4 items-center">
                      <p className="pl-5">Expiry Date :</p>
                      <input
                        type="date"
                        ref={expiryRef}
                        className="p-2 ml-5 shadow-md border-[1px] border-black placeholder:text-sm bg-[#f0fcf2] rounded-lg w-full md:w-1/3 outline-none"
                      />
                      <button
                        type="submit"
                        className="ml-10 bg-gradient-to-r from-green-500 via-green-600 to-green-500 text-white px-4 py-2 rounded-lg shadow-md cursor-pointer text-center w-fit hover:bg-green-700 focus:ring-2 focus:ring-green-300"
                      >
                        Set Discount
                      </button>
                    </div>
                    <h1 className="text-center mt-8">
                      Discounted Price: Rs{" "}
                      {promo && selectedProduct
                        ? (
                            selectedProduct.itemPrice -
                            (promo.discountPercentage / 100) *
                              selectedProduct.itemPrice
                          ).toFixed(2)
                        : "N/A"}
                    </h1>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountSection;
