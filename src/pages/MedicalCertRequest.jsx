import React from "react";

const MedicalCertRequest = () => (
  <section className="bg-green-50 min-h-screen flex flex-col md:flex-row justify-center items-center gap-16 py-16">
    {/* Request Medical Certificate Card (left) */}
    <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center w-full max-w-md">
      <h2 className="text-xl font-bold mb-4 text-green-700">Request Medical Certificate</h2>
      <form className="space-y-4 w-full">
        <div>
          <label htmlFor="medPatient" className="block mb-2 text-sm font-medium text-green-900">Select Patient</label>
          <input
            type="text"
            id="medPatient"
            name="medPatient"
            className="bg-green-50 border border-green-300 text-green-900 rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
            placeholder="Enter Patient Name"
            required
          />
        </div>
        <div>
          <label htmlFor="requestDetails" className="block mb-2 text-sm font-medium text-green-900">Request Details</label>
          <textarea
            id="requestDetails"
            name="requestDetails"
            rows="3"
            className="bg-green-50 border border-green-300 text-green-900 rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
            placeholder="Describe the medical request"
            required
          ></textarea>
        </div>
        <button type="submit" className="w-full text-white bg-green-600 hover:bg-green-700 rounded-lg px-5 py-3 font-medium mt-4 transition">
          Submit Request
        </button>
      </form>
    </div>
  </section>
);

export default MedicalCertRequest;
