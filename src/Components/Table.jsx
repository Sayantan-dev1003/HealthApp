import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Table = () => {
    const [doctorArr, setDoctorArr] = useState([]);
    const [patients, setPatients] = useState([]);
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const response = await fetch('/doctor', {
                    method: 'GET',
                    credentials: 'include',
                });
                const data = await response.json();
                setDoctorArr(Object.values(data.patients)); 
            } catch (error) {
                console.error("Error fetching doctor data", error);
            }
        };

        const fetchPatientInfo = async () => {
            try {
                const response = await fetch('/patientInfo', {
                    method: 'GET',
                    credentials: 'include',
                });
                const data = await response.json();

                const filteredPatients = data.filter(patient =>
                    doctorArr.some(doctor => doctor === patient._id)
                );

                setPatients(filteredPatients); 
            } catch (error) {
                console.error("Error fetching patients data", error);
            }
        };

        fetchDoctor();
        fetchPatientInfo();
    }, [doctorArr]); 

    return (
        <div className="container mx-auto p-4 montserrat">
            <div className="w-[60vw] flex justify-between">
                <button
                    onClick={() => navigate('/dashboard')} 
                    className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Back
                </button>
                <h2 className="text-2xl font-bold mb-4">Patient Information</h2>
            </div>
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="py-2 px-4 border-b text-left text-gray-600">Patient ID</th>
                        <th className="py-2 px-4 border-b text-left text-gray-600">Patient Name</th>
                        <th className="py-2 px-4 border-b text-left text-gray-600">Age</th>
                        <th className="py-2 px-4 border-b text-left text-gray-600">Contact</th>
                        <th className="py-2 px-4 border-b text-left text-gray-600">Gender</th>
                        <th className="py-2 px-4 border-b text-left text-gray-600">Email</th>
                        <th className="py-2 px-4 border-b text-left text-gray-600">Disorder</th>
                        <th className="py-2 px-4 border-b text-left text-gray-600">Patient Type</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.length > 0 ? (
                        patients.map((patient) => (
                            <tr key={patient._id} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b">{patient._id || 'NA'}</td>
                                <td className="py-2 px-4 border-b">{patient.name || 'NA'}</td>
                                <td className="py-2 px-4 border-b">{patient.age || 'NA'}</td>
                                <td className="py-2 px-4 border-b">{patient.contact || 'NA'}</td>
                                <td className="py-2 px-4 border-b">{patient.gender || 'NA'}</td>
                                <td className="py-2 px-4 border-b">{patient.email || 'NA'}</td>
                                <td className="py-2 px-4 border-b">{patient.testType || 'NA'}</td>
                                <td className="py-2 px-4 border-b">{patient.patientType || 'NA'}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="py-2 px-4 border-b text-center">No patients found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Table