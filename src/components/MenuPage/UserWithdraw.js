import React, { useState } from "react";
import axios from "../../configs/axios";
import Swal from "sweetalert2";

function UserWithdraw() {
  // WITHDRAW
  const [withdrawValues, setWithdrawValues] = useState({});

  const handlerInputWithdrawChange = (event) => {
    const { name, value } = event.target;
    setWithdrawValues((prev) => ({ ...prev, [name]: value }));
  };

  const IsNumber = /^[0-9]*$/;

  const handlerSubmitWithdraw = async (event) => {
    event.preventDefault();
    try {
      const { withdraw } = withdrawValues;

      if (!IsNumber.test(withdraw)) {
        throw new Error("withdraw money must be only digit");
      }
      if (withdraw % 100) {
        throw new Error("cannot withdraw this moneyValues");
      }

      const withdrawRes = await axios.post("/transaction/withdraw", {
        withdraw: withdraw,
      });

      await Swal.fire({
        icon: "success",
        title: withdrawRes.data.message,
        text: `get bankNote 1,0000=${withdrawRes.data.countCash_1000} | 500=${withdrawRes.data.countCash_500} | 100=${withdrawRes.data.countCash_100}`,
      });

      document.getElementById("withdraw").value = "";
    } catch (error) {
      console.log(error);
      document.getElementById("withdraw").value = "";
    }
  };

  return (
    <div className="user-content">
      <div className="user-content-history">
        <h1>WITHDRAW</h1>
        <hr />
        <div className="user-content-deposit-content">
          <form>
            <div className="user-content-withdraw-content-money-footer">
              <div>
                <span>WITHDRAW MONEY</span>
                <input
                  id="withdraw"
                  type="text"
                  placeholder="Insert withdraw money"
                  name="withdraw"
                  onChange={handlerInputWithdrawChange}
                />
              </div>
              <button onClick={handlerSubmitWithdraw}>WITHDRAW</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserWithdraw;
