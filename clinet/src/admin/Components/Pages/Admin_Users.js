// import React, { useState } from "react";
// import Sidebar from "../Sidebar/Sidebar";
// import Navbar from "../Navbar/Navbar";
// import Requests from "../Assets/img/Icon (3).png";
// import Tours from "../Assets/img/Icon (7).png";
// import Revenue from "../Assets/img/Icon (5).png";
// import Vendors from "../Assets/img/Icon (9).png";
// import Table from "../Table/Table";
// import Footer from "../Footer/Footer";

// function Admin_Users() {
//   const [path, setPath] = useState("Admin_Users_details");
//   return (
//     <>
//       <div className="main">
//         <div className="sidebar">
//           <Sidebar />
//         </div>
//         <div className="dev-table">
//           <Navbar />
//           <div className="content-card">
//             <div className="row">
//               <div className="col-md-3">
//                 <div className="statistics">
//                   <img src={Tours} alt="Pending" />
//                   <div className="d-flex flex-column justify-content-center w-100">
//                     <h2>4</h2>
//                     <span>Tours of the day</span>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-md-3">
//                 <div className="statistics">
//                   <img src={Requests} alt="Requests" />
//                   <div className="d-flex flex-column justify-content-center w-100">
//                     <h2>24</h2>
//                     <span>Total Tours</span>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-md-3">
//                 <div className="statistics">
//                   <img src={Vendors} alt="Confirmed" />
//                   <div className="d-flex flex-column justify-content-center w-100">
//                     <h2>12</h2>
//                     <span>Number of Vendors</span>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-md-3">
//                 <div className="statistics">
//                   <img src={Revenue} alt="Rejected" />
//                   <div className="d-flex flex-column justify-content-center w-100">
//                     <h2>21</h2>
//                     <span>Cancelled </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <Table path={path} />
//           </div>
//           <Footer />
//         </div>
//       </div>
//     </>
//   );
// }

// export default Admin_Users;
import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import Requests from "../Assets/img/Icon (3).png";
import Tours from "../Assets/img/Icon (7).png";
import Revenue from "../Assets/img/Icon (5).png";
import Vendors from "../Assets/img/Icon (9).png";
import Table from "../Table/Table";
import Footer from "../Footer/Footer";
import { useQuery } from 'react-query';
import { getAllUsers } from '../../../services/apiservices/UserService';
import TableUsers from "./TableUsers";
import KeyTours from "../../../loadingspinner/KeyTours";

function Admin_Users() {
  const [path, setPath] = useState("Admin_Users_details");

  // Fetch all users using React Query
  const { data: usersData, isLoading, error } = useQuery('users', getAllUsers);

  if (isLoading) return <KeyTours/>;
  if (error) return <div>Error fetching users: {error.message}</div>;

  return (
    <>
      <div className="main">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="dev-table">
          <Navbar />
          <div className="content-card">
            <div className="row">
              <div className="col-md-3">
                <div className="statistics">
                  <img src={Tours} alt="Pending" />
                  <div className="d-flex flex-column justify-content-center w-100">
                    <h2>{usersData?.analysis?.counts}</h2>
                    <span>Total Users</span>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="statistics">
                  <img src={Requests} alt="Requests" />
                  <div className="d-flex flex-column justify-content-center w-100">
                    <h2>{usersData?.analysis?.pendingCount}</h2>
                    <span>Total UnVerified Users</span>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="statistics">
                  <img src={Vendors} alt="Confirmed" />
                  <div className="d-flex flex-column justify-content-center w-100">
                    <h2>{usersData?.analysis?.acceptedCount}</h2>
                    <span>Total Verified Users</span>
                  </div>
                </div>
              </div>
              {/* <div className="col-md-3">
                <div className="statistics">
                  <img src={Revenue} alt="Rejected" />
                  <div className="d-flex flex-column justify-content-center w-100">
                    <h2>21</h2>
                    <span>Cancelled</span>
                  </div>
                </div>
              </div> */}
            </div>
            <div className="table-card">
              {/* Pass the fetched users data to the Table component */}
              <TableUsers path={path} dataToDisplay={usersData?.data} />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Admin_Users;
