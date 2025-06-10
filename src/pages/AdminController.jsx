import React, { useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import * as fetch from '../js/fetch.js';
import * as send from '../js/send.js';
import Swal from 'sweetalert2';
async function getAllDoctors() {
  const response = await fetch.getAllDoctors();
  return response.data;
}
async function getAllTest() {
  const response = await fetch.getAllTest();
  return response.data;
}
const AdminController = () => {
  const [doctors, setDoctors] = useState([]);
  const [tests, setTests] = useState([]);
  const [doctorName, setDoctorName] = useState('');
  const [doctorEmail, setDoctorEmail] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [testName, setTestName] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
      const fetchInitialData = async () => {
        const doctorList = await getAllDoctors() ?? [];
        const testList = await getAllTest() ?? [];
        setDoctors(doctorList);
        setTests(testList);
      };
      fetchInitialData();
    }, []);
    const handleAddDoctor = async (e) => {
      e.preventDefault();
      const data = {
        doctor_name: doctorName,
        doctor_email: doctorEmail,
        specialization: specialization
      };
      const response = await send.createDoctor(data);
      if (response.message.includes('successfully')) {
        Swal.fire({
          title: response.message,
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(async () => {
          const updatedDoctors = await getAllDoctors();
          setDoctors(updatedDoctors);
          setDoctorName('');
          setDoctorEmail('');
          setSpecialization('');
        });
      } else {
        Swal.fire({
          title: response.message,
          icon: 'error',
          confirmButtonText: 'TRY AGAIN'
        });
      }
    };    
    const handleAddTest = async (e) => {
      e.preventDefault();
      const data = {
        test_name: testName
      };
      if (tests.includes(testName)) {
        
      }
      const response = await send.createTest(data);
      if (response.message.includes('successfully')) {
        Swal.fire({
          title: response.message,
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(async () => {
          const updatedTests = await getAllTest(); 
          setTests(updatedTests);                  
          setTestName('');                        
        });
      } else {
        Swal.fire({
          title: response.message,
          icon: 'error',
          confirmButtonText: 'TRY AGAIN'
        });
      }
    };
    
  return (
    <section className="bg-green-50 min-h-screen flex flex-col justify-center items-center py-16">
      <div className="bg-white rounded-xl shadow p-10 flex flex-col items-center w-full max-w-3xl space-y-10">
        <h2 className="text-2xl font-bold mb-2 text-green-700">Admin Controller</h2>
        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate('/Dashboard')}
          className="mb-4 inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition font-medium"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </button>
        {/* Add Doctor Form */}
        <div className="w-full">
          <h3 className="text-lg font-semibold mb-4 text-green-700">Add Doctor</h3>
          <form className="space-y-4 w-full" onSubmit={handleAddDoctor}>
            <div>
              <label htmlFor="doctorName" className="block mb-2 text-sm font-medium text-green-900">Doctor Name</label>
              <input
                type="text"
                id="doctorName"
                name="doctorName"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                className="bg-green-50 border border-green-300 text-green-900 rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
                placeholder="Enter Doctor's Name"
                required
              />
            </div>
            <div>
              <label htmlFor="doctorEmail" className="block mb-2 text-sm font-medium text-green-900">Email</label>
              <input
                type="email"
                id="doctorEmail"
                name="doctorEmail"
                value={doctorEmail}
                onChange={(e) => setDoctorEmail(e.target.value)}
                className="bg-green-50 border border-green-300 text-green-900 rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
                placeholder="Enter Email"
                required
              />
            </div>
            <div>
              <label htmlFor="specialization" className="block mb-2 text-sm font-medium text-green-900">Specialization</label>
              <input
                type="text"
                id="specialization"
                name="specialization"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                className="bg-green-50 border border-green-300 text-green-900 rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
                placeholder="Enter Specialization"
                required
              />
            </div>
            <button type="submit" className="w-full text-white bg-green-600 hover:bg-green-700 rounded-lg px-5 py-3 font-medium mt-4 transition">
              Add Doctor
            </button>
          </form>
        </div>
        {/* List of Existing Doctors */}
        <div className="w-full">
          <h3 className="text-lg font-semibold mb-2 text-green-700">Existing Doctors</h3>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <ul className="divide-y divide-green-200">
              {doctors.length > 0 ? doctors.map((doc, idx) => (
                <li key={idx} className="py-2">
                  <span className="font-semibold text-green-900">{doc.doctor_name}</span>
                  <span className="ml-2 text-green-700 text-sm">({doc.specialization})</span>
                  <div className="text-green-500 text-xs">{doc.doctor_email}</div>
                </li>
              )): (
                <li className="py-2 text-green-500">No doctors available</li>
              )}
            </ul>
          </div>
        </div>
        {/* Add Test Form */}
        <div className="w-full">
          <h3 className="text-lg font-semibold mb-4 text-green-700">Add Laboratory Test</h3>
          <form className="space-y-4 w-full" onSubmit={handleAddTest}>
            <div>
              <label htmlFor="testName" className="block mb-2 text-sm font-medium text-green-900">Test Name</label>
              <input
                type="text"
                id="testName"
                name="testName"
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
                className="bg-green-50 border border-green-300 text-green-900 rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
                placeholder="Enter Test Name"
                required
              />
            </div>
            <button type="submit" className="w-full text-white bg-green-600 hover:bg-green-700 rounded-lg px-5 py-3 font-medium mt-4 transition">
              Add Test
            </button>
          </form>
        </div>
        {/* List of Existing Tests */}
        <div className="w-full">
          <h3 className="text-lg font-semibold mb-2 text-green-700">Existing Laboratory Tests</h3>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <ul className="divide-y divide-green-200">
              {tests.length > 0 ? tests.map((test, idx) => (
                <li key={idx} className="py-2 text-green-900 font-semibold">{test.test_name}</li>
              )): (<li className="py-2 text-green-500">No tests available</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminController;
