import React from "react";

const LabRequest = () => (
  <section className="bg-gray-900 dark:bg-gray-900 min-h-screen flex flex-col md:flex-row justify-center items-center gap-16 py-16">
    {/* Request Lab Test Card (left) */}
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow p-8 flex flex-col items-center w-full max-w-md">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Request Lab Test</h2>
      <form className="space-y-4 w-full">
        <div>
          <label htmlFor="patient" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Patient</label>
          <input
            type="text"
            id="patient"
            name="patient"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter Patient ID or Name"
            required
          />
        </div>
        <div>
          <label htmlFor="requestedTests" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Requested Tests</label>
          <input
            type="text"
            id="requestedTests"
            name="requestedTests"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="e.g. CBC, Urinalysis"
            required
          />
        </div>
        <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-5 py-2.5 font-medium mt-4">Request Test</button>
      </form>
    </div>
    {/* Tracker Card (right) */}
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow p-8 flex flex-col items-center w-full max-w-md">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Track Lab Request</h2>
      <form className="space-y-4 w-full">
        <div>
          <label htmlFor="trackPatient" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Patient ID</label>
          <input
            type="text"
            id="trackPatient"
            name="trackPatient"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter Patient ID"
            required
          />
        </div>
        <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-5 py-2.5 font-medium mt-4">Track Now</button>
      </form>
    </div>
  </section>
);

export default LabRequest;
