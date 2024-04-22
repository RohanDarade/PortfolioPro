import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../config/api";

function Account() {
  const [userInfo, setUserInfo] = useState({});
  const [funds, setFunds] = useState(null);
  const [loading, setLoading] = useState(false);
  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${api}/users/${user_id}`)
      .then((response) => {
        setUserInfo(response.data.user);
        setLoading(false);
      })
      .catch((error) => {
        // console.error(error);
        setLoading(false);
        // Handle error
      });
  }, []);

  const handleAddFunds = () => {
    setLoading(true);
    axios
      .post(`${api}/add-funds/${user_id}`, { funds })
      .then((response) => {
        // console.log(response.data);
        setFunds("");
        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          funds: prevUserInfo.funds + parseInt(funds),
        }));
        alert(response.data.message);
        setLoading(false);
      })
      .catch((error) => {
        // console.error(error);
        setLoading(false);
        // Handle error
      });
  };

  const handleWithdrawFunds = () => {
    setLoading(true);
    axios
      .post(`${api}/withdraw-funds/${user_id}`, { funds })
      .then((response) => {
        // console.log(response.data);
        setFunds("");
        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          funds: prevUserInfo.funds - parseInt(funds),
        }));
        alert(response.data.message);
        setLoading(false);
      })
      .catch((error) => {
        // console.error(error);
        setLoading(false);
        // Handle error
      });
  };

  const availableFunds = userInfo.funds || 0;

  return (
    <div className="flex flex-col items-center mt-5">
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4">
          <h2 className="text-xl font-semibold">Account Information</h2>
          <div className="mt-4">
            <p className="text-sm font-semibold">User ID:</p>
            <p className="text-lg">{userInfo.id}</p>
          </div>
          <div className="mt-4">
            <p className="text-sm font-semibold">User Type:</p>
            <p className="text-lg">{userInfo.user_type}</p>
          </div>
          <div className="mt-4">
            <p className="text-sm font-semibold">Email:</p>
            <p className="text-lg">{userInfo.email}</p>
          </div>
          <div className="mt-4">
            <p className="text-sm font-semibold">User Name:</p>
            <p className="text-lg">{userInfo.user_name}</p>
          </div>
          <div className="mt-4">
            <p className="text-sm font-semibold">Broker:</p>
            <p className="text-lg">{userInfo.broker}</p>
          </div>
          <div className="mt-4">
            <p className="text-sm font-semibold">Available Funds:</p>
            {/* set the value of available balance to maximum 2 float */}
            <p className="text-lg">{availableFunds.toFixed(2)}</p>
          </div>
        </div>
        <div className="flex flex-col p-4 m-4 border drop-shadow-sm rounded-md justify-between">
          <input
            className="px-4 py-2 w-full border border-gray-400 drop-shadow-sm rounded"
            placeholder="Enter Amount"
            value={funds}
            onChange={(e) => setFunds(e.target.value)}
          />
          <div className="w-full flex flex-row mt-2">
            <button
              className="w-full bg-[#DAE9FF] hover:bg-[#0160FF] border border-[#0160FF] text-[#0160FF] hover:text-white font-bold py-2 px-6 mr-2 rounded"
              onClick={handleAddFunds}
            >
              Add Funds
            </button>
            <button
              className="w-full bg-[#FBE0DF] hover:bg-[#EB2821] border border-[#EB2821] text-[#EB2821] hover:text-white font-bold py-2 px-6 rounded"
              onClick={handleWithdrawFunds}
            >
              Withdraw Funds
            </button>
          </div>
        </div>
      </div>
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default Account;
