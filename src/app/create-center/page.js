'use client';

import { useState } from 'react';
import { createTrainingCenter } from '@/lib/api';
import Link from 'next/link';

const CreateCenterPage = () => {
  const [formData, setFormData] = useState({
    centerName: '',
    centerCode: '',
    address: {
      detailedAddress: '',
      city: '',
      state: '',
      pincode: '',
    },
    studentCapacity: 1,
    coursesOffered: [],
    contactEmail: '',
    contactPhone: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prevState => ({
        ...prevState,
        address: {
          ...prevState.address,
          [addressField]: value,
        },
      }));
    } else if (name === 'coursesOfferedInput') {
      setFormData(prevState => ({
        ...prevState,
        coursesOffered: value.split(',').map(course => course.trim()),
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const newCenter = await createTrainingCenter(formData);
      console.log('Training Center created:', newCenter);
      setSuccessMessage('Training Center created successfully!');
      setFormData({
        centerName: '',
        centerCode: '',
        address: {
          detailedAddress: '',
          city: '',
          state: '',
          pincode: '',
        },
        studentCapacity: 1,
        coursesOffered: [],
        contactEmail: '',
        contactPhone: '',
      });
    } catch (error) {
      console.error('Error creating training center:', error);
      setErrorMessage(error.message || 'Failed to create training center.');
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 lg:p-10"> 
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create Training Center</h1> 
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{successMessage}</span>
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{errorMessage}</span>
        </div>
      )}
      <div className="bg-white shadow-md rounded-lg p-6 md:p-8 lg:p-10"> 
        <form onSubmit={handleSubmit} className="space-y-6"> 
          <div>
            <label htmlFor="centerName" className="block text-sm font-medium text-gray-700 mb-1"> 
              Center Name
            </label>
            <input
              type="text"
              id="centerName"
              name="centerName"
              value={formData.centerName}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2" 
            />
          </div>
          <div>
            <label htmlFor="centerCode" className="block text-sm font-medium text-gray-700 mb-1">
              Center Code
            </label>
            <input
              type="text"
              id="centerCode"
              name="centerCode"
              value={formData.centerCode}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="detailedAddress" className="block text-sm font-medium text-gray-700 mb-1">
              Detailed Address
            </label>
            <input
              type="text"
              id="detailedAddress"
              name="address.detailedAddress"
              value={formData.address.detailedAddress}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              id="city"
              name="address.city"
              value={formData.address.city}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
              State
            </label>
            <input
              type="text"
              id="state"
              name="address.state"
              value={formData.address.state}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">
              Pincode
            </label>
            <input
              type="text"
              id="pincode"
              name="address.pincode"
              value={formData.address.pincode}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="studentCapacity" className="block text-sm font-medium text-gray-700 mb-1">
              Student Capacity
            </label>
            <input
              type="number"
              id="studentCapacity"
              name="studentCapacity"
              value={formData.studentCapacity}
              onChange={handleChange}
              min="1"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="coursesOfferedInput" className="block text-sm font-medium text-gray-700 mb-1">
              Courses Offered (comma-separated)
            </label>
            <input
              type="text"
              id="coursesOfferedInput"
              name="coursesOfferedInput"
              value={formData.coursesOffered.join(', ')}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
              Contact Email
            </label>
            <input
              type="email"
              id="contactEmail"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
              Contact Phone
            </label>
            <input
              type="tel"
              id="contactPhone"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
            />
          </div>

          <div className="flex justify-between"> 
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Center
            </button>
            <Link
              href="/training-centers"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              View Centers
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCenterPage;