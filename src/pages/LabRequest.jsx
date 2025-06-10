import React, { useEffect, useState } from "react";
import * as fetch from '../js/fetch.js';
import * as send from '../js/send.js';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

async function getAllPatients() {
  const response = await fetch.getAllPatients();
  return response.data;
}
async function getAllTests() {
  const response = await fetch.getAllTest();
  return response.data;
}

const LabRequest = () => {
  const [patients, setPatients] = useState([]);
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    patient: '',
    requestedTests: ''
  });

  useEffect(() => {
    const fetchPatients = async () => {
      const patientList = await getAllPatients();
      const testList = await getAllTests();
      setTests(testList || []);
      setPatients(patientList || []);
    }
    fetchPatients();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Find patient by full name (case-insensitive)
    const foundPatient = patients.find(
      (p) =>
        p.first_name &&
        p.last_name &&
        `${p.first_name} ${p.last_name}`.toLowerCase().trim() === form.patient.toLowerCase().trim()
    );

    if (!foundPatient) {
      Swal.fire({
        icon: 'error',
        title: 'Patient not found',
        text: 'Please enter a valid patient full name.',
      });
      return;
    }

    // Prepare data for submission
    const data = {
      patient_id: foundPatient.patient_id,
      test_id: form.requestedTests
    };

    // Send the lab result request
    const response = await send.createLabResult(data);

    if (response && response.message && response.message.toLowerCase().includes('success')) {
      Swal.fire({
        icon: 'success',
        title: 'Lab Request Submitted',
        text: `Lab request for Patient ID: ${foundPatient.patient_id} has been submitted.`,
      });
      setForm({ patient: '', requestedTests: '' });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: response?.message || 'An error occurred.',
      });
    }
  };

  return (
    <section className="bg-green-50 min-h-screen flex flex-col md:flex-row justify-center items-center gap-16 py-16">
      {/* Request Lab Test Card (left) */}
      <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-green-700">Request Lab Test</h2>
        <form className="space-y-4 w-full" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="patient" className="block mb-2 text-sm font-medium text-green-900">Patient Full Name</label>
            <input
              type="text"
              id="patient"
              name="patient"
              className="bg-green-50 border border-green-300 text-green-900 rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
              placeholder="Enter Patient Full Name"
              required
              value={form.patient}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="requestedTests" className="block mb-2 text-sm font-medium text-green-900">Requested Tests</label>
            <select
              id="requestedTests"
              name="requestedTests"
              className="bg-green-50 border border-green-300 text-green-900 rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
              required
              value={form.requestedTests}
              onChange={handleChange}
            >
              <option value="">Select Test</option>
              {tests.map((test) => (
                <option key={test.test_id} value={test.test_id}>
                  {test.test_name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="w-full text-white bg-green-600 hover:bg-green-700 rounded-lg px-5 py-3 font-medium mt-4 transition">
            Request Test
          </button>
        </form>
      </div>
    </section>
  );
};

export default LabRequest;
