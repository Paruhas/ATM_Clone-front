import React, { useContext, useEffect, useState } from "react";
import axios from "../configs/axios";
import { removeToken } from "../services/localStorageService";
import { AuthContext } from "../contexts/AuthContext";
import "./MenuPage.css";
import Swal from "sweetalert2";

import UserHistory from "../components/MenuPage/UserHistory";
import UserDeposit from "../components/MenuPage/UserDeposit";
import UserWithdraw from "../components/MenuPage/UserWithdraw";
import UserTransfer from "../components/MenuPage/UserTransfer";

const toTHBFormat = (n) => {
  return Intl.NumberFormat("th-TH", {
    currency: "THB",
  }).format(n);
};

function MenuPage() {
  const [userProfile, setUserProfile] = useState([]);
  const [renderMenu, setRenderMenu] = useState({
    renderHISTORY: false,
    renderDEPOSIT: false,
    renderWITHDRAW: false,
    renderTRANSFER: false,
  });

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

  const handlerLogout = async () => {
    const isLogout = await Swal.fire({
      icon: "question",
      title: "You want to logout?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    });

    if (isLogout.isConfirmed === true) {
      removeToken("token");
      setIsAuthenticated(false);
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
          <div
            className="user-menu-1"
            onClick={() =>
              setRenderMenu({
                renderHISTORY: true,
                renderDEPOSIT: false,
                renderWITHDRAW: false,
                renderTRANSFER: false,
              })
            }
          >
            HISTORY
          </div>
          <div
            className="user-menu-2"
            onClick={() =>
              setRenderMenu({
                renderHISTORY: false,
                renderDEPOSIT: true,
                renderWITHDRAW: false,
                renderTRANSFER: false,
              })
            }
          >
            DEPOSIT
          </div>
          <div
            className="user-menu-3"
            onClick={() =>
              setRenderMenu({
                renderHISTORY: false,
                renderDEPOSIT: false,
                renderWITHDRAW: true,
                renderTRANSFER: false,
              })
            }
          >
            WITHDRAW
          </div>
          <div
            className="user-menu-4"
            onClick={() =>
              setRenderMenu({
                renderHISTORY: false,
                renderDEPOSIT: false,
                renderWITHDRAW: false,
                renderTRANSFER: true,
              })
            }
          >
            TRANSFER
          </div>
          <div className="user-menu-5" onClick={handlerLogout}>
            QUIT
          </div>
        </div>
      </div>
      {renderMenu.renderHISTORY && <UserHistory getMe={getMe} />}
      {renderMenu.renderDEPOSIT && <UserDeposit getMe={getMe} />}
      {renderMenu.renderWITHDRAW && <UserWithdraw getMe={getMe} />}
      {renderMenu.renderTRANSFER && (
        <UserTransfer getMe={getMe} userProfile={userProfile} />
      )}
    </>
  );
}

export default MenuPage;
