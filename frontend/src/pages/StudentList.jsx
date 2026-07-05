import { useEffect, useState } from "react";
import { getStudents, deleteStudent } from "../services/StudentService";
import { Link } from "react-router-dom";

function StudentList() {

    const [students, setStudents] = useState([]);

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = () => {
        getStudents().then((res) => {
            setStudents(res.data);
        });
    };

    const handleDelete = (id) => {
        deleteStudent(id).then(() => {
            loadStudents();
        });
    };

    return (
        <div>
            <h1>Student Management</h1>

            <Link to="/add">Add Student</Link>

            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.department}</td>
                            <td>{student.email}</td>
                            <td>
                                <Link to={`/edit/${student.id}`}>Edit</Link>

                                {" | "}

                                <button onClick={() => handleDelete(student.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StudentList;