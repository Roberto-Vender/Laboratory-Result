import React, { useEffect, useRef } from 'react';

const MedicalCert = () => {
  const detailsRef = useRef(null);

  useEffect(() => {
    const labDetails = localStorage.getItem('labRequestDetails');
    if (labDetails && detailsRef.current) {
      detailsRef.current.value = labDetails;
   
    }
  }, []);

  return (
    <section className="bg-gray-900 dark:bg-gray-900 min-h-screen py-10">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-10">
        {/* Fill up form */}
        <div className="w-full md:w-1/2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Issue Medical Certificate
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              
              <div>
                <label htmlFor="patientid" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Patient ID</label>
                <input
                  type="text"
                  name="patientid"
                  id="patientid"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Patient ID"
                  required
                />
              </div>
              <div>
                <label htmlFor="issueddate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Issued Date</label>
                <input
                  type="date"
                  name="issueddate"
                  id="issueddate"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
              <label htmlFor="certFile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Attach File (optional)</label>
              <input
                type="file"
                id="certFile"
                name="certFile"
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                accept=".pdf,.jpg,.jpeg,.png"
              />
            </div>
              <div>
                <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Details</label>
                <textarea
                  name="details"
                  id="details"
                  rows="3"
                  ref={detailsRef}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Certificate details"
                  required
                ></textarea>
              </div>
              <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Issue Certificate
              </button>
            </form>
          </div>
        </div>
        {/* View Certificates */}
        <div className="w-full md:w-3/5">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">View Medical Certificates</h2>
              <a
                href="/CompleteMedicalCert"
                className="btn btn-success bg-green-600 text-white px-2 py-2 rounded-lg font-semibold shadow hover:bg-green-700 transition"
              >
                Complete Certificates
              </a>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                  <tr>
                    <th className="px-4 py-2">Issued Date</th>
                    <th className="px-4 py-2">Certificate ID</th>
                    <th className="px-4 py-2">Patient ID</th>
                    <th className="px-4 py-2">Details</th>
                    <th className="px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
    { date: '2025-06-07', certId: 'C-001', patientId: 'P-001', details: 'Fit to work', status: 'Pending' },
    { date: '2025-06-07', certId: 'C-002', patientId: 'P-002', details: 'Fit to work', status: 'Pending' }
    // Add more rows as needed
  ].map(function(row) {
    return (
      <tr
        key={row.certId + row.patientId}
        className="bg-white dark:bg-gray-800 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900 transition"
        onClick={() => alert(`Certificate details for ${row.certId}`)}
      >
        <td className="px-4 py-2">{row.date}</td>
        <td className="px-4 py-2">{row.certId}</td>
        <td className="px-4 py-2">{row.patientId}</td>
        <td className="px-4 py-2">{row.details}</td>
        <td className="px-4 py-2">{row.status}</td>
      </tr>
    );
  })}
                  {/* Add more rows as needed */}
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