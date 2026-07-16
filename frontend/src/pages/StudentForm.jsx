import { useEffect, useState } from "react";
import { addStudent, getStudent, updateStudent } from "../services/StudentService";
import { useNavigate, useParams } from "react-router-dom";

function StudentForm() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [student, setStudent] = useState({
        name: "",
        department: "",
        email: "",
    });

    useEffect(() => {
        if (id) {
            getStudent(id).then((response) => {
                setStudent(response.data);
            });
        }
    }, [id]);

    const handleChange = (e) => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (id) {
            updateStudent(id, student).then(() => {
                navigate("/");
            });
        } else {
            addStudent(student).then(() => {
                navigate("/");
            });
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow">

            <h2 className="text-2xl font-bold mb-6">
                {id ? "Update Student" : "Add Student"}
            </h2>

            <form onSubmit={handleSubmit}>

                <div className="mb-4">
                    <label className="block mb-2 font-medium">
                        Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={student.name}
                        onChange={handleChange}
                        className="w-full border border-gray-400 rounded p-2"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2 font-medium">
                        Department
                    </label>

                    <input
                        type="text"
                        name="department"
                        value={student.department}
                        onChange={handleChange}
                        className="w-full border border-gray-400 rounded p-2"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2 font-medium">
                        Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        value={student.email}
                        onChange={handleChange}
                        className="w-full border border-gray-400 rounded p-2"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
                >
                    {id ? "Update" : "Save"}
                </button>

            </form>

        </div>
    );
}

export default StudentForm;