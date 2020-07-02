import React, { memo } from "react";
import "./Transactions.css";

function Transactions({ transactionData }) {
  return (
    <div className="transaction_main_div">
      <div className="profile_heading">Transaction details</div>
      <div className="profile_description">
        <div className="profile_description_text">
          Your financial transaction details are displayed here.
        </div>
        <i className="fas fa-info-circle profile_description_info_icon"></i>
      </div>
      <div className="transaction_details_data">
        {transactionData.map((transaction) => (
          <div key={transaction.id} className="individual_transaction">
            <div>{transaction.id}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(Transactions);
