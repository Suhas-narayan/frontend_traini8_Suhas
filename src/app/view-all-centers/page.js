'use client';

import { useState, useEffect } from 'react';
import { getAllTrainingCenters } from '@/lib/api';

const ViewAllCentersPage = () => {
  const [trainingCenters, setTrainingCenters] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTrainingCenters();
  }, []); 

  const fetchTrainingCenters = async () => {
    try {
      const centers = await getAllTrainingCenters(); 
      setTrainingCenters(centers);
      setError(null);
    } catch (err) {
      console.error('Error fetching training centers:', err);
      setError(err.message || 'Failed to fetch training centers.');
      setTrainingCenters([]);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 lg:p-10"> 
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">All Training Centers</h1> 

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

export default ViewAllCentersPage;