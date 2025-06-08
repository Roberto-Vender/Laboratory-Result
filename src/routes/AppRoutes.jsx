import React from "react";
import { Routes, Route } from "react-router-dom";


import DefaultLayout from "../layouts/DefaultLayout";

import Home from "../pages/Home";
import Login from "../pages/Login";
import DashBoard from "../pages/DashBoard";
import NewPatient from "../pages/NewPatient";
import Consultation from "../pages/Consultation";
import LaboratoryResult from "../pages/LaboratoryResult";
import VisitHistory from "../pages/VisitHistory";
import MedicalCert from "../pages/MedicalCert";
import MedicalCertRequest from "../pages/MedicalCertRequest";
import LabRequest from "../pages/LabRequest";
import CompleteMedicalCert from "../pages/CompleteMedicalCert";
import CompleteLabResult from "../pages/CompleteLabResult";
import AdminController from "../pages/AdminController";


const AppRoutes = () => {
  return (
    <Routes>
      {/* Only Login route remains */}
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/DashBoard" element={<DashBoard />} />
        <Route path="/NewPatient" element={<NewPatient />} />
        <Route path="/Consultation" element={<Consultation />} />
        <Route path="/LaboratoryResult" element={<LaboratoryResult />} />
        <Route path="/VisitHistory" element={<VisitHistory />} />
        <Route path="/MedicalCert" element={<MedicalCert />} />
        <Route path="/MedicalCertRequest" element={<MedicalCertRequest />} />
        <Route path="/LabRequest" element={<LabRequest />} />
        <Route path="/CompleteMedicalCert" element={<CompleteMedicalCert />} />
        <Route path="/CompleteLabResult" element={<CompleteLabResult />} />
        <Route path="/AdminController" element={<AdminController />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;