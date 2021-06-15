import React, { useState, useEffect } from "react";
import axios from "../../configs/axios";

import moment from "moment";

const toTHBFormat = (n) => {
  return Intl.NumberFormat("th-TH", {
    currency: "THB",
  }).format(n);
};

function UserHistory() {
  const [userTransaction, setUserTransaction] = useState([]);

  useEffect(() => {
    getMyTransaction();
  }, []);

  const getMyTransaction = async () => {
    try {
      const myTransactionRes = await axios.get("/transaction/user");
      setUserTransaction(myTransactionRes.data.userTransaction);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="user-content">
      <div className="user-content-history">
        <h1>HISTORY</h1>
        <hr />
        <div className="user-content-history-content">
          <table className="user-table-history">
            <tbody>
              <tr>
                <th width="12%">date</th>
                <th width="20%">transaction</th>
                <th width="17%">-</th>
                <th width="17%">+</th>
                <th width="17%">balance</th>
                <th width="17%"></th>
              </tr>
              {userTransaction.map((item, index) => {
                return (
                  <tr className="user-table-history-tr-2" key={item.id}>
                    <td>
                      {moment(item.createdAt).format("DD/MM/YYYY, HH:mm:ss")}
                    </td>
                    <td>{item.transactionType}</td>
                    <td>
                      {item.decrease === null
                        ? " "
                        : toTHBFormat(item.decrease)}
                    </td>
                    <td>
                      {item.increase === null
                        ? " "
                        : toTHBFormat(item.increase)}
                    </td>
                    <td>{toTHBFormat(item.balance)}</td>
                    <td>{item.description}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserHistory;
