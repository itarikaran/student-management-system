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
            updateStudent(id, student).then(() => navigate("/"));
        } else {
            addStudent(student).then(() => navigate("/"));
        }
    };

    return (
        <div>
            <h2>{id ? "Edit Student" : "Add Student"}</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={student.name}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="department"
                    placeholder="Department"
                    value={student.department}
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={student.email}
                    onChange={handleChange}
                />

                <button type="submit">Save</button>
            </form>
        </div>
    );
}

export default StudentForm;