const baseUrl = 'http://localhost:8000/api/';
export async function LoginAdmin(data) {
    const response = await fetch(`${baseUrl}Admin/Login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body:JSON.stringify(data)
    });    
    return await response.json();
}
export async function createPatient(data) {
    const response = await fetch(`${baseUrl}Patient`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body:JSON.stringify(data)
    });    
    return await response.json();
}
export async function createDoctor(data) {
    const response = await fetch(`${baseUrl}Doctor`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body:JSON.stringify(data)
    });    
    return await response.json();
}
export async function createTest(data) {
    const response = await fetch(`${baseUrl}Test`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body:JSON.stringify(data)
    });    
    return await response.json();
}
export async function createConsultation(data) {
    const response = await fetch(`${baseUrl}RecordConsultation`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body:JSON.stringify(data)
    });    
    return await response.json();
}
export async function createVisitHistory(data) {
    const response = await fetch(`${baseUrl}RecordVisit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body:JSON.stringify(data)
    });    
    return await response.json();
}
export async function createLabResult(data) {
    let options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
        },
        body: data
    };

    // If not FormData, treat as JSON
    if (!(data instanceof FormData)) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const response = await fetch(`${baseUrl}LabResult`, options);
    return await response.json();
}
export async function createMedicalCertificate(data) {
    let options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
        },
        body: data
    };

    // If not FormData, treat as JSON
    if (!(data instanceof FormData)) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }
    const response = await fetch(`${baseUrl}MedicalCertificate`, options);
    return await response.json();
}
export async function LabResult(data) {
    const response = await fetch(`${baseUrl}LabResult`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body:JSON.stringify(data)
    });    
    return await response.json();
}