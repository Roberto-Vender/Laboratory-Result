import React from 'react';

const LaboratoryResult = () => (
  <section className="bg-gray-900 dark:bg-gray-900 min-h-screen py-10">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10">
      <div className="w-full md:w-1/2 space-y-10">
        

        {/* Input Lab Results */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Input Lab Results</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="patientResult" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Patient</label>
              <input
                type="text"
                id="patientResult"
                name="patientResult"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter Patient ID or Name"
                required
              />
            </div>
            <div>
            <label htmlFor="testName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Test Name</label>
            <select
              id="testName"
              name="testName"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            >
              <option value="">Select Test</option>
              <option value="CBC">CBC</option>
              <option value="Urinalysis">Urinalysis</option>
              <option value="Fecalysis">Fecalysis</option>
              <option value="Blood Sugar">Blood Sugar</option>
              <option value="X-Ray">X-Ray</option>
              {/* Add more test options as needed */}
            </select>
            <div>
            <label htmlFor="labFile" className="block mb- text-sm font-medium text-gray-900 dark:text-white">Attach File (optional)</label>
            <input
              type="file"
              id="labFile"
              name="labFile"
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              accept=".pdf,.jpg,.jpeg,.png"
            />
          </div>
          </div>
            <div>
              <label htmlFor="result" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Result</label>
              <textarea
                id="result"
                name="result"
                rows="3"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter result details"
                required
              ></textarea>
            </div>
            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-5 py-2.5 font-medium">Save Result</button>
          </form>
        </div>
      </div>

      {/* View Lab Results */}
      <div className="w-full md:w-3/5">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 h-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">View Lab Results</h2>
            <a
              href="/CompleteLabResult"
              className="btn btn-success bg-green-600 text-white px-2 py-2 rounded-lg font-semibold shadow hover:bg-green-700 transition"
            >
              Complete Results
            </a>
          </div>
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
                { [
    { date: '2025-06-07', patient: 'P-001', test: 'CBC', result: 'Normal', status: 'Pending' },
    { date: '2025-06-07', patient: 'P-002', test: 'Urinalysis', result: 'Normal', status: 'Pending' }
    // Add more rows as needed
  ].map(function(row) {
    return (
      <tr
        key={row.patient + row.test}
        className="bg-white dark:bg-gray-800 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900 transition"
        onClick={() => alert(`Lab result for ${row.patient} - ${row.test}`)}
      >
        <td className="px-4 py-2">{row.date}</td>
        <td className="px-4 py-2">{row.patient}</td>
        <td className="px-4 py-2">{row.test}</td>
        <td className="px-4 py-2">{row.result}</td>
        <td className="px-4 py-2">{row.status}</td>
      </tr>
    );
  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default LaboratoryResult;