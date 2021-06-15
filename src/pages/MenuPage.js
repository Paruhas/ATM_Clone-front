import React, { useContext, useEffect, useState } from "react";
import axios from "../configs/axios";
import { removeToken } from "../services/localStorageService";
import { AuthContext } from "../contexts/AuthContext";
import "./MenuPage.css";
import Swal from "sweetalert2";

import UserHistory from "../components/MenuPage/userHistory";

const toTHBFormat = (n) => {
  return Intl.NumberFormat("th-TH", {
    currency: "THB",
  }).format(n);
};

function MenuPage() {
  const [userProfile, setUserProfile] = useState([]);

  const { setIsAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    getMe();
  }, []);

  const getMe = async () => {
    try {
      const meRes = await axios.get("/user/me");
      setUserProfile(meRes.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  // DEPOSIT
  const [deposit1000, setDeposit1000] = useState(0);
  const [deposit500, setDeposit500] = useState(0);
  const [deposit100, setDeposit100] = useState(0);

  const handler1000Change = (event) => {
    setDeposit1000(event.target.value);
  };

  const handler500Change = (event) => {
    setDeposit500(event.target.value);
  };
  const handler100Change = (event) => {
    setDeposit100(event.target.value);
  };

  const handlerSubmitDeposit = async (event) => {
    event.preventDefault();
    try {
      if (1000 * +deposit1000 + 500 * +deposit500 + 100 * +deposit100 === 0) {
        throw new Error("please insert bankNote you want to deposit");
      }

      if (+deposit1000 + +deposit500 + +deposit100 > 100) {
        throw new Error("can insert bankNote 100 per 1 transaction");
      }

      const depositRes = await axios.post("/transaction/deposit", {
        deposits: [
          { 1000: deposit1000 },
          { 500: deposit500 },
          { 100: deposit100 },
        ],
      });

      await Swal.fire({
        icon: "success",
        title: depositRes.data.message,
        text: `deposit value: ${toTHBFormat(+depositRes.data.deposits)} BATH`,
      });
      setDeposit1000(0);
      setDeposit500(0);
      setDeposit100(0);
    } catch (error) {
      console.log(error);
      setDeposit1000(0);
      setDeposit500(0);
      setDeposit100(0);
    }
  };

  return (
    <>
      <div className="user-navbar">
        <div className="user-detail">
          <h1>WELCOME "{userProfile.username}"</h1>
          <div className="user-detail-1">
            <h2>Your ID is "{userProfile.id}"</h2>
            <h2>
              Your Balance "{toTHBFormat(userProfile.currentBalance)}" BATH
            </h2>
          </div>
        </div>
        <div className="user-menu">
          <div className="user-menu-1">HISTORY</div>
          <div className="user-menu-2">DEPOSIT</div>
          <div className="user-menu-3">WITHDRAW</div>
          <div className="user-menu-4">TRANSFER</div>
          <div
            className="user-menu-5"
            onClick={() => {
              removeToken("token");
              setIsAuthenticated(false);
            }}
          >
            QUIT
          </div>
        </div>
      </div>
      {/* <UserHistory /> */}

      <div className="user-content">
        <div className="user-content-history">
          <h1>DEPOSIT</h1>
          {/* ไม่เกิน 20 ฉบับต่อครั้ง */}
          <hr />
          <div className="user-content-deposit-content">
            <form>
              <div className="user-content-deposit-content-money">
                <div>
                  <span>1,000 BATH</span>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    onKeyDown={(e) => {
                      e.preventDefault();
                    }}
                    value={deposit1000}
                    onChange={handler1000Change}
                  />
                </div>
                <div>
                  <span>500 BATH</span>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    onKeyDown={(e) => {
                      e.preventDefault();
                    }}
                    value={deposit500}
                    onChange={handler500Change}
                  />
                </div>
                <div>
                  <span>100 BATH</span>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    onKeyDown={(e) => {
                      e.preventDefault();
                    }}
                    value={deposit100}
                    onChange={handler100Change}
                  />
                </div>
              </div>
              <div className="user-content-deposit-content-money-footer">
                <h3>Total deposit money: {"sum_state_BATH"}</h3>
                <button onClick={handlerSubmitDeposit}>DEPOSIT</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="user-content">
        <div className="user-content-history">
          <h1>WITHDRAW</h1>
          <hr />
          <div className="user-content-deposit-content">
            <form>
              <div className="user-content-withdraw-content-money-footer">
                <div>
                  <span>WITHDRAW MONEY</span>
                  <input />
                </div>
                <button>WITHDRAW</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="user-content">
        <div className="user-content-history">
          <h1>TRANSFER</h1>
          <hr />
          <div className="user-content-transfer-content">
            <form>
              <div className="user-content-transfer-content-footer">
                <div>
                  <span>TRANSFER TO USER_ID</span>
                  <input />
                </div>
                <div>
                  <span>TRANSFER MONEY</span>
                  <input />
                </div>
                <button>TRANSFER</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default MenuPage;
