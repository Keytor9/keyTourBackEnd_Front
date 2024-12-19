// import React, { useState } from "react";
// import Sidebar from "../Sidebar/Sidebar";
// import Navbar from "../Navbar/Navbar";
// import Requests from "../Assets/img/Icon (3).png";
// import Tours from "../Assets/img/Icon (7).png";
// import Revenue from "../Assets/img/Icon (5).png";
// import Vendors from "../Assets/img/Icon (9).png";
// import Table from "../Table/Table";
// import Footer from "../Footer/Footer";

// function Admin_Vendors() {
//   const [path, setPath] = useState("Admin_Vendors_details");
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

// export default Admin_Vendors;
import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useQuery } from 'react-query';
import { getVendors } from '../../../services/apiservices/VendorService';
import Table from "../Table/Table";
import Footer from "../Footer/Footer";
import Requests from "../Assets/img/Icon (3).png";
import Tours from "../Assets/img/Icon (7).png";
import Revenue from "../Assets/img/Icon (5).png";
import Vendors from "../Assets/img/Icon (9).png";
import KeyTours from "../../../loadingspinner/KeyTours"; // Assume loading spinner component
import TableVendor from "./TableVendor";
import Api from '../../../services/api'

function Admin_Vendors() {
  const [path, setPath] = useState("Admin_Vendors_details");

  // Fetch vendors with React Query
  const { data: vendors, isLoading, error } = useQuery('vendors', getVendors);
console.log(vendors)
  if (isLoading) return <KeyTours />;
  if (error) return <p>Error fetching vendors: {error.message}</p>;

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
                    <h2>{vendors?.analysis?.results}</h2>
                    <span>Number of vendor  </span>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="statistics">
                  <img src={Requests} alt="Requests" />
                  <div className="d-flex flex-column justify-content-center w-100">
                  <h2>{vendors?.analysis?.pendingCount}</h2>
                  <span> Pending vendor  </span>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="statistics">
                  <img src={Vendors} alt="Confirmed" />
                  <div className="d-flex flex-column justify-content-center w-100">
                  <h2>{vendors?.analysis?.acceptedCount}</h2>
                  <span> Accepted vendor  </span>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="statistics">
                  <img src={Revenue} alt="Rejected" />
                  <div className="d-flex flex-column justify-content-center w-100">
                  <h2>{vendors?.analysis?.rejectedCount}</h2>
                  <span> Regected vendor  </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="table-card">

            <TableVendor path={path} dataToDisplay={vendors.data} />
            </div>
            {/* Passing vendor data to the Table component */}
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Admin_Vendors;
