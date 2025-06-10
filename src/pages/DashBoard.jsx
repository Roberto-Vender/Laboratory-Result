import React, { useEffect, useState } from 'react';
import * as fetch from '../js/fetch.js';

const sidebarLinks = [
  {
    href: '/DashBoard',
    label: 'Dashboard',
    icon: (
      <svg className="w-6 h-6 mr-3 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h3m10-11v11a1 1 0 01-1 1h-3m-6 0h6" />
      </svg>
    ),
  },
  {
    href: '/NewPatient',
    label: 'Patient Management',
    icon: (
      <svg className="w-6 h-6 mr-3 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    href: '/Consultation',
    label: 'Consultation Record',
    icon: (
      <svg className="w-6 h-6 mr-3 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5h6M9 3h6a2 2 0 012 2v14a2 2 0 01-2 2H9a2 2 0 01-2-2V5a2 2 0 012-2z" />
      </svg>
    ),
  },
  {
    href: '/VisitHistory',
    label: 'Visit History',
    icon: (
      <svg className="w-6 h-6 mr-3 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    href: '/LaboratoryResult',
    label: 'Laboratory Result',
    icon: (
      <svg className="w-6 h-6 mr-3 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.341A8 8 0 116.343 4.572M21 21l-6-6" />
      </svg>
    ),
  },
  {
    href: '/MedicalCert',
    label: 'Medical Certificate',
    icon: (
      <svg className="w-6 h-6 mr-3 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h10M7 11h10M7 15h6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    href: '/AdminController',
    label: 'Admin Controller',
    icon: (
      <svg className="w-6 h-6 mr-3 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0a1.724 1.724 0 002.573 1.02c.797-.46 1.757.36 1.297 1.157a1.724 1.724 0 001.02 2.573c.921.3.921 1.603 0 1.902a1.724 1.724 0 00-1.02 2.573c.46.797-.36 1.757-1.157 1.297a1.724 1.724 0 00-2.573 1.02c-.3.921-1.603.921-1.902 0a1.724 1.724 0 00-2.573-1.02c-.797.46-1.757-.36-1.297-1.157a1.724 1.724 0 00-1.02-2.573c-.921-.3-.921-1.603 0-1.902a1.724 1.724 0 001.02-2.573c-.46-.797.36-1.757 1.157-1.297a1.724 1.724 0 002.573-1.02z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

const DashBoard = () => {
  const [visitHistory, setVisitHistory] = useState([]);
  const [patients, setPatients] = useState([]);
  const [labResults, setLabResults] = useState([]);
  const [medicalCerts, setMedicalCerts] = useState([]);

  useEffect(() => {
    // Fetch visit history, patients, lab results, and medical certificates
    const fetchData = async () => {
      const [visitRes, patientsRes, labRes, certRes] = await Promise.all([
        fetch.getAllVisitHistory ? fetch.getAllVisitHistory() : Promise.resolve({ data: [] }),
        fetch.getAllPatients ? fetch.getAllPatients() : Promise.resolve({ data: [] }),
        fetch.getAllLabResults ? fetch.getAllLabResults() : Promise.resolve({ data: [] }),
        fetch.getAllMedicalCertificate ? fetch.getAllMedicalCertificate() : Promise.resolve({ data: [] }),
      ]);
      setVisitHistory(visitRes.data || []);
      setPatients(patientsRes.data || []);
      setLabResults(labRes.data || []);
      setMedicalCerts(certRes.data || []);
    };
    fetchData();
  }, []);

  // Helper to get patient name by id
  const getPatientName = (id) => {
    const patient = patients.find((pat) => String(pat.patient_id) === String(id));
    return patient ? `${patient.first_name} ${patient.last_name}` : id;
  };

  return (
    <section className="bg-green-50 min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-green-100 flex flex-col py-8 px-4 min-h-screen shadow-lg">
        <div className="flex items-center mb-10">
          <span className="bg-green-100 rounded-full p-2 mr-3">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" fill="white"/>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v10m5-5H7" stroke="currentColor" strokeWidth="2.5"/>
            </svg>
          </span>
          <a href="/Home" className="text-green-700 text-lg font-bold">HJ LABORATORY & DIAGNOSTIC CENTER</a>
        </div>
        <nav className="flex-1">
          <ul className="space-y-2">
            {sidebarLinks.map(link => (
              <li key={link.href}>
                <a href={link.href} className="flex items-center px-3 py-2 rounded-lg text-green-700 hover:bg-green-100 transition font-medium">
                  {link.icon}
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-green-50 min-h-screen">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-green-800">Dashboard</h1>
          {/* Logout Button */}
          <button
            onClick={() => window.location.href = '/Home'}
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-green-700 transition"
          >
            Logout
          </button>
        </header>
        {/* Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow flex items-center">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <div className="text-green-600 text-lg font-semibold">No. Of Patients</div>
              <div className="text-2xl font-bold text-green-800">{patients.length}</div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow flex items-center">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.341A8 8 0 116.343 4.572M21 21l-6-6" />
              </svg>
            </div>
            <div>
              <div className="text-green-600 text-lg font-semibold">No. Request Laboratory Results</div>
              <div className="text-2xl font-bold text-green-800">{labResults.length}</div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow flex items-center">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h10M7 11h10M7 15h6" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <div className="text-green-600 text-lg font-semibold">No. Issued Medical Certificate</div>
              <div className="text-2xl font-bold text-green-800">
                {medicalCerts.length}
              </div>
            </div>
          </div>
        </div>
        {/* Shortcut Buttons */}
        <div className="bg-white rounded-xl p-8 shadow text-green-800 mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">Performance</span>
            <div className="space-x-2">
              <a href="/NewPatient" className="bg-green-100 text-green-700 px-4 py-1 rounded-full hover:bg-green-200 transition">New Patient</a>
              <a href="/VisitHistory" className="bg-green-100 text-green-700 px-4 py-1 rounded-full hover:bg-green-200 transition">View Records</a>
              <a href="/MedicalCert" className="bg-green-100 text-green-700 px-4 py-1 rounded-full hover:bg-green-200 transition">Generate Cert</a>
            </div>
          </div>
        </div>
        {/* Recent Patient Visits */}
        <div className="bg-white rounded-xl p-6 shadow text-green-800">
          <div className="text-lg font-semibold mb-4">Recent Patient Visits</div>
          <div className="max-h-64 overflow-y-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr>
                  <th className="py-2 px-4 font-semibold text-green-700">Name</th>
                  <th className="py-2 px-4 font-semibold text-green-700">Date</th>
                  <th className="py-2 px-4 font-semibold text-green-700">Purpose</th>
                </tr>
              </thead>
              <tbody>
                {[...visitHistory]
                  .sort((a, b) => new Date(b.visit_date) - new Date(a.visit_date))
                  .map((visit, idx) => (
                    <tr key={idx} className="hover:bg-green-50">
                      <td className="py-2 px-4">{visit.patient_id ? getPatientName(visit.patient_id) : (visit.name || '')}</td>
                      <td className="py-2 px-4">{visit.visit_date}</td>
                      <td className="py-2 px-4">{visit.reason_for_visit}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </section>
  );
};

export default DashBoard;