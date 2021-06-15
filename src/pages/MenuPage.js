import React from "react";
import "./MenuPage.css";

function MenuPage() {
  return (
    <>
      <div className="user-navbar">
        <div className="user-detail">
          <h1>WELCOME "user_username"</h1>
          <div className="user-detail-1">
            <h2>Your ID is "user_id"</h2>
            <h2>Your Balance "user_balance"</h2>
          </div>
        </div>
        <div className="user-menu">
          <div className="user-menu-1">HISTORY</div>
          <div className="user-menu-2">DEPOSIT</div>
          <div className="user-menu-3">WITHDRAW</div>
          <div className="user-menu-4">TRANSFER</div>
          <div className="user-menu-5">QUIT</div>
        </div>
      </div>
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
                <tr className="user-table-history-tr-2">
                  <td>01/06/2021 17:56:30</td>
                  <td>ฝาก</td>
                  <td>5,000.00</td>
                  <td>5,000.00</td>
                  <td>6,801.02</td>
                  <td>ธนาคารทางโทรศัพท์มือถือ KMP22965</td>
                  <td></td>
                </tr>
                <tr className="user-table-history-tr-2">
                  <td>01/06/2021 17:56:30</td>
                  <td>ฝาก</td>
                  <td>5,000.00</td>
                  <td>5,000.00</td>
                  <td>6,801.02</td>
                  <td>ธนาคารทางโทรศัพท์มือถือ KMP22965</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

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
