import React, { useContext, useEffect, useState } from "react";
import axios from "../../configs/axios";
import Swal from "sweetalert2";

const toTHBFormat = (n) => {
  return Intl.NumberFormat("th-TH", {
    currency: "THB",
  }).format(n);
};

function UserTransfer(props) {
  // TRANSFER
  const [inputTransfer, setInputTransfer] = useState({});

  const handlerInputTransferChange = (event) => {
    const { name, value } = event.target;
    setInputTransfer((prev) => ({ ...prev, [name]: value }));
  };

  const IsNumber = /^[0-9]*$/;

  const handlerSubmitTransfer = async (event) => {
    event.preventDefault();
    try {
      const { toUserId, transferValues } = inputTransfer;

      if (!toUserId || !toUserId.trim()) {
        throw new Error("toUserId is required");
      }
      if (+props.userProfile.id === +toUserId) {
        throw new Error("cannot transfer to yourself");
      }
      if (!transferValues || !transferValues.trim()) {
        throw new Error("transferValues is required");
      }
      if (transferValues <= 0) {
        throw new Error("transferValues must be int and > 0");
      }
      if (transferValues.split(".").length > 1) {
        if (transferValues.split(".").length > 2) {
          throw new Error("transferValues can have max 1 dot");
        }
        if (transferValues.split(".")[1].length > 2) {
          throw new Error("transferValues can have max 2 decimal");
        }
      }

      const transferRes = await axios.post("/transaction/transfer", {
        toUserId: toUserId,
        transferValues: transferValues,
      });

      props.getMe();

      await Swal.fire({
        icon: "success",
        title: transferRes.data.message,
        text: `transfer to user "${
          transferRes.data.toUser
        }" with amount ${toTHBFormat(transferRes.data.amount)} BATH`,
      });

      document.getElementById("toUserId").value = "";
      document.getElementById("transferValues").value = "";
    } catch (error) {
      console.log(error);
      document.getElementById("toUserId").value = "";
      document.getElementById("transferValues").value = "";
    }
  };

  return (
    <div className="user-content">
      <div className="user-content-history">
        <h1>TRANSFER</h1>
        <hr />
        <div className="user-content-transfer-content">
          <form>
            <div className="user-content-transfer-content-footer">
              <div>
                <span>TRANSFER TO USER_ID</span>
                <input
                  id="toUserId"
                  type="text"
                  placeholder="Insert userId"
                  name="toUserId"
                  onChange={handlerInputTransferChange}
                />
              </div>
              <div>
                <span>TRANSFER MONEY</span>
                <input
                  id="transferValues"
                  type="text"
                  placeholder="Insert transfer money"
                  name="transferValues"
                  onChange={handlerInputTransferChange}
                />
              </div>
              <button onClick={handlerSubmitTransfer}>TRANSFER</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserTransfer;
