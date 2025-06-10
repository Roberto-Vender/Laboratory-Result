const baseUrl = 'http://localhost:8000/api/';
export async function getAllDoctors() {
    const response = await fetch(`${baseUrl}Doctor`);
    return await response.json();
}
export async function getAllTest() {
    const response = await fetch(`${baseUrl}Test`);
    return await response.json();
}
export async function getAllConsultation() {
    const response = await fetch(`${baseUrl}RecordConsultation`);
    return await response.json();
}
export async function getAllVisitHistory() {
    const response = await fetch(`${baseUrl}RecordVisit`);
    return await response.json();
}
export async function getAllPatients() {
    const response = await fetch(`${baseUrl}Patient`);
    return await response.json();
}
export async function getAllLabResults() {
    const response = await fetch(`${baseUrl}LabResult`);
    return await response.json();
}
export async function getAllMedicalCertificate() {
    const response = await fetch(`${baseUrl}MedicalCertificate`);
    return await response.json();
}