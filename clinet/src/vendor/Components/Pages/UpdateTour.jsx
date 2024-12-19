import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import { updateTour } from '../../../services/apiservices/TourService';
import { createTour, getAllDestinations } from '../../../services/apiservices/DestinationService';

import { Box, Button, Input, Alert, AlertIcon, FormControl, FormLabel, Select } from '@chakra-ui/react';

function UpdateTour({ tour }) {
  const { data: destinations, isLoading: isLoadingDestinations } = useQuery('destinations', getAllDestinations);
  
  const initialData = {
    title: tour.title,
    destination: tour.destination?._id || '',
    tour_type: tour.tour_type,
    brief_en: tour.brief,
    // brief_ar: tour.brief.ar,
    availability_from: tour.availability?.from || '',
    availability_to: tour.availability?.to || '',
    offDays: tour.availability?.offDays || [],
    languages: tour.languages || [],
    room_types: tour.room_types || [],
    shared: tour.shared || 0,
    private: tour.private || 0,
    discounts: tour.discounts || []  ,
    programdays: tour.programdays || 1, // Add programdays here
    program: tour.program || [] 
  };

  const [formData, setFormData] = useState(initialData);
  const [changedFields, setChangedFields] = useState({});
  const [selectedImages, setSelectedImages] = useState([]);
  const updateMutation = useMutation(updateTour);

  useEffect(() => {
    setFormData(initialData);
  }, [tour]);

  // Track changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (value !== initialData[name]) {
      setChangedFields((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      const updatedChangedFields = { ...changedFields };
      delete updatedChangedFields[name];
      setChangedFields(updatedChangedFields);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);
  };

  const handleRoomTypeChange = (index, field, value) => {
    const updatedRoomTypes = [...formData.room_types];
    updatedRoomTypes[index][field] = value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      room_types: updatedRoomTypes,
    }));

    const changedRoomTypes = [...(changedFields.room_types || formData.room_types)];
    changedRoomTypes[index] = {
      ...changedRoomTypes[index],
      [field]: value,
    };
    setChangedFields((prev) => ({
      ...prev,
      room_types: changedRoomTypes,
    }));
  };

  const addRoomType = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      room_types: [
        ...prevFormData.room_types,
        { name: { en: '' }, netprice: 0, occupancychildern: 0, occupancyadult: 0 },
      ],
    }));
  };

  const removeRoomType = (index) => {
    const updatedRoomTypes = formData.room_types.filter((_, i) => i !== index);
    setFormData({ ...formData, room_types: updatedRoomTypes });

    const changedRoomTypes = (changedFields.room_types || formData.room_types).filter((_, i) => i !== index);
    setChangedFields((prev) => ({
      ...prev,
      room_types: changedRoomTypes,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const formdata = new FormData();

    Object.keys(changedFields).forEach((key) => {
        if (key === 'room_types') {
            changedFields.room_types.forEach((roomType, index) => {
                formdata.append(`room_types[${index}][name]`, roomType.name.en);
                formdata.append(`room_types[${index}][netprice]`, roomType.netprice);
                formdata.append(`room_types[${index}][occupancychildern]`, roomType.occupancychildern);
                formdata.append(`room_types[${index}][occupancyadult]`, roomType.occupancyadult);
            });
        } else if (key === 'program') {
            changedFields.program.forEach((programItem, index) => {
                formdata.append(`program[${index}][day]`, programItem.day);
                formdata.append(`program[${index}][details]`, programItem.details);
                programItem.inclusions.forEach((inclusion, subIndex) => {
                    formdata.append(`program[${index}][inclusions][${subIndex}]`, inclusion);
                });
                programItem.exclusions.forEach((exclusion, subIndex) => {
                    formdata.append(`program[${index}][exclusions][${subIndex}]`, exclusion);
                });
            });
        } else {
            formdata.append(key, changedFields[key]);
        }
    });

    if (selectedImages.length) {
        selectedImages.forEach((image) => {
            formdata.append('image', image);
        });
    }

    updateMutation.mutate(
        { tourId: tour._id, updatedData: formdata },
        {
            onSuccess: () => {
                alert('Tour updated successfully');
                window.location.reload();
            },
            onError: (error) => {
                alert(`Failed to update tour: ${error.message}`);
            },
        }
    );
};


  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const formdata = new FormData();

  //   Object.keys(changedFields).forEach((key) => {
  //     if (key === 'room_types') {
  //       changedFields.room_types.forEach((roomType, index) => {
  //         formdata.append(`room_types[${index}][name]`, roomType.name.en);
  //         formdata.append(`room_types[${index}][netprice]`, roomType.netprice);
  //         formdata.append(`room_types[${index}][occupancychildern]`, roomType.occupancychildern);
  //         formdata.append(`room_types[${index}][occupancyadult]`, roomType.occupancyadult);
  //       });
  //     } else {
  //       formdata.append(key, changedFields[key]);
  //     }
  //   });

  //   if (selectedImages.length) {
  //     selectedImages.forEach((image) => {
  //       formdata.append('image', image);
  //     });
  //   }

  //   updateMutation.mutate(
  //     { tourId: tour._id, updatedData: formdata },
  //     {
  //       onSuccess: () => {
  //         alert('Tour updated successfully');
  //       },
  //       onError: (error) => {
  //         alert(`Failed to update tour: ${error.message}`);
  //       },
  //     }
  //   );
  // };
// Function to handle discount field changes
const handleDiscountChange = (index, field, value) => {
  const updatedDiscounts = [...formData.discounts];
  updatedDiscounts[index][field] = value;
  setFormData((prevFormData) => ({
      ...prevFormData,
      discounts: updatedDiscounts,
  }));

  const changedDiscounts = [...(changedFields.discounts || formData.discounts)];
  changedDiscounts[index] = {
      ...changedDiscounts[index],
      [field]: value,
  };
  setChangedFields((prev) => ({
      ...prev,
      discounts: changedDiscounts,
  }));
};

// Function to add a new discount
const addDiscount = () => {
  setFormData((prevFormData) => ({
      ...prevFormData,
      discounts: [
          ...prevFormData.discounts,
          { min_users: 0, discount_percentage: 0 },
      ],
  }));
};

// Function to remove a discount by index
const removeDiscount = (index) => {
  const updatedDiscounts = formData.discounts.filter((_, i) => i !== index);
  setFormData({ ...formData, discounts: updatedDiscounts });

  const changedDiscounts = (changedFields.discounts || formData.discounts).filter((_, i) => i !== index);
  setChangedFields((prev) => ({
      ...prev,
      discounts: changedDiscounts,
  }));
};
// Function to handle program field changes
const handleProgramChange = (index, field, value) => {
  const updatedProgram = [...formData.program];
  updatedProgram[index][field] = value;
  setFormData((prevFormData) => ({
      ...prevFormData,
      program: updatedProgram,
  }));

  const changedProgram = [...(changedFields.program || formData.program)];
  changedProgram[index] = {
      ...changedProgram[index],
      [field]: value,
  };
  setChangedFields((prev) => ({
      ...prev,
      program: changedProgram,
  }));
};

// Function to handle inclusions and exclusions updates
const handleInclusionExclusionChange = (index, type, subIndex, value) => {
  const updatedProgram = [...formData.program];
  updatedProgram[index][type][subIndex] = value;
  setFormData((prevFormData) => ({
      ...prevFormData,
      program: updatedProgram,
  }));
};

// Function to add a new program day
const addProgramDay = () => {
  setFormData((prevFormData) => ({
      ...prevFormData,
      program: [
          ...prevFormData.program,
          { day: formData.program.length + 1, details: '', inclusions: [''], exclusions: [''] },
      ],
  }));
};

// Function to remove a program day by index
const removeProgramDay = (index) => {
  const updatedProgram = formData.program.filter((_, i) => i !== index);
  setFormData({ ...formData, program: updatedProgram });

  const changedProgram = (changedFields.program || formData.program).filter((_, i) => i !== index);
  setChangedFields((prev) => ({
      ...prev,
      program: changedProgram,
  }));
};

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <FormControl id="title" mb={4}>
        <FormLabel>Title</FormLabel>
        <Input
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl id="destination" mb={4}>
        <FormLabel>Destination</FormLabel>
        <Select
          name="destination"
          value={formData.destination}
          onChange={handleInputChange}
          isLoading={isLoadingDestinations}
        >
          <option value="">Select Destination</option>
          {destinations?.data?.map((destination) => (
            <option key={destination._id} value={destination._id}>
              {destination.country?.en}
            </option>
          ))}
        </Select>
      </FormControl>

      {/* <FormControl id="shared" mb={4}>
        <FormLabel>Shared Room Price</FormLabel>
        <Input
          name="shared"
          type="number"
          value={formData.shared}
          onChange={handleInputChange}
        />
      </FormControl> */}

      {/* <FormControl id="private" mb={4}>
        <FormLabel>Private Room Price</FormLabel>
        <Input
          name="private"
          type="number"
          value={formData.private}
          onChange={handleInputChange}
        />
      </FormControl> */}
{/* Program Days */}
<FormControl id="programdays" mb={4}>
    <FormLabel>Number of Program Days</FormLabel>
    <Input
        type="number"
        name="programdays"
        value={formData.programdays}
        onChange={(e) => handleInputChange(e)}
    />
</FormControl>

{/* Display and edit program days */}
{formData.program.map((programItem, index) => (
    <Box key={index} mb={4}>
        <FormLabel>Day {programItem.day}</FormLabel>
        <Input
            type="text"
            value={programItem.details}
            placeholder="Program details"
            onChange={(e) => handleProgramChange(index, 'details', e.target.value)}
        />
        
        {/* Inclusions */}
        <FormLabel>Inclusions</FormLabel>
        {programItem.inclusions.map((inclusion, subIndex) => (
            <Box key={subIndex}>
                <Input
                    type="text"
                    value={inclusion}
                    placeholder="Inclusion"
                    onChange={(e) => handleInclusionExclusionChange(index, 'inclusions', subIndex, e.target.value)}
                />
            </Box>
        ))}
        <Button onClick={() => handleInclusionExclusionChange(index, 'inclusions', programItem.inclusions.length, '')}>
            Add Inclusion
        </Button>

        {/* Exclusions */}
        <FormLabel>Exclusions</FormLabel>
        {programItem.exclusions.map((exclusion, subIndex) => (
            <Box key={subIndex}>
                <Input
                    type="text"
                    value={exclusion}
                    placeholder="Exclusion"
                    onChange={(e) => handleInclusionExclusionChange(index, 'exclusions', subIndex, e.target.value)}
                />
            </Box>
        ))}
        <Button onClick={() => handleInclusionExclusionChange(index, 'exclusions', programItem.exclusions.length, '')}>
            Add Exclusion
        </Button>

        <Button colorScheme="red" mt={2} onClick={() => removeProgramDay(index)}>
            Remove Program Day
        </Button>
    </Box>
))}

<Button colorScheme="green" mb={4} onClick={addProgramDay}>
    Add Program Day
</Button>

      <FormControl id="languages" mb={4}>
        <FormLabel>Languages</FormLabel>
        <Select
          name="languages"
          multiple
          value={formData.languages}
          onChange={(e) => {
            const selectedLanguages = Array.from(e.target.selectedOptions, (option) => option.value);
            handleInputChange({ target: { name: 'languages', value: selectedLanguages } });
          }}
        >
          <option value="English">English</option>
          <option value="Arabic">Arabic</option>
          <option value="Spanish">Spanish</option>
        </Select>
      </FormControl>
{formData.discounts.map((discount, index) => (
    <Box key={index} mb={4}>
        <FormLabel>Minimum Users</FormLabel>
        <Input
            type="number"
            value={discount.min_users}
            onChange={(e) => handleDiscountChange(index, 'min_users', e.target.value)}
        />
        <FormLabel>Discount Percentage</FormLabel>
        <Input
            type="number"
            value={discount.discount_percentage}
            onChange={(e) => handleDiscountChange(index, 'discount_percentage', e.target.value)}
        />
        <Button colorScheme="red" mt={2} onClick={() => removeDiscount(index)}>
            Remove Discount
        </Button>
    </Box>
))}

<Button colorScheme="green" mb={4} onClick={addDiscount}>
    Add Discount
</Button>

      {formData.room_types.map((room, index) => (
        <Box key={index} mb={4}>
          <FormLabel>Room Type Name</FormLabel>
          <Input
            value={room.name}
            onChange={(e) => handleRoomTypeChange(index, 'name', e.target.value)}
          />
          <FormLabel>Net Price</FormLabel>
          <Input
            value={room.netprice}
            type="number"
            onChange={(e) => handleRoomTypeChange(index, 'netprice', e.target.value)}
          />
          <FormLabel>Occupancy (Children)</FormLabel>
          <Input
            value={room.occupancychildern}
            type="number"
            onChange={(e) => handleRoomTypeChange(index, 'occupancychildern', e.target.value)}
          />
          <FormLabel>Occupancy (Adult)</FormLabel>
          <Input
            value={room.occupancyadult}
            type="number"
            onChange={(e) => handleRoomTypeChange(index, 'occupancyadult', e.target.value)}
          />
          <Button colorScheme="red" mt={2} onClick={() => removeRoomType(index)}>
            Remove Room Type
          </Button>
        </Box>
      ))}

      {/* <Button colorScheme="green" mb={4} onClick={addRoomType}>
        Add Room Type
      </Button> */}

      <FormControl id="images" mb={4}>
        <FormLabel>Images</FormLabel>
        <Input type="file" multiple onChange={handleFileChange} />
      </FormControl>

      <Button type="submit" colorScheme="blue" isLoading={updateMutation.isLoading}>
        Update Tour
      </Button>

      {updateMutation.isError && (
        <Alert status="error" mt={4}>
          <AlertIcon />
          {updateMutation.error.message}
        </Alert>
      )}

      {updateMutation.isSuccess && (
        <Alert status="success" mt={4}>
          <AlertIcon />
          Tour updated successfully!
        </Alert>
      )}
    </Box>
  );
}

export default UpdateTour;
