// Patient Class
class Patient {
    constructor(id, name, age, gender, contact) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.contact = contact;
    }

    static fromStorage() {
        return JSON.parse(localStorage.getItem('patients')) || [];
    }

    static saveToStorage(patients) {
        localStorage.setItem('patients', JSON.stringify(patients));
    }
}
// Add and display patients
function updatePatientList() {
    const patients = Patient.fromStorage();
    const patientList = document.getElementById('patientList');
    patientList.innerHTML = '';

    patients.forEach((patient) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${patient.name} - ${patient.age} years - ${patient.contact} - ${patient.gender}</span>
            <button class="edit" onclick="editPatient(${patient.id})">Edit</button>
            <button class="delete" onclick="deletePatient(${patient.id})">Delete</button>
        `;
        patientList.appendChild(li);
    });
}

// Add Patient
document.getElementById('addPatientForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const id = Date.now(); // Unique ID based on timestamp
    const name = document.getElementById('patientName').value;
    const age = document.getElementById('patientAge').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const contact = document.getElementById('patientContact').value;

    const newPatient = new Patient(id, name, age, gender, contact);
    const patients = Patient.fromStorage();
    patients.push(newPatient);
    Patient.saveToStorage(patients);

    updatePatientList(); 
    clearPatientForm(); 
});

// Edit Patient
function editPatient(id) {
    const patients = Patient.fromStorage();
    const patient = patients.find(patient => patient.id === id);

    document.getElementById('patientName').value = patient.name;
    document.getElementById('patientAge').value = patient.age;
    document.querySelector(input[name="gender"][value="${patient.gender}"]).checked = true;
    document.getElementById('patientContact').value = patient.contact;

    // Modify the form submission to update the existing patient
    document.getElementById('addPatientForm').onsubmit = function (e) {
        e.preventDefault();

        patient.name = document.getElementById('patientName').value;
        patient.age = document.getElementById('patientAge').value;
        patient.gender = document.querySelector('input[name="gender"]:checked').value;
        patient.contact = document.getElementById('patientContact').value;

        Patient.saveToStorage(patients);
        updatePatientList();
        clearPatientForm(); // Clear the form
    };
}

// Delete Patient
function deletePatient(id) {
    let patients = Patient.fromStorage();
    patients = patients.filter(patient => patient.id !== id);
    Patient.saveToStorage(patients);
    updatePatientList();
}

function clearAll() {
    if (confirm("Are you sure you want to clear all patients and appointments?")) {
        // Clear both patients and appointments from localStorage
        localStorage.removeItem('patients');
        localStorage.removeItem('appointments');
        
        // Update the lists
        updatePatientList();
        displayAppointments(); // Assuming you have displayAppointments for appointment list
    }
}

// Initialize the app
function init() {
    updatePatientList();
    displayAppointments(); // Assuming displayAppointments is defined
    document.getElementById('clearAllButton').addEventListener('click', clearAll);
}

window.onload = function() {
    init();
};