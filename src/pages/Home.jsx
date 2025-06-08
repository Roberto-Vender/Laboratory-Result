import React from "react";

const Home = () => {
  return (
    <section className="bg-gray-900 dark:bg-gray-900 min-h-screen flex flex-col justify-between items-center">
      <div className="flex-1 flex flex-col justify-center items-center w-full">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 flex flex-col items-center w-full max-w-4xl">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            Welcome to HJ Laboratory & Diagnostic Center
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
            Your trusted partner for laboratory and diagnostic services.
          </p>
          <div className="flex flex-col md:flex-row gap-4 w-full justify-center mb-8">
            <a
              href="/LabRequest"
              className="bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition text-center"
            >
              Lab Request
            </a>
            <a
              href="/MedicalCertRequest"
              className="bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition text-center"
            >
              Medical Request
            </a>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center mb-20 mt-8">
        <a
          href="/Login"
          className="bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
        >
          Log in as Admin
        </a>
      </div>
    </section>
  );
};

export default Home;