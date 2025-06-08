import React from 'react';

const DashBoard = () => (
  <section className="bg-[#181A20] min-h-screen flex">
    {/* Sidebar */}
    <aside className="w-64 bg-[#1E2A3A] flex flex-col py-8 px-4 min-h-screen">
      <div className="flex items-center mb-10">

        <a href="/Home" className="text-white text-lg font-bold">HJ LABORATORY & DIAGNOSTIC CENTER</a>
      </div>
      <nav className="flex-1">
        <ul className="space-y-4">
            <li>
            <a href="/DashBoard" className="flex items-center text-gray-300 hover:text-blue-400">
              <span className="material-icons mr-3"></span>
              DashBoard
            </a>
          </li>
          <li>
            <a href="/NewPatient" className="flex items-center text-gray-300 hover:text-blue-400">
              <span className="material-icons mr-3"></span>
              Patient Management
            </a>
          </li>
          <li>
            <a href="/Consultation" className="flex items-center text-gray-300 hover:text-blue-400">
              <span className="material-icons mr-3"></span>
              Consultation Record
            </a>
          </li>
          <li>
            <a href="/VisitHistory" className="flex items-center text-gray-300 hover:text-blue-400">
              <span className="material-icons mr-3"></span>
              Visit History
            </a>
          </li>
          <li>
            <a href="/LaboratoryResult" className="flex items-center text-gray-300 hover:text-blue-400">
              <span className="material-icons mr-3"></span>
              Laboratory Result
            </a>
          </li>
          <li>
            <a href="/MedicalCert" className="flex items-center text-gray-300 hover:text-blue-400">
              <span className="material-icons mr-3"></span>
              Medical Certificate
            </a>
          </li>
          <li>
            <a href="/DashBoard" className="flex items-center text-gray-300 hover:text-blue-400">
              <span className="material-icons mr-3"></span>
              Admin Controller
            </a>
          </li>
        </ul>
      </nav>
    </aside>

    {/* Main Content */}
    <main className="flex-1 p-8 bg-[#181A20] min-h-screen">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">DASHBOARD</h1>
        {/* Removed search, show_chart, and profile image */}
      </header>

      {/* Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#23263A] rounded-lg p-6 shadow text-white">
          <div className="text-gray-400 text-sm mb-2">No. Of patient</div>
          
        </div>
        <div className="bg-[#23263A] rounded-lg p-6 shadow text-white">
          <div className="text-gray-400 text-sm mb-2">Laboratory result</div>
          
        </div>
        <div className="bg-[#23263A] rounded-lg p-6 shadow text-white">
          <div className="text-gray-400 text-sm mb-2">History</div>
          
        </div>
      </div>
        {/* mga shorcut nga buttons*/}
      <div className="bg-[#23263A] rounded-lg p-8 shadow text-white mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">Performance</span>
          <div>
            <a href="/NewPatient" className="bg-[#181A20] text-gray-400 px-4 py-1 rounded-full hover:text-blue-400">New Patient</a>
            <a href="/VisitHistory" className="bg-[#181A20] text-gray-400 px-4 py-1 rounded-full hover:text-blue-400">View Records</a>
            <a href="/MedicalCert" className="bg-[#181A20] text-gray-400 px-4 py-1 rounded-full hover:text-blue-400">Generate Cert</a>
          </div>       
        </div>
      </div>
    </main>
  </section>
);

export default DashBoard;