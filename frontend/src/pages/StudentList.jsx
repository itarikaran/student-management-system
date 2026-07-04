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

        <div className="max-w-5xl mx-auto mt-10">

            <div className="flex justify-between mb-5">

                <h1 className="text-3xl font-bold">
                    Student Management
                </h1>

                <Link
                    to="/add"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Add Student
                </Link>

            </div>

            <table className="w-full border">

                <thead className="bg-gray-200">

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

                                <Link
                                    to={`/edit/${student.id}`}
                                    className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                                >
                                    Edit
                                </Link>

                                <button
                                    onClick={() => handleDelete(student.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                >
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