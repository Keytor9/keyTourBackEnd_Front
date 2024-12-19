import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { createTour, getAllDestinations } from '../../../services/apiservices/DestinationService';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import '../Assets/Css/Web.css';
const predefinedRoomTypes = [
    { name: 'Single', adults: 1, children: 0, price: 0 },
    { name: 'Double', adults: 2, children: 0, price: 0 },
    { name: 'Triple', adults: 3, children: 0, price: 0 },
    { name: 'Single+Child', adults: 1, children: 1, price: 0 },
    { name: 'Double+Child', adults: 2, children: 1, price: 0 },
    { name: 'Triple+Child', adults: 3, children: 1, price: 0 },
];
function Add_Tour() {
    const [formData, setFormData] = useState({
        title_en: '',
        shared: '', // Initialize shared value
        private: '', // Initialize private value
    
        destination: '',
        tour_type: 'select',
        brief_en: '',
        brief_ar: '',
        availability_from: '',
        availability_to: '',
        offDays: [],
        programdays: 0,
        program: [],
        languages: [],
        image: [],
        room_types: [
            {
                name: { en: '' },
                netprice: 0,
                occupancychildern: 0,
                occupancyadult: 0
            }
        ],
        includesen: '',
        includesar: '',
        discounts: [  // Initialize discounts with an empty array or an initial discount object
            {
                min_users: 0,
                discount_percentage: 0
            }
        ],

        excludesen: '',
        excludesar: '',
        cancellation_policy_en: '',
        // cancellation_policy_ar: '',
    });

    const [selectedImages, setSelectedImages] = useState([]);
    const queryClient = useQueryClient();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log(name , value);
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedImages(files);
        setFormData({ ...formData, image: files });
    };

 // Function to add a new room type
const addRoomType = () => {
    setFormData((prevFormData) => ({
        ...prevFormData,
        room_types: [
            ...prevFormData.room_types,
            {
                name: { en: '' },
                price: 0,
                netprice: 0,
                occupancychildern: 0,
                occupancyadult: 0,
            },
        ],
    }));
};

// Function to remove a room type by index
const removeRoomType = (index) => {
    const updatedRoomTypes = formData.room_types.filter((_, i) => i !== index);
    setFormData({ ...formData, room_types: updatedRoomTypes });
};
const handleOffDaysChange = (e) => {
    const newOffDay = e.target.value;

    // Ensure the off day is valid and within the availability period
    if (newOffDay >= formData.availability_from && newOffDay <= formData.availability_to) {
        setFormData((prevFormData) => ({
            ...prevFormData,
            offDays: [...prevFormData.offDays, newOffDay],
        }));
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Off Day',
            text: 'Off day must be within the availability period.',
        });
    }
};


    const handleProgramChange = (index, language, value) => {
        const newProgram = [...formData.program];
        if (!newProgram[index]) {
            newProgram[index] = { day: index + 1, details: { en: '', ar: '' }, inclusions: '', exclusions: '' };
        }
        newProgram[index].details[language] = value;
        setFormData({ ...formData, program: newProgram });
    };

    useEffect(() => {
        const programArray = Array.from({ length: formData.programdays }, (_, index) => ({
            day: index + 1,
            details: { en: '', ar: '' },
            inclusions: '',
            exclusions: ''
        }));
        setFormData({ ...formData, program: programArray });
    }, [formData.programdays]);

    const { data: destinations, isLoading } = useQuery('destinations', getAllDestinations);



    const mutation = useMutation(createTour, {
        onSuccess: () => {
          queryClient.invalidateQueries('tours');
      
          // Show success message
          Swal.fire({
            icon: 'success',
            title: 'Tour added successfully',
            timer: 1500,
            showConfirmButton: false,
          }).then(() => {
            // Reload the page after success
            window.location.reload();
          });
        },
        onError: (error) => {
          // Check if the error is a validation error (status 400)
          if (error.response && error.response.status === 400) {
            const errors = error.response.data.errors;
      console.log(errors)
            // Construct a message from the validation errors
            let errorMessage = '\n';
            errors.forEach((err) => {
              errorMessage += `${err.field}: ${err.message}\n`;
            });
      
            // Display the errors using Swal
            Swal.fire({
              icon: 'error',
              title: 'Oops... Validation Error',
              text: errorMessage,
              confirmButtonText: 'OK',
            });
          } else {
            // Handle other types of errors (e.g., network or server errors)
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error.message || 'Something went wrong!',
            });
          }
        },
      });
      
    

  



    const filterRoomTypes = (roomTypes) => {
      const filteredRoomTypes = {};
      Object.keys(roomTypes).forEach((key) => {
          const room = roomTypes[key];
          const hasValue = room.shared || room.private; // Only include if either shared or private has a value
          if (hasValue) {
              filteredRoomTypes[key] = room;
          }
      });
      return filteredRoomTypes;
  };



const handleRoomTypeChange = (index, field, event) => {
    console.log(field)
    const { value } = event.target; // Ensure we're accessing the value from the event correctly
    const updatedRoomTypes = [...formData.room_types];

    if (field === 'name.en') {
        updatedRoomTypes[index].name.en = value;
    } else {
        updatedRoomTypes[index][field] = value;
    }

    setFormData((prevFormData) => ({
        ...prevFormData,
        room_types: updatedRoomTypes,
    }));
};

useEffect(() => {
    if (formData.tour_type === 'single-day') {
        setFormData((prevFormData) => ({
            ...prevFormData,
            room_types: [
                { name: { en: 'adult' }, netprice: 0, occupancychildern: 1, occupancyadult: 1 },
                { name: { en: 'children' }, netprice: 0, occupancychildern: 1, occupancyadult: 1 }
            ],
        }));
    }
}, [formData.tour_type]);

    const addTour = (e) => {
      e.preventDefault();
      let vendorData = Cookies.get('uservendor') ? JSON.parse(Cookies.get('uservendor')) : null;
      console.log(vendorData._id);

      if (vendorData) {
          // Create FormData object to handle file uploads and form submission
          const formdata = new FormData();
          formdata.append('title', formData.title_en);
        //   formdata.append('title[ar]', formData.title_ar);
          formdata.append('destination', formData.destination);
        //   formdata.append('destination', );
          formdata.append('tour_type', formData.tour_type);
          formdata.append('brief', formData.brief_en);
        //   formdata.append('brief[ar]', formData.brief_ar);
          formdata.append('cancellation_policy', formData.cancellation_policy_en);
        //   formdata.append('cancellation_policy[ar]', formData.cancellation_policy_ar);
          formdata.append('availability[from]', formData.availability_from);
          formdata.append('availability[to]', formData.availability_to);
        //   formdata.append('includes[0][ar]', formData.includesar);
          formdata.append('includes[0]', formData.includesen);
        //   formdata.append('excludes[0][ar]', formData.excludesar);
          formdata.append('excludes[0]', formData.excludesen);
          formData.languages.forEach((language,i) => {
            formdata.append(`languages[${i}]`, language);
        });

        formData.discounts.forEach((discount, index) => {
            formdata.append(`discounts[${index}][min_users]`, discount.min_users);
            formdata.append(`discounts[${index}][discount_percentage]`, discount.discount_percentage);
        });


          formdata.append('programdays', formData.programdays);

          formData.languages.forEach((lang) => {
              formdata.append('languages[]', lang);
          });

          formData.program.forEach((programItem, index) => {
              formdata.append(`program[${index}][day]`, programItem.day);
              formdata.append(`program[${index}][details]`, programItem.details.en);
            //   formdata.append(`program[${index}][details][ar]`, programItem.details.ar);
              formdata.append(`program[${index}][inclusions]`, programItem.inclusions);
              formdata.append(`program[${index}][exclusions]`, programItem.exclusions);
          });

          // Filter room types to include only the ones with values
          formData.room_types.forEach((roomType, index) => {
            formdata.append(`room_types[${index}][name]`, roomType.name.en);
            formdata.append(`room_types[${index}][netprice]`, roomType.netprice);
            formdata.append(`room_types[${index}][occupancychildern]`, roomType.occupancychildern);
            formdata.append(`room_types[${index}][occupancyadult]`, roomType.occupancyadult);
        });

          // Append images
          selectedImages.forEach((image, index) => {
              formdata.append('image', image);
          });
          if (formData.shared) {
            formdata.append('shared', formData.shared);
        }

        if (formData.private) {
            formdata.append('private', formData.private);
        }
          formdata.append('vendor', vendorData._id);
          // formdata.append('destination', formData.destination);
          formData.offDays.forEach((offDay, index) => {
            formdata.append(`availability[offDays][${index}]`, offDay);
        });

          // Perform mutation
          mutation.mutate(formdata);
      } else {
          Swal.fire('Error', 'Vendor ID not found in cookies', 'error');
      }
  };


  const handleLanguageChange = (language) => {
    setFormData((prevData) => {
      const isSelected = prevData.languages.includes(language);
      const updatedLanguages = isSelected
        ? prevData.languages.filter((lang) => lang !== language)
        : [...prevData.languages, language];

        
//     const selectedLanguages = Array.from(e.target.selectedOptions, (option) => option.value);
//     setFormData({ ...formData, languages: selectedLanguages });
  
      return { ...prevData, languages: updatedLanguages };
    });
    
  };

//   const handleLanguageChange = (e) => {
//     const selectedLanguages = Array.from(e.target.selectedOptions, (option) => option.value);
//     setFormData({ ...formData, languages: selectedLanguages });
// };

const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};
// Function to handle discount changes
const handleDiscountChange = (index, field, value) => {
    const updatedDiscounts = [...formData.discounts];
    updatedDiscounts[index][field] = value;

    setFormData({
        ...formData,
        discounts: updatedDiscounts,
    });
};
const addDiscount = () => {
    setFormData((prevFormData) => ({
        ...prevFormData,
        discounts: [
            ...prevFormData.discounts,
            { min_users: 0, discount_percentage: 0 }
        ]
    }));
};

// Function to remove a discount entry by index
const removeDiscount = (index) => {
    const updatedDiscounts = formData.discounts.filter((_, i) => i !== index);
    setFormData({
        ...formData,
        discounts: updatedDiscounts
    });

    // Optionally, recalculate the price after discount
    // updatePriceAfterDiscount();
};
const getDiscountedPrice = (discountPercentage, originalPrice) => {
    return originalPrice - (originalPrice * discountPercentage / 100);
};
    return (
        <div className="main">
            <div className="sidebar">
                <Sidebar />
            </div>
            <div className="dev-table">
                <Navbar />
                <div className="content-card">
                    <div className="requests">
                        <h2 className="mb-5">
                            Dashboard / <span>Add new tour</span>
                        </h2>
                        <form className='add-new-tour'>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Tour title </label>
                                        <input
                                            type="text"
                                            name="title_en"
                                            className="form-control"
                                            placeholder="Title En"
                                            value={formData.title_en}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    {/* <div className="form-group">
                                        <label>Tour title Ar</label>
                                        <input
                                            type="text"
                                            name="title_ar"
                                            className="form-control"
                                            placeholder="Title Ar"
                                            value={formData.title_ar}
                                            onChange={handleChange}
                                        />
                                    </div> */}
                                    <div className="form-group">
                                        <label>Destination</label>
                                        <select
                                            name="destination"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={formData.destination}
                                        >
                                            <option>select</option>
                                            {isLoading ? (
                                                <option>Loading...</option>
                                            ) : (
                                                destinations?.data?.map((destination) => (
                                                    <option key={destination._id} value={destination._id}>
                                                        {destination?.country?.en}
                                                    </option>
                                                ))
                                            )}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Tour Type</label>
                                        <select
                                            onChange={handleChange}
                                            name="tour_type"
                                            className="form-control"
                                            value={formData.tour_type}
                                        >
                                            <option value="">Select</option>

                                            <option value="single-day">Single Day</option>

                                            <option value="multi-day">Multi-Day</option>
                                            <option value="activity">Activity</option>
                                            <option value="transfer">Transfer</option>
                                        </select>
                                    </div>
                                    {formData.tour_type !== "selected" && (
                                        <div className="form-group">
                                            <label>Program Days</label>
                                            <input
                                                type="number"
                                                name="programdays"
                                                className="form-control"
                                                onChange={handleChange}
                                                value={formData.programdays}
                                            />
                                        </div>
                                    )}
                                    {formData.programdays > 0 &&
                                        formData.program.map((_, index) => (
                                            <div key={index} className="form-group">
                                                <label>Day {index + 1} Details </label>
                                                <textarea
                                                    className="form-control"
                                                    onChange={(e) => handleProgramChange(index, "en", e.target.value)}
                                                ></textarea>
                                                {/* <label>Day {index + 1} Details (Ar)</label>
                                                <textarea
                                                    className="form-control"
                                                    onChange={(e) => handleProgramChange(index, "ar", e.target.value)}
                                                ></textarea> */}
                                            </div>
                                        ))}
                                </div>
                                <div className="col-md-6">
                                    <label>Tour Images</label>
                                    <input
                                        id="image"
                                        className="file"
                                        type="file"
                                        name="image"
                                        multiple
                                        onChange={handleFileChange}
                                    />
                                    {selectedImages.length > 0 && (
                                        <div className="image-preview">
                                            {selectedImages.map((img, idx) => (
                                                <img key={idx} src={URL.createObjectURL(img)} alt="preview" width="100" />
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className='col-md-12'>
                                    <div className="form-group">
                                        <label>Brief </label>
                                        <textarea
                                            name="brief_en"
                                            className="form-control"
                                            value={formData.brief_en}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className="form-group">
                                        <label>Includes</label>
                                        <textarea
                                            name="includesen"
                                            className="form-control"
                                            value={formData.includesen}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className="form-group">
                                        <label>Excludes</label>
                                        <textarea
                                            name="excludesen"
                                            className="form-control"
                                            value={formData.excludesen}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className="form-group">
                                        <label>Cancellation Policy</label>
                                        <textarea
                                            name="cancellation_policy_en"
                                            className="form-control"
                                            value={formData.cancellation_policy_en}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                <div className="form-group">
                                    <label>Select Languages:</label>
                                    <div className="custom-select-dropdown">
                                    {["English", "Arabic", "French", "Spanish", "German"].map((language) => (
                                        <label key={language} className="dropdown-item">
                                        <input
                                            type="checkbox"
                                            value={language}
                                            checked={formData.languages.includes(language)}
                                            onChange={() => handleLanguageChange(language)}
                                        />
                                        {language}
                                        </label>
                                    ))}
                                    </div>
                                </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-3 border border-top-0 border-start-0 border-bottom-0'>
                                        <div className="form-group">
                                            <label htmlFor="availability_from">Availability From:</label>
                                            <input
                                                type="date"
                                                name="availability_from"
                                                value={formData.availability_from}
                                                onChange={handleChange}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="availability_to">Availability To:</label>
                                            <input
                                                type="date"
                                                name="availability_to"
                                                value={formData.availability_to}
                                                onChange={handleChange}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="offDays">Add Off Days (within availability period):</label>
                                            <input
                                                type="date"
                                                name="offDays"
                                                onChange={handleOffDaysChange}
                                                className="form-control"
                                            />
                                            <div className="off-days-list">
                                                <strong>Selected Off Days:</strong>
                                                <ul>
                                                    {formData.offDays.map((offDay, index) => (
                                                        <li key={index}>{offDay}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-md-9'>
                                    {formData.tour_type != "multi-day" && (
    <div className="row">
        <div className="col-md-12">
            <label>Pricing</label>
            {formData.room_types.map((roomType, index) => (
                <div className="row" key={index}>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label>{roomType.name.en}</label>
                            <input
                                type="text"
                                className="form-control"
                                value={roomType.name.en}
                                disabled
                            />
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label>Net Price</label>
                            <input
                                type="number"
                                className="form-control"
                                value={roomType.netprice}
                                onChange={(e) => handleRoomTypeChange(index, 'netprice', e)}
                            />
                        </div>
                    </div>
                    {/* <div className="col-md-2">
                        <div className="form-group">
                            <label>Occupancy Children</label>
                            <input
                                type="number"
                                className="form-control"
                                value={roomType.occupancychildern}
                                disabled={roomType.occupancychildern === 0} // Disable if it's an adult room
                            />
                        </div>
                    </div> */}
                    <div className="col-md-2">
                        <div className="form-group">
                            <label>count</label>
                            <input
                                type="number"
                                className="form-control"
                                value={1}
                                disabled={roomType.occupancyadult === 0} // Disable if it's a children room
                            />
                        </div>
                    </div>

                </div>
            ))}
                    <div className="col-md-6">
            <div className="form-group">
                <label>Shared Price</label>
                <input
                    type="number"
                    name="shared"
                    className="form-control"
                    placeholder="Enter Shared Price"
                    value={formData.shared}
                    onChange={handlePriceChange}
                />
            </div>
        </div>
        <div className="col-md-6">
            <div className="form-group">
                <label>Private Price</label>
                <input
                    type="number"
                    name="private"
                    className="form-control"
                    placeholder="Enter Private Price"
                    value={formData.private}
                    onChange={handlePriceChange}
                />
            </div>
        </div>
        </div>
    </div>
)}
{/* {formData.discounts.map((discount, index) => (
    <div key={index} className="row">
        <div className="col-md-4">
            <div className="form-group">
                <label>Minimum Users</label>
                <input
                    type="number"
                    className="form-control"
                    value={discount.min_users}
                    onChange={(e) => handleDiscountChange(index, 'min_users', e.target.value)}
                />
            </div>
        </div>
        <div className="col-md-4">
            <div className="form-group">
                <label>Discount Percentage</label>
                <input
                    type="number"
                    className="form-control"
                    value={discount.discount_percentage}
                    onChange={(e) => handleDiscountChange(index, 'discount_percentage', e.target.value)}
                />
            </div>
        </div>
        <div className="col-md-4 d-flex align-items-center">
            <button
                type="button"
                onClick={() => removeDiscount(index)}
                className="btn btn-danger"
            >
                Remove Discount
            </button>
        </div>
    </div>
))} */}
{formData.discounts.map((discount, index) => {
    // Assuming we already have the original price of the adult room
    const adultRoom = formData.room_types.find(room => room.name.en === 'adult');
    const originalPrice = adultRoom ? adultRoom.netprice : 0;

    return (
        <div key={index} className="row">
            <div className="col-md-4">
                <div className="form-group">
                    <label>Minimum Users</label>
                    <input
                        type="number"
                        className="form-control"
                        value={discount.min_users}
                        onChange={(e) => handleDiscountChange(index, 'min_users', e.target.value)}
                    />
                </div>
            </div>
            <div className="col-md-4">
                <div className="form-group">
                    <label>Discount Percentage</label>
                    <input
                        type="number"
                        className="form-control"
                        value={discount.discount_percentage}
                        onChange={(e) => handleDiscountChange(index, 'discount_percentage', e.target.value)}
                    />
                </div>
            </div>
            <div className="col-md-4 d-flex align-items-center">
                <label>Discounted Price: </label>
                <input
                    type="number"
                    className="form-control ms-2"
                    value={getDiscountedPrice(discount.discount_percentage, originalPrice)}
                    disabled
                />
            </div>
        </div>
    );
})}


<div className="form-group">
    <button type="button" onClick={addDiscount} className="btn btn-primary">
        Add Discount
    </button>
</div>


{formData.tour_type == "multi-day" && (
    <div className="row">
        <div className="col-md-12">
            <label>Room Types</label>
            {formData.room_types.map((roomType, index) => (
                <div className="row" key={index}>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label>Room Type</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Room Name"
                                value={roomType.name.en}
                                onChange={(e) => handleRoomTypeChange(index, 'name.en', e)}
                            />
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label>Net Price</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Net Price"
                                value={roomType.netprice}
                                onChange={(e) => handleRoomTypeChange(index, 'netprice', e)}
                            />
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label>Occupancy Children</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Occupancy Children"
                                value={roomType.occupancychildern}
                                onChange={(e) => handleRoomTypeChange(index, 'occupancychildern', e)}
                            />
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label>Occupancy Adult</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Occupancy Adult"
                                value={roomType.occupancyadult}
                                onChange={(e) => handleRoomTypeChange(index, 'occupancyadult', e)}
                            />
                        </div>
                    </div>
                    <div className="col-md-2 mt-3">
                        <div className="d-flex align-items-center">
                            <button
                                type="button"
                                onClick={() => removeRoomType(index)}
                                className="remove-new-tour-button me-3"
                            >
                                -
                            </button>
                            <button
                                type="button"
                                onClick={addRoomType}
                                className="add-new-tour-button"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <div className="col-md-6">
            <div className="form-group">
                <label>Shared Price</label>
                <input
                    type="number"
                    name="shared"
                    className="form-control"
                    placeholder="Enter Shared Price"
                    value={formData.shared}
                    onChange={handlePriceChange}
                />
            </div>
        </div>
        <div className="col-md-6">
            <div className="form-group">
                <label>Private Price</label>
                <input
                    type="number"
                    name="private"
                    className="form-control"
                    placeholder="Enter Private Price"
                    value={formData.private}
                    onChange={handlePriceChange}
                />
            </div>
        </div>
    </div>
)}

                                    </div>
                                    
                                </div>


                                    
                            </div>
                            <div className="text-end mt-4 me-3">
                                <button className="submit-tour me-3 ms-3" onClick={addTour}>
                                    Save and Publish
                                </button>
                                {/* <button className="submit-tour" onClick={addTour}>
                                    Publish
                                </button> */}
                            </div>
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}
export default Add_Tour;
