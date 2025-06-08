import React from "react";

const AdminController = () => (
  <section className="bg-gray-900 dark:bg-gray-900 min-h-screen flex flex-col justify-center items-center py-16">
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow p-8 flex flex-col items-center w-full max-w-md">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Add Doctor</h2>
      <form className="space-y-4 w-full">
        <div>
          <label htmlFor="doctorName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Doctor Name</label>
          <input
            type="text"
            id="doctorName"
            name="doctorName"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter Doctor's Name"
            required
          />
        </div>
        <div>
          <label htmlFor="doctorEmail" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
          <input
            type="email"
            id="doctorEmail"
            name="doctorEmail"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter Email"
            required
          />
        </div>
        <div>
          <label htmlFor="specialization" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Specialization</label>
          <input
            type="text"
            id="specialization"
            name="specialization"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter Specialization"
            required
          />
        </div>
        <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-5 py-2.5 font-medium mt-4">Add Doctor</button>
      </form>
    </div>
  </section>
);

export default AdminController;
