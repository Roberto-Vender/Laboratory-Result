import React, { useState, useEffect } from 'react';
import * as fetch from '../js/fetch.js';
import * as send from '../js/send.js';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; // Add this import

const initialFormState = {
  lab_id: '',
  patient_id: '',
  test_id: '',
  lab_file: null,
  lab_description: '',
  lab_date: '',
  lab_status: '',
};

const LaboratoryResult = () => {
  const [form, setForm] = useState(initialFormState);
  const [labResults, setLabResults] = useState([]);
  const [patients, setPatients] = useState([]);
  const [tests, setTests] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [patientSearch, setPatientSearch] = useState('');
  const [tableSearch, setTableSearch] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const navigate = useNavigate(); // Add this line

  // Fetch lab results, patients, and tests on mount
  useEffect(() => {
    const fetchAll = async () => {
      const [labRes, patientRes, testRes] = await Promise.all([
        fetch.getAllLabResults(),
        fetch.getAllPatients(),
        fetch.getAllTest(),
      ]);
      setLabResults(labRes.data || []);
      setPatients(patientRes.data || []);
      setTests(testRes.data || []);
    };
    fetchAll();
  }, []);

  // Helpers to get names
  const getPatientName = (id) => {
    const p = patients.find((pat) => String(pat.patient_id) === String(id));
    return p ? `${p.first_name} ${p.last_name}` : '';
  };
  const getTestName = (id) => {
    const t = tests.find((test) => String(test.test_id) === String(id));
    return t ? t.test_name : id;
  };

  // Modal open handler
  const handleViewDetails = (row) => {
    setModalData(row);
    setModalOpen(true);
  };

  // Modal close handler
  const closeModal = () => {
    setModalOpen(false);
    setModalData(null);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'lab_file' ? files[0] : value,
    }));
  };

  // Handle form submit (update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.patient_id || !form.test_id) return;

    const data = new FormData();
    data.append('patient_id', form.patient_id);
    data.append('test_id', form.test_id);
    if (form.lab_file) data.append('lab_file', form.lab_file);
    data.append('lab_description', form.lab_description);

    Swal.fire({
      title: 'Saving...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      await send.createLabResult(data);
      Swal.fire({
        icon: 'success',
        title: 'Saved!',
        text: 'Lab result has been saved successfully.',
        timer: 1500,
        showConfirmButton: false
      });
      setForm(initialFormState);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to save lab result.',
      });
    }
    // Optionally, refresh the table after update
  };

  // Filter patients for the input dropdown
  const filteredPatients = patients.filter((p) =>
    `${p.first_name} ${p.last_name}`.toLowerCase().includes(patientSearch.toLowerCase())
  );

  // Filter lab results for the table
  const filteredLabResults = labResults.filter((row) => {
    const patientName = getPatientName(row.patient_id).toLowerCase();
    const matchesPatient = patientName.includes(tableSearch.toLowerCase());
    const matchesDate = dateFilter ? row.lab_date === dateFilter : true;
    return matchesPatient && matchesDate;
  });

  return (
    <section className="bg-green-50 min-h-screen py-10">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto mb-6">
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-green-200 hover:bg-green-300 text-green-900 font-semibold px-4 py-2 rounded transition"
        >
          &larr; Back to Dashboard
        </button>
      </div>
      {/* Modal for viewing details */}
      {modalOpen && modalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative">
            <button
              className="absolute top-2 right-2 text-green-700 hover:text-green-900 text-2xl"
              onClick={closeModal}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-green-700">Lab Result Details</h2>
            <div className="space-y-2">
              <div><b>Lab ID:</b> {modalData.lab_id}</div>
              <div><b>Patient:</b> {getPatientName(modalData.patient_id)}</div>
              <div><b>Test:</b> {getTestName(modalData.test_id)}</div>
              <div><b>Description:</b> {modalData.lab_description}</div>
              <div><b>Date:</b> {modalData.lab_date}</div>
              {modalData.lab_file && (
                <div>
{modalData.lab_file && (
  <p>
                  <b>File:</b>{' '}
                  <a
                    href={`http://localhost:8000/uploads/results/${modalData.lab_file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-700 underline"
                  >
                    {decodeURIComponent(modalData.lab_file.split('_').slice(1).join('_'))}
                  </a>
                </p>
              )}

                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-1/2 space-y-10">
          {/* Input Lab Results */}
          <div className="bg-white rounded-xl shadow p-8">
            <h2 className="text-xl font-bold mb-4 text-green-700">Input Lab Results</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Searchable Patient Select */}
              <div>
                <label htmlFor="patient_id" className="block mb-2 text-sm font-medium text-green-900">Patient</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Type to search patient..."
                    className="mb-2 bg-green-50 border border-green-300 text-green-900 rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
                    value={
                      form.patient_id
                        ? `${patients.find((p) => String(p.patient_id) === String(form.patient_id))?.first_name || ''} ${patients.find((p) => String(p.patient_id) === String(form.patient_id))?.last_name || ''}`
                        : patientSearch
                    }
                    onChange={(e) => {
                      setPatientSearch(e.target.value);
                      setForm((prev) => ({ ...prev, patient_id: '' }));
                    }}
                    autoComplete="off"
                    required
                  />
                  {patientSearch && !form.patient_id && (
                    <ul className="absolute z-10 bg-white border border-green-200 rounded w-full max-h-40 overflow-y-auto shadow">
                      {filteredPatients.length > 0 ? (
                        filteredPatients.map((p) => (
                          <li
                            key={p.patient_id}
                            className="px-4 py-2 hover:bg-green-100 cursor-pointer"
                            onClick={() => {
                              setForm((prev) => ({ ...prev, patient_id: p.patient_id }));
                              setPatientSearch('');
                            }}
                          >
                            {p.first_name} {p.last_name}
                          </li>
                        ))
                      ) : (
                        <li className="px-4 py-2 text-gray-500">No match found</li>
                      )}
                    </ul>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="test_id" className="block mb-2 text-sm font-medium text-green-900">Test</label>
                <select
                  id="test_id"
                  name="test_id"
                  className="bg-green-50 border border-green-300 text-green-900 rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
                  value={form.test_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Test</option>
                  {tests.map((t) => (
                    <option key={t.test_id} value={t.test_id}>
                      {t.test_name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="labFile" className="block mb-2 text-sm font-medium text-green-900">Attach File</label>
                <input
                  type="file"
                  id="lab_file"
                  name="lab_file"
                  required
                  className="block w-full text-sm text-green-900 border border-green-300 rounded-lg cursor-pointer bg-green-50 focus:outline-none"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="lab_description" className="block mb-2 text-sm font-medium text-green-900">Result Description</label>
                <textarea
                  id="lab_description"
                  name="lab_description"
                  rows="3"
                  className="bg-green-50 border border-green-300 text-green-900 rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
                  placeholder="Enter result details"
                  required
                  value={form.lab_description}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-green-600 hover:bg-green-700 rounded-lg px-5 py-3 font-medium transition"
                disabled={!form.patient_id || !form.test_id}
              >
                Save Result
              </button>
            </form>
          </div>
        </div>

        {/* View Lab Results */}
        <div className="w-full md:w-3/5">
          <div className="bg-white rounded-xl shadow p-8 h-full">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <h2 className="text-xl font-bold text-green-700">View Lab Results</h2>
              <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                <input
                  type="text"
                  placeholder="Search patient name..."
                  className="bg-green-50 border border-green-300 text-green-900 rounded-lg focus:ring-green-500 focus:border-green-500 px-3 py-2 w-full md:w-56"
                  value={tableSearch}
                  onChange={(e) => setTableSearch(e.target.value)}
                />
                <input
                  type="date"
                  className="bg-green-50 border border-green-300 text-green-900 rounded-lg focus:ring-green-500 focus:border-green-500 px-3 py-2 w-full md:w-44"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-md text-left text-green-900">
                <thead className="text-xs uppercase bg-green-100 text-green-700">
                  <tr>
                    <th className="px-4 py-2">Lab ID</th>
                    <th className="px-4 py-2">Patient</th>
                    <th className="px-4 py-2">Test</th>
                    <th className="px-4 py-2">Description</th>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLabResults.map((row) => (
                    <tr
                      key={row.lab_id}
                      className="bg-white hover:bg-green-50 transition"
                    >
                      <td className="px-4 py-2">{row.lab_id}</td>
                      <td className="px-4 py-2">{getPatientName(row.patient_id)}</td>
                      <td className="px-4 py-2">{getTestName(row.test_id)}</td>
                      <td className="px-4 py-2">{row.lab_description}</td>
                      <td className="px-4 py-2">{row.lab_date}</td>
                      <td className="px-4 py-2">
                        <button
                          className="text-green-600 hover:text-green-900"
                          title="View Details"
                          onClick={() => handleViewDetails(row)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="inline w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredLabResults.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center text-gray-500 py-4">No Lab Results Found</td>
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

export default LaboratoryResult;