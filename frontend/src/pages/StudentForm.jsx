import { useEffect, useState } from "react";
import { addStudent, getStudent, updateStudent } from "../services/StudentService";
import { useNavigate, useParams } from "react-router-dom";

function StudentForm() {

    const navigate = useNavigate();

    const { id } = useParams();

    const [student, setStudent] = useState({
        name: "",
        department: "",
        email: ""
    });

    useEffect(() => {

        if (id) {
            getStudent(id).then((res) => {
                setStudent(res.data);
            });
        }

    }, []);

    const handleChange = (e) => {

        setStudent({
            ...student,
            [e.target.name]: e.target.value
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

        <div className="max-w-lg mx-auto mt-10">

            <h2 className="text-2xl font-bold mb-5">

                {id ? "Edit Student" : "Add Student"}

            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={student.name}
                    onChange={handleChange}
                    className="w-full border p-2"
                />

                <input
                    type="text"
                    name="department"
                    placeholder="Department"
                    value={student.department}
                    onChange={handleChange}
                    className="w-full border p-2"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={student.email}
                    onChange={handleChange}
                    className="w-full border p-2"
                />

                <button
                    className="bg-blue-600 text-white px-5 py-2 rounded"
                >
                    Save
                </button>

            </form>

        </div>

    );

}

export default StudentForm;