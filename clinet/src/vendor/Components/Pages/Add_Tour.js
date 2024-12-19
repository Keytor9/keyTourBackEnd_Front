import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { createTour, getAllDestinations } from '../../../services/apiservices/DestinationService';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import '../Assets/Css/Web.css';
import { useNavigate } from "react-router-dom";
const predefinedRoomTypes = [
    { name: 'Single', occupancyadult: 1, occupancychildern: 0, netprice: 0 },
    { name: 'Double', occupancyadult: 2, occupancychildern: 0, netprice: 0 },
    { name: 'Triple', occupancyadult: 3, occupancychildern: 0, netprice: 0 },
    { name: 'Single+Child', occupancyadult: 1, occupancychildern: 1, netprice: 0 },
    { name: 'Double+Child', occupancyadult: 2, occupancychildern: 1, netprice: 0 },
    { name: 'Triple+Child', occupancyadult: 3, occupancychildern: 1, netprice: 0 },
];
function Add_Tour() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        shared: 0,
        private: 0,
        destination: '',
        tour_type: 'select',
        brief_en: '',
        brief_ar: '',
        availability_from: '',
        availability_to: '',
        offDays: [],
        programdays: 0,
        program: [],
        imagesthubnails: [],
        languages: [],
        image: [],
        room_types: [],

        includesen: '',
        includesar: '',
        discounts: [ 
            {
                min_users: 0,
                discount_percentage: 0
            }
        ],

        excludesen: '',
        excludesar: '',
        cancellation_policy_en: '',
        availabilityToCancel: '',
        // cancellation_policy_ar: '',
    });
    const [selectedRoomType, setSelectedRoomType] = useState("");


    // const [imagePreviews, setImagePreviews] = useState([]);



    const handleRoomChange = (index, key, value) => {
        const updatedRoomTypes = formData.room_types.map((room, i) =>
          i === index ? { ...room, [key]: value } : room
        );
        setFormData({ ...formData, room_types: updatedRoomTypes });
      };

      const [titleError, setTitleError] = useState("");
      const [privateError, setprivateError] = useState("");
      const [destinationError, setdestinationError] = useState("");
      const [availabilityTOError, setavailabilityTOError] = useState("");
      const [availabilityFromError, setavailabilityFromError] = useState("");
      const [imageError, setimageError] = useState("");
      const [tour_typeError, settour_typeError] = useState("");
      const [briefError, setbriefError] = useState("");
      const [cancellation_policyError, setcancellation_policyError] = useState("");
      const [includesError, setincludeError] = useState("");
      const [excludesError, setExcludesError] = useState("");
    //   const [titleError, setTitleError] = useState("");






      const handleRoomTypeSelect = (e) => {
        const selectedType = predefinedRoomTypes.find(
          (room) => room.name === e.target.value
        );
        if (selectedType) {
          setFormData({
            ...formData,
            room_types: [...formData.room_types, { ...selectedType }],
          });
          setSelectedRoomType("");
        }
      };





      const addNewRoomType = () => {
        setFormData({
          ...formData,
          room_types: [
            ...formData.room_types,
            { name: '', occupancyadult: 0, occupancychildern: 0, netprice: 0 },
          ],
        });
      };


      const removeRoomType = (index) => {
        const updatedRoomTypes = formData.room_types.filter((_, i) => i !== index);
        setFormData({ ...formData, room_types: updatedRoomTypes });
      };

    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedImages2, setSelectedImages2] = useState([]);
    const queryClient = useQueryClient();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log(name , value);
        // if (name === "imagesthubnails") {
        //     setImagePreviews(fileList.map((file) => URL.createObjectURL(file)));
        // }
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedImages(files);
        setFormData({ ...formData, image: files });
    };

    const handleFileImageChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedImages2(files);
        setFormData({ ...formData, imagesthubnails: files });
    };

 // Function to add a new room type
const addRoomType = () => {
    setFormData((prevFormData) => ({
        ...prevFormData,
        room_types: [
            ...prevFormData.room_types,
            {
                name: '' ,
                price: 0,
                netprice: 0,
                occupancychildern: 0,
                occupancyadult: 0,
            },
        ],
    }));
};

// Function to remove a room type by index
// const removeRoomType = (index) => {
//     const updatedRoomTypes = formData.room_types.filter((_, i) => i !== index);
//     setFormData({ ...formData, room_types: updatedRoomTypes });
// };
// const handleOffDaysChange = (e) => {
//     const newOffDay = e.target.value;

//     // Ensure the off day is valid and within the availability period
//     if (newOffDay >= formData.availability_from && newOffDay <= formData.availability_to) {
//         setFormData((prevFormData) => ({
//             ...prevFormData,
//             offDays: [...prevFormData.offDays, newOffDay],
//         }));
//     } else {
//         Swal.fire({
//             icon: 'error',
//             title: 'Invalid Off Day',
//             text: 'Off day must be within the availability period.',
//         });
//     }
// };


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
        onSuccess: (data) => {
          queryClient.invalidateQueries('tours');
          // Show success message
          Swal.fire({
            icon: 'success',
            title: 'Tour added successfully',
            timer: 1500,
            showConfirmButton: false,
          }).then((response) => {
            
            console.log(data.data.id);
                navigate(`/tourdetails/${data.data.id}`);
          });
        },
        onError: (error) => {

            if (error.response && error.response.status === 400) {
                const errors = error.response.data.errors || [];
                if (errors.length > 0) {
                  const errorMessage = errors.map(
                    (err, index) => `<p key=${index} style="color: red;">This ${err.field} is required</p>`
                  ).join('');
              
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops... Validation Error',
                    html: errorMessage, // Use `html` for rendering HTML content
                    confirmButtonText: 'OK',
                  });
                } else {
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops... Validation Error',
                    text: 'No specific validation errors returned.',
                    confirmButtonText: 'OK',
                  });
                }
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: error.message || 'Something went wrong!',
                  confirmButtonText: 'OK',
                });
              }
              
            
    //   console.log(error)
    //       // Check if the error is a validation error (status 400)
    //       if (error.response && error.response.status === 400) {
    //         // const errors = error.response.data.errors;
    //   console.log(errors)
    //         // Construct a message from the validation errors
    //         const errors = error.response.data.errors || [];
    //         if (errors.length > 0) {
    //             const errorMessage = errors.map(
    //             (err, index) => `<p key=${index}>This ${err.field} is required</p>`
    //             ).join('');
    //         }

    //         console.log(object);

    //         // console.log(errorMessage);
    //         // {errorMessage.map((x) => (
    //         //     <span></span>
    //         // ))}
      
    //         // Display the errors using Swal
    //         Swal.fire({
    //           icon: 'error',
    //           title: 'Oops... Validation Error',
    //           text: errors,
    //           confirmButtonText: 'OK',
    //         });
    //       } else {
    //         // Handle other types of errors (e.g., network or server errors)
    //         Swal.fire({
    //           icon: 'error',
    //           title: 'Oops...',
    //           text: error.message || 'Something went wrong!',
    //         });
    //       }
        },
      });
      
    

  



    const filterRoomTypes = (roomTypes) => {
      const filteredRoomTypes = {};
      Object.keys(roomTypes).forEach((key) => {
          const room = roomTypes[key];
          const hasValue = 0 || 0; // Only include if either shared or private has a value
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

    if (field === 'name') {
        updatedRoomTypes[index].name = value;
    } else {
        updatedRoomTypes[index][field] = value;
    }

    setFormData((prevFormData) => ({
        ...prevFormData,
        room_types: updatedRoomTypes,
    }));
};

useEffect(() => {
    if (formData.tour_type !== 'multi-day') {
        setFormData((prevFormData) => ({
            ...prevFormData,
            room_types: [
                { name: 'adult', netprice: 0, occupancychildern: 0, occupancyadult: 1 },
                { name: 'children', netprice: 0, occupancychildern: 1, occupancyadult: 0 }
            ],
        }));
    } else {
        setFormData((prevFormData) => ({
            ...prevFormData,
            room_types: [
            ],
        }));
    }
}, [formData.tour_type]);

    const addTour = (e) => {
      e.preventDefault();
      let vendorData = Cookies.get('uservendor') ? JSON.parse(Cookies.get('uservendor')) : null;
      console.log(vendorData._id);
      
    // imagesthubnails: [{ type: String, required: true }],

      if (vendorData) {
          // Create FormData object to handle file uploads and form submission
          const formdata = new FormData();
          formdata.append('title', formData.title);
        //   Object.keys(formData).forEach((key) => {
        //     if (key === "favoriteImages") {
        //       formData[key].forEach((file, index) =>
        //         data.append(favoriteImages[${index}], file)
        //       );
        //     }
            // formData.append
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
          formdata.append('private', formData.private);
          formdata.append('availabilityToCancel', formData.availabilityToCancel);
        //   formData.languages.forEach((language,i) => {
        //     formdata.append(`languages[${i}]`, language);
        // });

        formData.discounts.forEach((discount, index) => {
            const adultRoom = formData.room_types.find(room => room.name === 'adult');
            const originalPrice = adultRoom ? adultRoom.netprice : 0;
        
            // Calculate the discount percentage
            discount.discount_percentage = 
                originalPrice && discount.discounted_price
                    ? ((originalPrice - discount.discounted_price) / originalPrice) * 100
                    : 0;
        
            // Append values to FormData
            formdata.append(`discounts[${index}][min_users]`, discount.min_users);
            formdata.append(`discounts[${index}][discount_percentage]`, discount.discount_percentage.toFixed(2)); // Ensure two decimal places
            formdata.append(`discounts[${index}][discounted_price]`, discount.discounted_price || 0);
        });

        // formData.imagesthubnails.forEach((imagesthubnails, index) => {
        //     formdata.append(`imagesthubnails[${index}]`, imagesthubnails);
        // });


          formdata.append('programdays', formData.programdays);

          formData.languages.forEach((lang, index) => {
              formdata.append(`languages[${index}]`, lang);
          });

          formData.program.forEach((programItem, index) => {
              formdata.append(`program[${index}][day]`, programItem?.day);
              formdata.append(`program[${index}][details]`, programItem?.details?.en);
            //   formdata.append(`program[${index}][details][ar]`, programItem.details.ar);
              formdata.append(`program[${index}][inclusions]`, programItem?.inclusions);
              formdata.append(`program[${index}][exclusions]`, programItem?.exclusions);
          });

          // Filter room types to include only the ones with values
          formData.room_types.forEach((roomType, index) => {
            formdata.append(`room_types[${index}][name]`, roomType.name);
            formdata.append(`room_types[${index}][netprice]`, roomType.netprice);
            formdata.append(`room_types[${index}][occupancychildern]`, roomType.occupancychildern);
            formdata.append(`room_types[${index}][occupancyadult]`, roomType.occupancyadult);
        }); 

        // imagesthubnails: [{ type: String, required: true }],

          // Append images
          selectedImages.forEach((image, index) => {
              formdata.append('image', image);
          });
          if (formData.shared) {
            formdata.append('shared', formData.shared);
        }

        // if (formData.private) {
        //     formdata.append('private', formData.private);
        // }
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


  const handleLanguageChange = (language, index) => {
    setFormData((prevData) => {
      const isSelected = prevData.languages.includes(language);
      const updatedLanguages = isSelected
        ? prevData.languages.filter((lang) => lang !== language)
        : [...prevData.languages, language];

  
      return { ...prevData, languages: updatedLanguages };
    });
    
  };


const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};
// Function to handle discount changes
const handleDiscountChange = (index, field, value) => {
    const updatedDiscounts = [...formData.discounts];
    updatedDiscounts[index][field] = parseFloat(value) || 0;

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





const [selectedDay, setSelectedDay] = useState(null);
const [activeDays, setActiveDays] = useState([]);
const [fromDate, setFromDate] = useState("");
const [toDate, setToDate] = useState("");

// Helper Functions
const dateToISOString = (date) => date.toISOString().split("T")[0];

const validateAvailabilityRange = (selectedDate, fromDate, toDate) => {
  const from = new Date(fromDate);
  const to = new Date(toDate);
  return selectedDate >= from && selectedDate <= to;
};

const getAllSameDayInRange = (day, availabilityFrom, availabilityTo) => {
  const dayMapping = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  if (!dayMapping.hasOwnProperty(day)) {
    console.error("Invalid day:", day);
    return [];
  }

  const targetDay = dayMapping[day];
  const availabilityStart = availabilityFrom ? new Date(availabilityFrom) : null;
  const availabilityEnd = availabilityTo ? new Date(availabilityTo) : null;

  if (!availabilityStart || !availabilityEnd) {
    console.error("Invalid availability range");
    return [];
  }

  const offDays = [];
  for (
    let current = new Date(availabilityStart);
    current <= availabilityEnd;
    current.setDate(current.getDate() + 1)
  ) {
    if (current.getUTCDay() === targetDay) {
        offDays.push(dateToISOString(current));
    }
  }

  return offDays;
};

// Event Handlers
const handleDayButtonClick = (e, day) => {
  e.preventDefault();

  const sameDayDates = getAllSameDayInRange(
    day,
    formData.availability_from,
    formData.availability_to
  );

  setActiveDays((prevActiveDays) =>
    prevActiveDays.includes(day)
      ? prevActiveDays.filter((d) => d !== day)
      : [...prevActiveDays, day]
  );

  setFormData((prevState) => {
    return sameDayDates.every((date) => prevState.offDays.includes(date))
      ? { ...prevState, offDays: prevState.offDays.filter((date) => !sameDayDates.includes(date)) }
      : { ...prevState, offDays: [...prevState.offDays, ...sameDayDates] };
  });
};

const handleOffDaysChange = (e) => {
  const newDate = e.target.value;
  const selectedDate = new Date(newDate);

  if (!validateAvailabilityRange(selectedDate, formData.availability_from, formData.availability_to)) {
    Swal.fire({
      icon: "error",
      title: "Invalid Date",
      text: `Selected date is outside the valid range. Please select a valid date, between ${new Date(
        formData.availability_from
      ).toLocaleDateString()} and ${new Date(formData.availability_to).toLocaleDateString()}.`,
      confirmButtonText: "OK",
    });
    e.target.value = "";
    return;
  }

  setFormData((prevState) => {
    if (prevState.offDays.includes(newDate)) {
      return prevState;
    }
    return {
      ...prevState,
      offDays: [...prevState.offDays, newDate],
    };
  });
};

const calculateAllDatesInRange = (e) => {
  e.preventDefault();

  if (!fromDate || !toDate) {
    Swal.fire("Please select both From and To offDays.");
    return;
  }

  const from = new Date(fromDate);
  const to = new Date(toDate);

  if (from > to) {
    Swal.fire("Invalid range: From date is after To date.");
    return;
  }

  const offDays = [];
  for (let current = new Date(from); current <= to; current.setDate(current.getDate() + 1)) {
    const formattedDate = dateToISOString(current);
    if (!formData.offDays.includes(formattedDate)) offDays.push(formattedDate);
  }

  setFormData((prevState) => ({ ...prevState, offDays: [...prevState.offDays, ...offDays] }));
};

const handleDateChange = (e) => {
  const { name, value } = e.target;
  if (name === "from") {
    setFromDate(value);
  } else if (name === "to") {
    setToDate(value);
  }
};

const handleRemoveOffDay = (e, index) => {
  e.preventDefault();
  setFormData((prevState) => ({
    ...prevState,
    offDays: prevState.offDays.filter((_, i) => i !== index),
  }));
};

const daysOfWeek = [
    { name: "Sunday", value: 0 },
    { name: "Monday", value: 1 },
    { name: "Tuesday", value: 2 },
    { name: "Wednesday", value: 3 },
    { name: "Thursday", value: 4 },
    { name: "Friday", value: 5 },
    { name: "Saturday", value: 6 },
  ];










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
                                            name="title"
                                            className="form-control"
                                            placeholder="Title  "
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
                                            {/* <option value="activity">Activity</option> */}
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
                                                // value={formData.tour_type !== "multi-day" ? "1" : formData.programdays}
                                            />
                                        </div>
                                    )}
                                    {formData.programdays > 0 &&
                                        formData.program.map((_, index) => (
                                            <div key={index} className="form-group">
                                                {formData.tour_type !== "multi-day" ? <label>program Details</label> : 
                                                <label>Day {index + 1} Details </label> }
                                                <textarea
                                                    className="form-control"
                                                    onChange={(e) => handleProgramChange(index, "en", e.target.value)}
                                                ></textarea>
                                            </div>
                                        ))}
                                </div>
                                <div className="col-md-6">
                                    <label>Tour Image Cover</label>
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
                                                <img key={idx} src={URL.createObjectURL(img)} alt="preview" width="100"  />
                                            ))}
                                        </div>
                                    )}
                                    <label>Tour Images</label>
                                    <input
                                        id="imagesthubnails"
                                        className="file"
                                        type="file"
                                        name="imagesthubnails"
                                        multiple
                                        onChange={handleFileImageChange}
                                    />
                                    {selectedImages2.length > 0 && (
                                        <div className="image-preview">
                                            {selectedImages2.map((img, idx) => (
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
                                        <label>Note</label>
                                        <textarea
                                            name="cancellation_policy_en"
                                            className="form-control"
                                            value={formData.cancellation_policy_en}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Availability To Cancel</label>
                                        <input
                                            type='number'
                                            name="availabilityToCancel"
                                            className="form-control"
                                            value={formData.availabilityToCancel}
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
                                <div className="col-md-5 border border-top-0 border-start-0 border-bottom-0">
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
      <label htmlFor="offDays">Off Days:</label>
      <input
        type="date"
        name="offDays"
        onChange={handleOffDaysChange}
        min={formData.availability_from}
        max={formData.availability_to}
        onKeyDown={(e) => e.preventDefault()}
        className="form-control"
      />
    </div>

    <div className="buttons">
      {daysOfWeek.map(({ name }) => (
        <button
          key={name}
          onClick={(e) => handleDayButtonClick(e, name)}
          className={`all-days ${activeDays.includes(name) ? "active" : ""}`}
        >
          All {name}s
        </button>
      ))}
    </div>

    <div className="off-days-list">
      <strong>Selected Days:</strong>
      <ul>
        {formData.offDays.map((offDay, index) => (
          <li key={index} className="day-selected">
            {offDay}{" "}
            <button
              onClick={(e) => handleRemoveOffDay(e, index)}
              className="btn btn-sm btn-danger"
            >
              <i className="fa fa-trash"></i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
                                    <div className='col-md-7'>
                                    {formData.tour_type != "multi-day" && (
    <div className="row">
        <div className="col-md-12">
            <label>Pricing</label>
            {formData.room_types.map((roomType, index) => (
                <div className="row" key={index}>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label>{roomType.name}</label>
                            <input
                                type="text"
                                className="form-control"
                                value={roomType.name}
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
                    {/* <div className="col-md-6">
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
                    </div> */}
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

{formData.tour_type !== "multi-day" && formData.room_types !== "multi-day" ?
    formData.discounts.map((discount, index) => {
        // Get the original price of the adult room
        const adultRoom = formData.room_types.find(room => room.name === 'adult');
        const originalPrice = adultRoom ? adultRoom.netprice : 0;

        // Calculate discount percentage dynamically
        const calculatedDiscountPercentage = 
            originalPrice && discount.discounted_price
                ? ((originalPrice - discount.discounted_price) / originalPrice) * 100
                : 0;

        return (
            <div key={index} className="row">
                <div className="col-md-6">
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
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Discounted Price</label>
                        <input
                            type="number"
                            className="form-control"
                            value={discount.discounted_price || ''}
                            onChange={(e) => handleDiscountChange(index, 'discounted_price', e.target.value)}
                        />
                    </div>
                </div>
                {/* <div className="col-md-4">
                    <div className="form-group">
                        <label>Discount Percentage</label>
                        <input
                            type="number"
                            className="form-control"
                            value={calculatedDiscountPercentage.toFixed(2)}
                            disabled
                        />
                    </div>
                </div> */}
            </div>
        );
    })
    : ""}



{formData.tour_type !== "multi-day" && formData.room_types !== "multi-day" ?
<div className="form-group">
    <button type="button" onClick={addDiscount} className="btn btn-primary">
        Add Discount
    </button>
</div> : ""}

{formData.tour_type == "multi-day" && (
    <div className="row">
        <div className="col-md-12">
            <label>Room Types</label>
            <h3>Room Types</h3>
      <select value={selectedRoomType} className="form-control mb-3" onChange={handleRoomTypeSelect}>
        <option value="">Select Room Type</option>
        {predefinedRoomTypes.map((room, index) => (
          <option key={index} value={room.name}>
            {room.name}
          </option>
        ))}
      </select>
      {formData.room_types.map((room, index) => (
        <div className='row'>
            <div className='col-md-10'>
                <div key={index} className="room-type-entry">
                    <div className='row'>
                        {["name", "occupancyadult", "occupancychildern", "netprice"].map((key) => (
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label key={key}>
                                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                                    </label>
                                    <input
                                        type={key === "netprice" ? "number" : "text"}
                                        value={room[key]} className='form-control'
                                        onChange={(e) => handleRoomChange(index, key, e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='col-md-2 mt-3'>
                <button type="button" className='btn btn-danger' onClick={() => removeRoomType(index)}>
                    Remove
                </button>
            </div>
        </div>
      ))}
      <button type="button" className='btn btn-primary' onClick={addNewRoomType}>
        Add Custom Room Type
      </button>
        </div>
        {/* <div className="col-md-6">
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
        </div> */}
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
