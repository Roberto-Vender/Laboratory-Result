import React from 'react';

const CompleteLabResult = () => {
  return (
    <section className="bg-gray-900 dark:bg-gray-900 min-h-screen py-10">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-10">
        {/* Completed Lab Results Table */}
        <div className="w-full mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 h-full">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Complete Lab Results</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                  <tr>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Patient</th>
                    <th className="px-4 py-2">Test Name</th>
                    <th className="px-4 py-2">Result</th>
                    <th className="px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white dark:bg-gray-800 cursor-pointer hover:bg-green-100 dark:hover:bg-green-900 transition">
                    <td className="px-4 py-2">2025-06-06</td>
                    <td className="px-4 py-2">P-002</td>
                    <td className="px-4 py-2">Urinalysis</td>
                    <td className="px-4 py-2">Normal</td>
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

export default CompleteLabResult;
