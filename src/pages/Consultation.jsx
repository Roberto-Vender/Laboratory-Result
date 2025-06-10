import React, { useState, useEffect } from 'react';
import * as fetch from '../js/fetch.js';
import * as send from '../js/send.js';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
async function getAllDoctors() {
  const response = await fetch.getAllDoctors();
  return response.data;
}
async function getAllConsultations() {
  const response = await fetch.getAllConsultation();
  return response.data;
}
const Consultation = () => {
  const [doctors, setDoctors] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [form, setForm] = useState({
    patient_id: '',
    doctor_id: '',
    visit_date: '',
    diagnosis: '',
    medical_advice: ''
  });
  const navigate = useNavigate();
  
  useEffect(() => {
    const getDoctors = async () => {
      const doctorList = await getAllDoctors();
      const consultationList = await getAllConsultations();
      setDoctors(doctorList || []);
      setConsultations(consultationList || []);
    }
    getDoctors();
  }, []);

  // Get all input values in form state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await send.createConsultation(form);
    if (response.message.includes('successfully')) {
      Swal.fire({
        title: response.message,
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(async() => {
        const doctors = await getAllDoctors();
        setDoctors(doctors);
        setForm({
          patient_id: '',
          doctor_id: '',
          visit_date: '',
          diagnosis: '',
          medical_advice: ''
        });
      });
    } else {
      Swal.fire({
        title: response.message,
        icon: 'error',
        confirmButtonText: 'TRY AGAIN'
      });
    }
  }

  return (
    <section className="bg-green-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10">
        {/* Fill up form */}
        <div className="w-full md:w-1/2">
          <div className="bg-white rounded-xl shadow p-10 space-y-6">
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-green-700">
              Record Consultation
            </h1>
            {/* Back Button - outside the form */}
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
              <div>
                <label htmlFor="patient_id" className="block mb-2 text-sm font-medium text-green-900">Patient ID</label>
                <input
                  type="text"
                  name="patient_id"
                  id="patient_id"
                  className="bg-green-50 border border-green-300 text-green-900 rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
                  placeholder="Patient ID"
                  required
                  value={form.patient_id}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="doctor_id" className="block mb-2 text-sm font-medium text-green-900">Doctor ID</label>
                <select
                  name="doctor_id"
                  id="doctor_id"
                  className="bg-green-50 border border-green-300 text-green-900 rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
                  required
                  value={form.doctor_id}
                  onChange={handleChange}
                >
                  <option value="">Select Doctor</option>
                  {doctors.length > 0 ? doctors.map((doctor,index) => (
                    <option key={index} value={doctor.doctor_id}>
                      {doctor.doctor_name} {doctor.specialization ? `(${doctor.specialization})` : ''}
                    </option>
                  ))
                    : <option value="" disabled>No Doctors Available</option>
                  }
                </select>
              </div>
              <div>
                <label htmlFor="visit_date" className="block mb-2 text-sm font-medium text-green-900">Visit Date</label>
                <input
                  type="date"
                  name="visit_date"
                  id="visit_date"
                  className="bg-green-50 border border-green-300 text-green-900 rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
                  required
                  value={form.visit_date}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="diagnosis" className="block mb-2 text-sm font-medium text-green-900">Diagnosis</label>
                <input
                  type="text"
                  name="diagnosis"
                  id="diagnosis"
                  className="bg-green-50 border border-green-300 text-green-900 rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
                  placeholder="Diagnosis"
                  required
                  value={form.diagnosis}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="medical_advice" className="block mb-2 text-sm font-medium text-green-900">Medical Advice</label>
                <textarea
                  name="medical_advice"
                  id="medical_advice"
                  rows="3"
                  className="bg-green-50 border border-green-300 text-green-900 rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
                  placeholder="Medical Advice"
                  required
                  value={form.medical_advice}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button type="submit" className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-lg px-5 py-3 text-center transition">
                Save Consultation
              </button>
            </form>
          </div>
        </div>
        {/* View Consultation */}
        <div className="w-full md:w-3/5">
          <div className="bg-white rounded-xl shadow p-10 h-full">
            <h2 className="text-2xl font-bold mb-6 text-green-700">View Consultations</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-md text-left text-green-900">
                <thead className="text-xs uppercase bg-green-100 text-green-700">
                  <tr>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Patient ID</th>
                    <th className="px-4 py-2">Doctor ID</th>
                    <th className="px-4 py-2">Diagnosis</th>
                    <th className="px-4 py-2">Advice</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white hover:bg-green-50">
                    {
                      consultations.length > 0 ? consultations.map((consultation, index) => (
                        <React.Fragment key={index}>
                          <td className="px-4 py-2">{consultation.visit_date}</td>
                          <td className="px-4 py-2">{consultation.patient_id}</td>
                          <td className="px-4 py-2">{consultation.doctor_id}</td>
                          <td className="px-4 py-2">{consultation.diagnosis}</td>
                          <td className="px-4 py-2">{consultation.medical_advice}</td>
                        </React.Fragment>
                      )) : <tr><td colSpan="5" className="text-center text-gray-500">No Consultations Found</td></tr>
                    }
                  </tr>
                  {/* Add more mock rows as needed */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Consultation;