import React, { useState, useEffect } from "react";
import "../Assets/Css/Table.css";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

function TableBooking({ path, dataToDisplay }) {
  const navigate = useNavigate();

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            {/* <th>Tour ID</th> */}
            <th>Payment Status</th>
            {/* <th>Destination</th> */}
            {/* <th>Vendor</th> */}
            <th>Date</th>
            <th>Username</th>
            <th>total Price</th>
            {/* <th>No. of Pax</th> */}
          </tr>
        </thead>
        <tbody>
          {dataToDisplay?.map((user, index) => (
            <tr key={index}>
              <td onClick={() => navigate(`/${path}/${user._id}`)}>
                {user._id}
              </td>
              {/* <td>{user?.tour?.id}</td> */}
              <td className={user?.paymentStatus == "unpaid" ? "unpaid" : "paid"}>{user?.paymentStatus}</td>
              {/* <td>{user?.tour?.destination?.country?.en}</td> */}
              {/* <td>{user?.vendor?.name}</td> */}
              <td>{user?.bookingDate}</td>
              <td>{user?.user?.name}</td>
              <td>{user?.totalPrice}</td>
              {/* <td>{user?.numberOfAdults}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default TableBooking;
