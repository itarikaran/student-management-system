import { useEffect, useState } from "react";
import { getStudents, deleteStudent } from "../services/StudentService";
import { Link } from "react-router-dom";

function StudentList() {

    const [students, setStudents] = useState([]);

    useEffect(() => {
        loadStudents();
    }, []);

    function loadStudents() {
        getStudents().then((res) => {
            setStudents(res.data);
        });
    }

    function handleDelete(id) {
        deleteStudent(id).then(() => {
            loadStudents();
        });
    }

    return (
        <div>

            <h2>Student Management System</h2>

            <Link to="/add">
                Add Student
            </Link>

            <br /><br />

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

                                <Link to={`/edit/${student.id}`}>
                                    Edit
                                </Link>

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