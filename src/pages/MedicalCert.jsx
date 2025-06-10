import React, { useEffect, useRef, useState } from 'react';
import * as fetch from '../js/fetch.js';
import * as send from '../js/send.js';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const MedicalCert = () => {
  const navigate = useNavigate();
  const detailsRef = useRef(null);
  const [form, setForm] = useState({
    patientid: '',
    issueddate: '',
    certFile: null,
    details: '',
  });
  const [certs, setCerts] = useState([]);
  const [patients, setPatients] = useState([]);
  const [patientSearch, setPatientSearch] = useState('');
  const [tableSearch, setTableSearch] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  // Fetch certificates and patients on mount
  useEffect(() => {
    const fetchAll = async () => {
      const [certRes, patientRes] = await Promise.all([
        fetch.getAllMedicalCertificate ? fetch.getAllMedicalCertificate() : Promise.resolve({ data: [] }),
        fetch.getAllPatients ? fetch.getAllPatients() : Promise.resolve({ data: [] }),
      ]);
      setCerts(certRes.data || []);
      setPatients(patientRes.data || []);
    };
    fetchAll();
  }, []);

  // Helper to get patient name by id
  const getPatientName = (id) => {
    const patient = patients.find((pat) => String(pat.patient_id) === String(id));
    return patient ? `${patient.first_name} ${patient.last_name}` : id;
  };

  // Fill form from localStorage on mount
  useEffect(() => {
    const labDetails = localStorage.getItem('labRequestDetails');
    if (labDetails && detailsRef.current) {
      detailsRef.current.value = labDetails;
      setForm(f => ({ ...f, details: labDetails }));
    }
  }, []);

  // When clicking a row, fetch and fill the form
  const handleRowClick = async (row) => {
    setForm({
      patientid: row.patient_id || '',
      issueddate: row.issued_date || row.date || '',
      certFile: null,
      details: row.details || '',
    });
    if (detailsRef.current) {
      detailsRef.current.value = row.details || '';
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'certFile' ? files[0] : value,
    }));
    if (name === 'details' && detailsRef.current) {
      detailsRef.current.value = value;
    }
  };

  // Submit form as FormData
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.patientid || !form.issueddate || !form.details) {
      Swal.fire({
        icon: 'warning',
        title: 'Please fill all required fields.',
      });
      return;
    }

    const data = new FormData();
    data.append('patient_id', form.patientid);
    data.append('issued_date', form.issueddate);
    if (form.certFile) data.append('certificate_file', form.certFile);
    data.append('details', form.details);

    Swal.fire({
      title: 'Saving...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      await send.createMedicalCertificate(data);
      Swal.fire({
        icon: 'success',
        title: 'Saved!',
        text: 'Medical certificate has been issued.',
        timer: 1500,
        showConfirmButton: false
      });
      setForm({
        patientid: '',
        issueddate: '',
        certFile: null,
        details: '',
      });
      if (detailsRef.current) detailsRef.current.value = '';
      // Refresh certs from getAllMedicalCertificate
      const certRes = await fetch.getAllMedicalCertificate();
      setCerts(certRes.data || []);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to issue certificate.',
      });
    }
  };

  // Filter patients for the input dropdown
  const filteredPatients = patients.filter((p) =>
    `${p.first_name} ${p.last_name}`.toLowerCase().includes(patientSearch.toLowerCase())
  );

  // Filter certificates for the table
  const filteredCerts = certs.filter((row) => {
    const patientName = (getPatientName(row.patient_id || row.patientId) || '').toLowerCase();
    const matchesPatient = patientName.includes(tableSearch.toLowerCase());
    const matchesDate = dateFilter ? (row.issued_date || row.date) === dateFilter : true;
    return matchesPatient && matchesDate;
  });

  return (
    <section className="bg-green-50 min-h-screen py-10">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto mb-6">
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
              onClick={() => setModalOpen(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-green-700">Medical Certificate Details</h2>
            <div className="space-y-2">
              <div><b>Certificate ID:</b> {modalData.certificate_id || modalData.certId}</div>
              <div><b>Patient:</b> {getPatientName(modalData.patient_id || modalData.patientId)}</div>
              <div><b>Issued Date:</b> {modalData.issued_date || modalData.date}</div>
              <div><b>Details:</b> {modalData.details}</div>
              {/* Show single file if available */}
              {modalData.certificate_file && (
                <div>
                  <b>File:</b>{' '}
                  <a
                    href={modalData.certificate_file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-700 underline"
                  >
                    View File
                  </a>
                </div>
              )}
              {/* Show multiple files if available */}
              {Array.isArray(modalData.certificate_files) && modalData.certificate_files.length > 0 && (
                <div>
                  <b>Files:</b>
                  <ul className="list-disc ml-5">
                    {modalData.certificate_files.map((file, idx) => (
                      <li key={idx}>
                        <a
                          href={file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-700 underline"
                        >
                          File {idx + 1}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-10">
        {/* Fill up form */}
        <div className="w-full md:w-1/2">
          <div className="bg-white rounded-xl shadow p-8 space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-green-700">
              Issue Medical Certificate
            </h1>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="patientid" className="block mb-2 text-sm font-medium text-green-900">Patient</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Type to search patient..."
                    className="mb-2 bg-green-50 border border-green-300 text-green-900 rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
                    value={
                      form.patientid
                        ? `${patients.find((p) => String(p.patient_id) === String(form.patientid))?.first_name || ''} ${patients.find((p) => String(p.patient_id) === String(form.patientid))?.last_name || ''}`
                        : patientSearch
                    }
                    onChange={(e) => {
                      setPatientSearch(e.target.value);
                      setForm((prev) => ({ ...prev, patientid: '' }));
                    }}
                    autoComplete="off"
                    required
                  />
                  {patientSearch && !form.patientid && (
                    <ul className="absolute z-10 bg-white border border-green-200 rounded w-full max-h-40 overflow-y-auto shadow">
                      {filteredPatients.length > 0 ? (
                        filteredPatients.map((p) => (
                          <li
                            key={p.patient_id}
                            className="px-4 py-2 hover:bg-green-100 cursor-pointer"
                            onClick={() => {
                              setForm((prev) => ({ ...prev, patientid: p.patient_id }));
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
                <label htmlFor="issueddate" className="block mb-2 text-sm font-medium text-green-900">Issued Date</label>
                <input
                  type="date"
                  name="issueddate"
                  id="issueddate"
                  className="bg-green-50 border border-green-300 text-green-900 rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
                  required
                  value={form.issueddate}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="certFile" className="block mb-2 text-sm font-medium text-green-900">Attach File (optional)</label>
                <input
                  type="file"
                  id="certFile"
                  name="certFile"
                  className="block w-full text-sm text-green-900 border border-green-300 rounded-lg cursor-pointer bg-green-50 focus:outline-none"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="details" className="block mb-2 text-sm font-medium text-green-900">Details</label>
                <textarea
                  name="details"
                  id="details"
                  rows="3"
                  ref={detailsRef}
                  className="bg-green-50 border border-green-300 text-green-900 rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
                  placeholder="Certificate details"
                  required
                  value={form.details}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button type="submit" className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-lg px-5 py-3 text-center transition">
                Issue Certificate
              </button>
            </form>
          </div>
        </div>
        {/* View Certificates */}
        <div className="w-full md:w-3/5">
          <div className="bg-white rounded-xl shadow p-8 h-full">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <h2 className="text-xl font-bold mb-4 text-green-700">View Medical Certificates</h2>
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
                    <th className="px-4 py-2">Issued Date</th>
                    <th className="px-4 py-2">Certificate ID</th>
                    <th className="px-4 py-2">Patient</th>
                    <th className="px-4 py-2">Details</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCerts.map(row => (
                    <tr
                      key={row.certificate_id || row.certId}
                      className="bg-white hover:bg-green-50 transition"
                    >
                      <td className="px-4 py-2">{row.issued_date || row.date}</td>
                      <td className="px-4 py-2">{row.certificate_id || row.certId}</td>
                      <td className="px-4 py-2">{getPatientName(row.patient_id || row.patientId)}</td>
                      <td className="px-4 py-2">{row.details}</td>
                      <td className="px-4 py-2">
                        <button
                          className="text-green-600 hover:text-green-900"
                          title="View Details"
                          onClick={() => {
                            setModalData(row);
                            setModalOpen(true);
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="inline w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredCerts.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center text-gray-500 py-4">No Certificates Found</td>
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

export default MedicalCert;