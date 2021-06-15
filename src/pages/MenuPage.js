import React, { useContext, useEffect, useState } from "react";
import axios from "../configs/axios";
import { removeToken } from "../services/localStorageService";
import { AuthContext } from "../contexts/AuthContext";
import "./MenuPage.css";

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
                    max="20"
                    onKeyDown={(e) => {
                      e.preventDefault();
                    }}
                    defaultValue={deposit1000}
                    onChange={handler1000Change}
                  />
                </div>
                <div>
                  <span>500 BATH</span>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    onKeyDown={(e) => {
                      e.preventDefault();
                    }}
                    defaultValue={deposit500}
                    onChange={handler500Change}
                  />
                </div>
                <div>
                  <span>100 BATH</span>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    onKeyDown={(e) => {
                      e.preventDefault();
                    }}
                    defaultValue={deposit100}
                    onChange={handler100Change}
                  />
                </div>
              </div>
              <div className="user-content-deposit-content-money-footer">
                <h3>Total deposit money: {"sum_state_BATH"}</h3>
                <button>DEPOSIT</button>
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
