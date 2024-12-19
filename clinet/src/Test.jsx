import React, { useState } from "react";
import axios from "axios";

function Test() {
  const [formData, setFormData] = useState({
    titleEn: "",
    titleAr: "",
    tourType: "single-day",
    briefEn: "",
    briefAr: "",
    cancellationPolicyEn: "",
    cancellationPolicyAr: "",
    availabilityFrom: "",
    availabilityTo: "",
    languages: [],
    privatePrice: 0,
    sharedPrice: 0,
  });
  const [image, setImage] = useState(null);
  const [imagesthubnails, setImageThumbnails] = useState([]);
  const [roomTypes, setRoomTypes] = useState([{ nameEn: "", netprice: 0, occupancyChildren: 0, occupancyAdult: 0 }]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleThumbnailsChange = (e) => {
    setImageThumbnails([...e.target.files]);
  };

  const handleRoomTypeChange = (index, e) => {
    const { name, value } = e.target;
    const newRoomTypes = [...roomTypes];
    newRoomTypes[index][name] = value;
    setRoomTypes(newRoomTypes);
  };

  const handleAddRoomType = () => {
    setRoomTypes([...roomTypes, { nameEn: "", netprice: 0, occupancyChildren: 0, occupancyAdult: 0 }]);
  };

  const handleRemoveRoomType = (index) => {
    const newRoomTypes = roomTypes.filter((_, i) => i !== index);
    setRoomTypes(newRoomTypes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tourData = new FormData();
    tourData.append("title.en", formData.titleEn);
    tourData.append("title.ar", formData.titleAr);
    tourData.append("tour_type", formData.tourType);
    tourData.append("brief.en", formData.briefEn);
    tourData.append("brief.ar", formData.briefAr);
    tourData.append("cancellation_policy.en", formData.cancellationPolicyEn);
    tourData.append("cancellation_policy.ar", formData.cancellationPolicyAr);
    tourData.append("availability.from", formData.availabilityFrom);
    tourData.append("availability.to", formData.availabilityTo);
    tourData.append("private", formData.privatePrice);
    tourData.append("shared", formData.sharedPrice);

    // Append languages
    formData.languages.forEach((lang) => {
      tourData.append("languages", lang);
    });

    // Append image and thumbnails
    if (image) {
      tourData.append("image", image);
    }
    imagesthubnails.forEach((thumbnail) => {
      tourData.append("imagesthubnails", thumbnail);
    });

    // Append room types
    roomTypes.forEach((roomType, index) => {
      tourData.append(`room_types[${index}].name.en`, roomType.nameEn);
      tourData.append(`room_types[${index}].netprice`, roomType.netprice);
      tourData.append(`room_types[${index}].occupancychildern`, roomType.occupancyChildren);
      tourData.append(`room_types[${index}].occupancyadult`, roomType.occupancyAdult);
    });

    try {
      const response = await axios.post("http://localhost:5000/api/tours", tourData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Tour posted successfully:", response.data);
    } catch (error) {
      console.error("Error posting tour:", error);
    }
  };

  return (
    <div className="App">
      <h2>Create Tour</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title (English):</label>
          <input type="text" name="titleEn" value={formData.titleEn} onChange={handleInputChange} required />
        </div>

        <div>
          <label>Title (Arabic):</label>
          <input type="text" name="titleAr" value={formData.titleAr} onChange={handleInputChange} />
        </div>

        <div>
          <label>Tour Type:</label>
          <select name="tourType" value={formData.tourType} onChange={handleInputChange}>
            <option value="single-day">Single-day</option>
            <option value="multi-day">Multi-day</option>
            <option value="activity">Activity</option>
            <option value="transfer">Transfer</option>
          </select>
        </div>

        <div>
          <label>Brief (English):</label>
          <textarea name="briefEn" value={formData.briefEn} onChange={handleInputChange} required></textarea>
        </div>

        <div>
          <label>Brief (Arabic):</label>
          <textarea name="briefAr" value={formData.briefAr} onChange={handleInputChange}></textarea>
        </div>

        <div>
          <label>Cancellation Policy (English):</label>
          <textarea name="cancellationPolicyEn" value={formData.cancellationPolicyEn} onChange={handleInputChange} required></textarea>
        </div>

        <div>
          <label>Cancellation Policy (Arabic):</label>
          <textarea name="cancellationPolicyAr" value={formData.cancellationPolicyAr} onChange={handleInputChange}></textarea>
        </div>

        <div>
          <label>Availability From:</label>
          <input type="date" name="availabilityFrom" value={formData.availabilityFrom} onChange={handleInputChange} required />
        </div>

        <div>
          <label>Availability To:</label>
          <input type="date" name="availabilityTo" value={formData.availabilityTo} onChange={handleInputChange} required />
        </div>

        <div>
          <label>Main Image:</label>
          <input type="file" accept="image/*" onChange={handleFileChange} required />
        </div>

        <div>
          <label>Thumbnail Images:</label>
          <input type="file" accept="image/*" multiple onChange={handleThumbnailsChange} required />
        </div>

        <div>
          <label>Private Price:</label>
          <input type="number" name="privatePrice" value={formData.privatePrice} onChange={handleInputChange} required />
        </div>

        <div>
          <label>Shared Price:</label>
          <input type="number" name="sharedPrice" value={formData.sharedPrice} onChange={handleInputChange} required />
        </div>

        <div>
          <h3>Room Types:</h3>
          {roomTypes.map((roomType, index) => (
            <div key={index}>
              <label>Room Name (English):</label>
              <input
                type="text"
                name="nameEn"
                value={roomType.nameEn}
                onChange={(e) => handleRoomTypeChange(index, e)}
                required
              />
              <label>Net Price:</label>
              <input
                type="number"
                name="netprice"
                value={roomType.netprice}
                onChange={(e) => handleRoomTypeChange(index, e)}
                required
              />
              <label>Occupancy (Children):</label>
              <input
                type="number"
                name="occupancyChildren"
                value={roomType.occupancyChildren}
                onChange={(e) => handleRoomTypeChange(index, e)}
                required
              />
              <label>Occupancy (Adults):</label>
              <input
                type="number"
                name="occupancyAdult"
                value={roomType.occupancyAdult}
                onChange={(e) => handleRoomTypeChange(index, e)}
                required
              />
              <button type="button" onClick={() => handleRemoveRoomType(index)}>Remove Room Type</button>
            </div>
          ))}
          <button type="button" onClick={handleAddRoomType}>Add Room Type</button>
        </div>

        <button type="submit">Submit Tour</button>
      </form>
    </div>
  );
}

export default Test;
