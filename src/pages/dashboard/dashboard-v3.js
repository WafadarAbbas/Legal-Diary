import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap-daterangepicker/daterangepicker.css";
import "font-awesome/css/font-awesome.min.css"; // Import Font Awesome CSS
import ApiCall from "../../Apicall/ApiCall";

function DashboardV3() {
  const [totalCountOfficers, setTotalCountOfficers] = useState(0);  
  const [totalCountBranches, setTotalCountBranches] = useState(0);  
  const [totalCountDesignations, setTotalCountDesignations] = useState(0);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null); 
  useEffect(() => {
    const fetchPresidingOfficers = async () => {
      try {
        const response = await ApiCall({
          url: "https://localhost:44311/api/services/app/PresidingOfficer/GetAll",
          method: "GET",
        });

        if (response?.data?.result) {
          setTotalCountOfficers(response.data.result.totalCount); 
        } else {
          throw new Error("No presiding officer data found");
        }
      } catch (error) {
        console.error("Error fetching presiding officers:", error);
        setError("Failed to fetch presiding officers");
      } finally {
        setLoading(false);  
      }
    };

    const fetchBranches = async () => {
      try {
        const response = await ApiCall({
          url: "https://localhost:44311/api/services/app/Branch/GetAll",
          method: "GET",
        });

        if (response?.data?.result) {
          setTotalCountBranches(response.data.result.totalCount); 
        } else {
          throw new Error("No branch data found");
        }
      } catch (error) {
        console.error("Error fetching branches:", error);
        setError("Failed to fetch branches");
      } finally {
        setLoading(false);  
      }
    };

    const fetchDesignations = async () => {
      try {
        const response = await ApiCall({
          url: "https://localhost:44311/api/services/app/Designation/GetAll",
          method: "GET",
        });

        if (response?.data?.result) {
          setTotalCountDesignations(response.data.result.totalCount);  
        } else {
          throw new Error("No designation data found");
        }
      } catch (error) {
        console.error("Error fetching designations:", error);
        setError("Failed to fetch designations");
      } finally {
        setLoading(false);  
      }
    };

    fetchPresidingOfficers(); 
    fetchBranches();  
    fetchDesignations();  
  }, []); 

  return (
    <div>
      <ol className="breadcrumb float-xl-end">
        <li className="breadcrumb-item">
          <Link to="/dashboard/v3">Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to="/dashboard/v3">Dashboard</Link>
        </li>
        <li className="breadcrumb-item active">Dashboard v3</li>
      </ol>
      <h1 className="page-header mb-3">Dashboard v3</h1>

      <div className="row">
        
        <div className="col-xl-4">
          <div
            className="card border-0 mb-3 overflow-hidden text-black"
            style={{
              paddingLeft: 10,
              paddingTop: 5,
              paddingBottom: 5,
              borderRadius: 10,
            }}
          >
            <div className="d-flex">
              <div
                style={{
                  backgroundColor: "#17a2b8",
                  padding: 40,
                  borderRadius: 10,
                }}
              >
                <i
                  className="fa fa-user-tie fa-3x text-white"
                  aria-hidden="true"
                ></i>
              </div>

              <div className="d-flex flex-column ms-3">
                <h4 style={{ marginTop: 5 }}>Total Presiding Officers</h4>
                <h5 style={{ marginTop: 10, color: "grey" }}>
                  <strong style={{ color: "black", fontSize: 18 }}>
                    {totalCountOfficers}{" "}
                  </strong>
                  Officers
                </h5>
              </div>
            </div>
          </div>
        </div>

  
        <div className="col-xl-4">
          <div
            className="card border-0 mb-3 overflow-hidden text-black"
            style={{
              paddingLeft: 10,
              paddingTop: 5,
              paddingBottom: 5,
              borderRadius: 10,
            }}
          >
            <div className="d-flex">
              <div
                style={{
                  backgroundColor: "#28a745",
                  padding: 40,
                  borderRadius: 10,
                }}
              >
                <i
                  className="fa fa-building fa-3x text-white"
                  aria-hidden="true"
                ></i>
              </div>

              <div className="d-flex flex-column ms-3">
                <h4 style={{ marginTop: 5 }}>Total Branches</h4>
                <h5 style={{ marginTop: 10, color: "grey" }}>
                  <strong style={{ color: "black", fontSize: 18 }}>
                    {totalCountBranches}{" "}
                  </strong>
                  Branches
                </h5>
              </div>
            </div>
          </div>
        </div>

 
        <div className="col-xl-4">
          <div
            className="card border-0 mb-3 overflow-hidden text-black"
            style={{
              paddingLeft: 10,
              paddingTop: 5,
              paddingBottom: 5,
              borderRadius: 10,
            }}
          >
            <div className="d-flex">
              <div
                style={{
                  backgroundColor: "#ff6347",
                  padding: 40,
                  borderRadius: 10,
                }}
              >
                <i
                  className="fa fa-id-badge fa-3x text-white"
                  aria-hidden="true"
                ></i>
              </div>

              <div className="d-flex flex-column ms-3">
                <h4 style={{ marginTop: 5 }}>Total Designations</h4>
                <h5 style={{ marginTop: 10, color: "grey" }}>
                  <strong style={{ color: "black", fontSize: 18 }}>
                    {totalCountDesignations}{" "}
                  </strong>
                  Designations
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardV3;

