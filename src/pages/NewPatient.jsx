import React, { useState, useEffect } from 'react';
import * as send from '../js/send.js'
import * as fetchApi from '../js/fetch.js'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const NewPatient = () => {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    dob: '',
    gender: '',
    contact: '',
    address: '',
  });
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      const response = await fetchApi.getAllPatients();
      setPatients(response.data || []);
    };
    fetchPatients();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await send.createPatient(form);
    if (response.message.includes('Successfully')) {
      Swal.fire({
        title: response.message,
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => { navigate('/Dashboard')  });
    } else {
      Swal.fire({
        title: response.message,
        icon: 'error',
        confirmButtonText: 'TRY AGAIN'
      });
    }
  };

  return (
    <section className="bg-green-50 min-h-screen flex items-center justify-center">
      <div className="flex flex-col md:flex-row items-start justify-center px-6 py-8 mx-auto min-h-screen w-full gap-8">
        {/* Patient Registration Form */}
        <div className="w-full md:w-1/2">
          <div className="bg-white rounded-xl shadow p-10 space-y-8">
            <div className="flex flex-col items-center mb-4">
              <span className="bg-green-100 rounded-full p-3 mb-2">
                {/* Clinic/medical icon */}
                <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" fill="white" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v10m5-5H7" stroke="currentColor" strokeWidth="2.5" />
                </svg>
              </span>
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-green-700">
                Register New Patient
              </h1>
            </div>
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
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-green-900">First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    className="bg-green-50 border border-green-300 text-green-900 rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3 text-lg"
                    placeholder="First Name"
                    required
                    value={form.first_name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-green-900">Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    className="bg-green-50 border border-green-300 text-green-900 rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3 text-lg"
                    placeholder="Last Name"
                    required
                    value={form.last_name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="dob" className="block mb-2 text-sm font-medium text-green-900">Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    id="dob"
                    className="bg-green-50 border border-green-300 text-green-900 rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3 text-lg"
                    required
                    value={form.dob}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="gender" className="block mb-2 text-sm font-medium text-green-900">Gender</label>
                  <select
                    name="gender"
                    id="gender"
                    className="bg-green-50 border border-green-300 text-green-900 rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3 text-lg"
                    required
                    value={form.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="contact" className="block mb-2 text-sm font-medium text-green-900">Contact Info</label>
                <input
                  type="tel"
                  name="contact"
                  id="contact"
                  className="bg-green-50 border border-green-300 text-green-900 rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3 text-lg"
                  placeholder="+63 XXX XXX XXXX"
                  required
                  value={form.contact}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="address" className="block mb-2 text-sm font-medium text-green-900">Address</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  className="bg-green-50 border border-green-300 text-green-900 rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3 text-lg"
                  placeholder="Address"
                  required
                  value={form.address}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-lg px-5 py-3 text-center transition"
              >
                Register Patient
              </button>
            </form>
          </div>
        </div>
        {/* Side List of Patients */}
        <div className="w-full md:w-1/2 mt-8 md:mt-0">
          <div className="bg-white rounded-xl shadow p-6 h-full">
            <h2 className="text-xl font-bold mb-4 text-green-700">Patient List</h2>
            <div className="overflow-x-auto max-h-[500px]">
              <table className="min-w-full text-md text-left text-green-900">
                <thead className="text-xs uppercase bg-green-100 text-green-700">
                  <tr>
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Gender</th>
                    <th className="px-4 py-2">DOB</th>
                    <th className="px-4 py-2">Contact</th>
                    <th className="px-4 py-2">Address</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.length > 0 ? patients.map((p) => (
                    <tr key={p.patient_id} className="hover:bg-green-50">
                      <td className="px-4 py-2">{p.patient_id}</td>
                      <td className="px-4 py-2">{p.first_name} {p.last_name}</td>
                      <td className="px-4 py-2">{p.gender}</td>
                      <td className="px-4 py-2">{p.dob}</td>
                      <td className="px-4 py-2">{p.contact}</td>
                      <td className="px-4 py-2">{p.address}</td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="6" className="text-center text-gray-500 py-4">No patients found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewPatient;