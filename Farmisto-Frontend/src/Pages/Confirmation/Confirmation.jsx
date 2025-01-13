import React from "react";
import assets from "../../assets/assets";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const Confirmation = () => {
  const location = useLocation();
  const [data, setData] = useState({});

  useEffect(() => {
    if (location.state) {
      setData(location.state.data.confirmData);
    }
  }, [location.state]);

  console.log("Data: ", data);

  return (
    <div className="bg-gradient-to-b from-green-600 to-green-400 h-full w-full flex justify-center items-center overflow-hidden">
      <div className="modal fade w-[28%] rounded-xl overflow-hidden shadow-xl">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body bg-white border-white">
              <div className="text-right">
                <i
                  className="fa fa-close cursor-pointer text-black"
                  data-dismiss="modal"
                ></i>
              </div>

              <div className="px-10 py-12">
                <h5 className="uppercase">{data.buyer?.name}</h5>

                <div className="flex justify-between">
                <h4 className="mt-5 text-green-800 mb-5">
                  Thanks for your order
                </h4>
                <img src={assets.truck} alt="" className="h-14 w-14"/>
                </div>

                <span className="text-green-800">Payment Summary</span>
                <div className="mb-3">
                  <hr className="border-t-2 border-dashed border-white my-1" />
                </div>

                <div className="flex justify-between">
                  <span className="font-bold">Items Price ({data.cart?.length})</span>
                  <span className="text-gray-500">Rs {data.grandTotal}</span>
                </div>

                <div className="flex justify-between">
                  <small>Shipping</small>
                  <small>Rs 10</small>
                </div>

                <div className="flex justify-between">
                  <small>Tax</small>
                  <small>18%</small>
                </div>

                <div className="flex justify-between mt-3">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-green-8000">Rs {(data.grandTotal * 18)/100 + data.grandTotal + 10}</span>
                </div>

                <div className="text-center mt-5">
                  <button className="bg-green-800 text-white px-8 py-3 rounded-sm text-lg">
                    Track your order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
