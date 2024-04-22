import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../config/api';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    axios.get(`${api}/orders/${localStorage.getItem('user_id')}`)
      .then(response => {
        setOrders(response.data.orders);
        setLoading(false); // Set loading to false when orders are fetched
        setError(false);
      })
      .catch(error => {
        // console.error(error);
        setError(true);
        setLoading(false); // Set loading to false on error
      });
  }, []);

  return (
    <div className='relative w-[70%] text-dark3'>
      <div className='flex flex-row items-center text-[26px] font-medium h-[70px] pl-[40px] border-b-[1px]  border-[#DCE3EE]'>
        Your Orders
      </div>

      {loading ? (
        <p className="flex justify-center items-center mt-24 text-3xl text-gray-400 font-extralight">Loading...</p>
      ) : error ? (
        <p className="flex justify-center items-center mt-24 text-3xl text-gray-400 font-extralight">No Order History...</p>
      ) : (
        <div className="flex flex-col w-[95%] mx-auto border-[1px]  border-[#DCE3EE] border-collapse mt-[35px] rounded-[5px] cursor-pointer border-b-[0px]">
          {orders.length === 0 ? (
            <p className="flex justify-center items-center m-auto">No order history...</p>
          ) : (
            <>
              <div className="flex flex-row justify-between bg-[#F6F9FC]  border-b-[1px] border-[#DCE3EE]  rounded-t-[5px] text-[14px] font-medium">
                <div className="flex flex-row justify-center items-center w-[18%] box-border py-[12px] border-r-[1px] ">Trade Type</div>
                <div className="flex flex-row justify-center items-center w-[20%] box-border py-[12px] border-r-[1px] ">Symbol</div>
                <div className="flex flex-row justify-center items-center w-[18%] box-border py-[12px] border-r-[1px] ">Date</div>
                <div className="flex flex-row justify-center items-center w-[18%] box-border py-[12px] border-r-[1px] ">Time</div>
                <div className="flex flex-row justify-center items-center w-[18%] box-border py-[12px] border-r-[1px] ">Price</div>
                <div className="flex flex-row justify-center items-center w-[18%] box-border py-[12px] border-r-[1px] ">Quantity</div>
                <div className="flex flex-row justify-center items-center w-[18%] box-border py-[12px] border-r-[1px] ">Value</div>
              </div>

              {orders.map(order => (
                <div key={order.id} className="flex flex-row justify-between text-[14px] border-b-[1px] rounded-b-[5px] border-[#DCE3EE] ">
                  <div className={`flex flex-row justify-center items-center w-[18%] box-border py-[10px] border-r-[1px] ${order.trade_type === 'Buy' ? 'text-blue-500' : 'text-red-500'}`}>{order.trade_type}</div>
                  <div className="flex flex-row justify-center items-center w-[20%] box-border py-[10px] border-r-[1px] ">{order.symbol}</div>
                  <div className="flex flex-row justify-center items-center w-[18%] box-border py-[10px] border-r-[1px] ">{new Date(order.date).toLocaleDateString()}</div>
                  <div className="flex flex-row justify-center items-center w-[18%] box-border py-[10px] border-r-[1px] ">{new Date(order.date).toLocaleTimeString()}</div>
                  <div className="flex flex-row justify-center items-center w-[18%] box-border py-[10px] border-r-[1px] ">{order.price}</div>
                  <div className="flex flex-row justify-center items-center w-[18%] box-border py-[10px] border-r-[1px] ">{order.quantity}</div>
                  <div className="flex flex-row justify-center items-center w-[18%] box-border py-[10px]">{(order.price * order.quantity).toFixed(2)}</div>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Orders;
