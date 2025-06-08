import React from 'react';

const Consultation = () => (
  <section className="bg-gray-900 dark:bg-gray-900 min-h-screen py-10">
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10">
      {/* Fill up form */}
      <div className="w-full md:w-1/2">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Record Consultation
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
            <label htmlFor="doctorid" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Doctor ID</label>
            <select
              name="doctorid"
              id="doctorid"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            >
              <option value="">Select Doctor</option>
              <option value="D-001">Dr. Juan Dela Cruz (D-001)</option>
              <option value="D-002">Dr. Maria Santos (D-002)</option>
              <option value="D-003">Dr. Roberto Vender (D-003)</option>
              {/* Add more doctors as needed */}
            </select>
          </div>
            <div>
              <label htmlFor="visitdate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Visit Date</label>
              <input
                type="date"
                name="visitdate"
                id="visitdate"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="diagnosis" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Diagnosis</label>
              <input
                type="text"
                name="diagnosis"
                id="diagnosis"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Diagnosis"
                required
              />
            </div>
            <div>
              <label htmlFor="medicaladvice" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Medical Advice</label>
              <textarea
                name="medicaladvice"
                id="medicaladvice"
                rows="3"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Medical Advice"
                required
              ></textarea>
            </div>
            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Save Consultation
            </button>
          </form>
        </div>
      </div>
      {/* View Consultation */}
      <div className="w-full md:w-3/5">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 h-full">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">View Consultations</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                <tr>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Patient ID</th>
                  <th className="px-4 py-2">Doctor ID</th>
                  <th className="px-4 py-2">Diagnosis</th>
                  <th className="px-4 py-2">Advice</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-gray-800">
                  <td className="px-4 py-2">2025-06-07</td>
                  <td className="px-4 py-2">P-001</td>
                  <td className="px-4 py-2">D-001</td>
                  <td className="px-4 py-2">Fever</td>
                  <td className="px-4 py-2">Rest and hydrate</td>
                </tr>   
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Consultation;