import React, { useEffect, useState } from 'react';
import BASE_URL from '../../../services/api'
import Cookies from 'js-cookie';
import { Alert, Form } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { Editor } from "primereact/editor";

const PrivacyComponent = () => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const token = Cookies.get('token');
    
  const getData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/app-settings`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            role: 'admin',
          },
        }
      );
      setFormData(response.data.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const [formData, setFormData] = useState({
    email: data?.email || "",  // Set initial value from User or empty string
    privacyPolicy: {
      en: data?.privacyPolicy?.en || "",  // Initialize 'en' and 'ar'
      ar: data?.privacyPolicy?.ar || "",
    },
  });
  
  const handleEditorChange = (lang, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      privacyPolicy: {
        ...prevFormData.privacyPolicy,
        [lang]: value,  // Update the 'en' or 'ar' field dynamically
      },
    }));
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value, // Update the appropriate field (email, name, etc.)
    }));
  };
  
  const editUser = async () => {
    // Log the formData to verify it's correctly set
    console.log(formData);
  
    // Check if required fields are present
    if (!formData.email || !formData.privacyPolicy.en || !formData.privacyPolicy.ar) {
      Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "Please fill out all required fields.",
      });
      return; // Exit if any required fields are missing
    }
  
    try {
      const response = await axios.post(
        `${BASE_URL}/api/app-settings`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            role: "admin",
          },
        }
      );
  
      getData(); // Refresh data after successful update
      Swal.fire({
        icon: "success",
        title: "Update Successfully",
        text: "",
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
      console.error("Error updating:", error);
    }
  };
  
    
    useEffect(() => {
        getData()
    }, []);

  return (
    <>
        <div className="text-editor">
            <h2>Privacy Policy</h2>
            <Editor
  value={formData.privacyPolicy.en || ""}  // Default to an empty string if 'en' is undefined
  name="en"
  onEditorChange={(newValue) => handleEditorChange("en", newValue)} 
                style={{ height: "320px" }}
            />
            <div className="mt-5">
                <a className="save" onClick={(e) => {editUser()}}>Save</a>
            </div>
        </div>
    </>
  );
};

export default PrivacyComponent;
