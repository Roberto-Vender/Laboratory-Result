import React, { useEffect, useState } from 'react';
import * as fetch from '../js/fetch.js';
import * as send from '../js/send.js';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

async function getAllVisitHistory() {
  // Replace with your actual fetch logic
  const response = await fetch.getAllVisitHistory();
  return response.data;
}

const VisitHistory = () => {
  const [visitHistory, setVisitHistory] = useState([]);
  const [form, setForm] = useState({
    patient_id: '',
    reason_for_visit: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVisitHistory = async () => {
      const visit = await getAllVisitHistory();
      setVisitHistory(visit || []);
    }
    fetchVisitHistory();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Replace with your actual send logic
    const response = await send.createVisitHistory(form);
    if (response.message && response.message.toLowerCase().includes('success')) {
      Swal.fire({
        title: response.message,
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(async () => {
        const updatedHistory = await getAllVisitHistory();
        setVisitHistory(updatedHistory || []);
        setForm({ patient_id: '', reason_for_visit: '' });
      });
    } else {
      Swal.fire({
        title: response.message || 'Error',
        icon: 'error',
        confirmButtonText: 'TRY AGAIN'
      });
    }
  };

  return (
    <section className="bg-green-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-10">
        {/* Fill up form */}
        <div className="w-full md:w-1/2">
          <div className="bg-white rounded-xl shadow p-8 space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-green-700">
              Record Visit History
            </h1>
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
                <label htmlFor="reason_for_visit" className="block mb-2 text-sm font-medium text-green-900">Reason For Visit</label>
                <textarea
                  name="reason_for_visit"
                  id="reason_for_visit"
                  rows="3"
                  className="bg-green-50 border border-green-300 text-green-900 rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
                  placeholder="Reason for visit"
                  required
                  value={form.reason_for_visit}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button type="submit" className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-lg px-5 py-3 text-center transition">
                Save Visit
              </button>
            </form>
          </div>
        </div>
        {/* View Visit History */}
        <div className="w-full md:w-3/5">
          <div className="bg-white rounded-xl shadow p-8 h-full">
            <h2 className="text-xl font-bold mb-4 text-green-700">View Visit History</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-md text-left text-green-900">
                <thead className="text-xs uppercase bg-green-100 text-green-700">
                  <tr>
                    <th className="px-4 py-2">Visit Date</th>
                    <th className="px-4 py-2">Patient ID</th>
                    <th className="px-4 py-2">Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {visitHistory.length > 0 ? visitHistory.map((visit, idx) => (
                    <tr key={visit.visit_id || idx} className={idx % 2 === 0 ? "bg-white hover:bg-green-50" : "bg-green-50"}>
                      <td className="px-4 py-2">{visit.visit_date || '-'}</td>
                      <td className="px-4 py-2">{visit.patient_id || '-'}</td>
                      <td className="px-4 py-2">{visit.reason_for_visit || '-'}</td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="4" className="text-center text-gray-500 py-4">No Visit History Found</td>
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
}
export default VisitHistory;