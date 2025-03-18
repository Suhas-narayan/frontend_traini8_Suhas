'use client';

import { useState, useEffect } from 'react';
import { getAllTrainingCenters } from '@/lib/api';

const TrainingCentersPage = () => {
  const [trainingCenters, setTrainingCenters] = useState([]);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    centerName: '',
    centerCode: '',
    city: '',
    state: '',
  });

  useEffect(() => {
    console.log("useEffect hook running, filters:", filters); 
    fetchTrainingCenters();
  }, [filters]);

  const fetchTrainingCenters = async () => {
    try {
      const centers = await getAllTrainingCenters(filters);
      setTrainingCenters(centers);
      setError(null);
    } catch (err) {
      console.error('Error fetching training centers:', err);
      setError(err.message || 'Failed to fetch training centers.');
      setTrainingCenters([]);
    }
  };

  const handleFilterChange = (e) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [e.target.name]: e.target.value,
    }));
  };

  const handleViewAllCenters = () => {
    setFilters({
      centerName: '',
      centerCode: '',
      city: '',
      state: '',
    });
  };

  return (
    <div className="container mx-auto p-4 md:p-8 lg:p-10"> 
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Training Centers</h1>

      

      <div className="mb-6 bg-white shadow-md rounded-lg p-6 md:p-8 lg:p-10"> 
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Filter Centers</h2> 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"> 
          <div>
            <label htmlFor="centerNameFilter" className="block text-sm font-medium text-gray-700 mb-1">Center Name</label>
            <input
              type="text"
              id="centerNameFilter"
              name="centerName"
              value={filters.centerName}
              onChange={handleFilterChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2" 
            />
          </div>
          <div>
            <label htmlFor="centerCodeFilter" className="block text-sm font-medium text-gray-700 mb-1">Center Code</label>
            <input
              type="text"
              id="centerCodeFilter"
              name="centerCode"
              value={filters.centerCode}
              onChange={handleFilterChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2" 
            />
          </div>
          <div>
            <label htmlFor="cityFilter" className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input
              type="text"
              id="cityFilter"
              name="city"
              value={filters.city}
              onChange={handleFilterChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2" 
            />
          </div>
          <div>
            <label htmlFor="stateFilter" className="block text-sm font-medium text-gray-700 mb-1">State</label>
            <input
              type="text"
              id="stateFilter"
              name="state"
              value={filters.state}
              onChange={handleFilterChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2" 
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Center Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Center Code</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Capacity</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Courses Offered</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Email</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Phone</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {trainingCenters.map((center) => (
              <tr key={center.id}>
                <td className="px-6 py-4 whitespace-nowrap">{center.centerName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{center.centerCode}</td>
                <td className="px-6 py-4 whitespace-nowrap">{center.address?.city}</td>
                <td className="px-6 py-4 whitespace-nowrap">{center.address?.state}</td>
                <td className="px-6 py-4 whitespace-nowrap">{center.studentCapacity}</td>
                <td className="px-6 py-4 whitespace-nowrap">{center.coursesOffered?.join(', ') || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap">{center.contactEmail}</td>
                <td className="px-6 py-4 whitespace-nowrap">{center.contactPhone}</td>
              </tr>
            ))}
            {trainingCenters.length === 0 && !error && (
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-center" colSpan={8}>No training centers found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrainingCentersPage;