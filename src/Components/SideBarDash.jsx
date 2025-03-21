import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SideBarDash = () => {
    const navigate = useNavigate();
    const [drName, setDrName] = useState("");

    const logout = async () => {
        try {
            await fetch('/logout', { method: 'GET', credentials: 'include' });
            window.location.href = '/';
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    useEffect(() => {
        const fetchDoctorName = async () => {
            try {
                const response = await fetch('/doctorName', {
                    method: 'GET',
                    credentials: 'include',
                });
                const data = await response.json();
                // Assuming the response is structured as { name: "Doctor's Name" }
                setDrName(data.name || ""); // Set the doctor's name
            } catch (error) {
                console.error("Error fetching doctor data", error);
            }
        };

        fetchDoctorName();
    }, []); // Run only once when the component mounts

    return (
        <div className="flex flex-col h-screen w-1/4 bg-green-600 text-white p-6">
            <div className="text-4xl font-bold">MindScan</div>
            <div className="mt-9 font-extrabold">
                <p className="text-lg mt-2">Dr. {drName}</p>
            </div>
            <div className="mt-">
                <p className="text-sm mt-2">Welcome to MindScan, your trusted platform for mental health diagnosis.</p>
            </div>
            <nav className="flex-grow mt-12">
                <ul className="flex flex-col gap-1">
                    <li className="hover:bg-green-700 py-2 px-2 rounded-lg hover:font-semibold tracking-wide">
                        <p>Diagnosis</p>
                    </li>
                    <li className="hover:bg-green-700 py-2 px-2 rounded-lg hover:font-semibold tracking-wide" onClick={() => navigate('/table')}>
                        <p>Patients Records</p>
                    </li>
                    <li className="hover:bg-green-700 py-2 px-2 rounded-lg hover:font-semibold tracking-wide">
                        <p>Notifications</p>
                    </li>
                </ul>
            </nav>
            <button onClick={logout} className="bg-green-500 hover:bg-green-700 text-white text-sm w-2/3 font-bold py-2 px-4 rounded mt-4">
                Logout
            </button>
        </div>
    );
};

export default SideBarDash;