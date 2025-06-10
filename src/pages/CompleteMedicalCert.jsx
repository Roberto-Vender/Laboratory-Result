import React from 'react';

const CompleteMedicalCert = () => {
  return (
    <section className="bg-green-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-10">
        {/* Completed Certificates Table */}
        <div className="w-full mx-auto">
          <div className="bg-white rounded-xl shadow p-8 h-full">
            <h2 className="text-2xl font-bold mb-6 text-green-700">Complete Medical Certificates</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-md text-left text-green-900">
                <thead className="text-xs uppercase bg-green-100 text-green-700">
                  <tr>
                    <th className="px-4 py-2">Issued Date</th>
                    <th className="px-4 py-2">Certificate ID</th>
                    <th className="px-4 py-2">Patient ID</th>
                    <th className="px-4 py-2">Details</th>
                    <th className="px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white hover:bg-green-50 transition cursor-pointer">
                    <td className="px-4 py-2">2025-06-06</td>
                    <td className="px-4 py-2">C-002</td>
                    <td className="px-4 py-2">2</td>
                    <td className="px-4 py-2">Medical leave for 3 days</td>
                    <td className="px-4 py-2 text-green-600 font-bold">Completed</td>
                  </tr>
                  {/* Add more completed rows as needed */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompleteMedicalCert;
