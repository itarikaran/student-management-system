import { useEffect, useState } from "react";
import { getStudents, deleteStudent } from "../services/StudentService";
import { Link } from "react-router-dom";

function StudentList() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = () => {
        getStudents().then((response) => {
            setStudents(response.data);
        });
    };

    const removeStudent = (id) => {
        deleteStudent(id).then(() => {
            loadStudents();
        });
    };

    return (
        <div className="max-w-5xl mx-auto mt-8 p-5">

            <h2 className="text-3xl font-bold mb-5">
                Student Management System
            </h2>

            <Link
                to="/add"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-5"
            >
                Add Student
            </Link>

            <table className="w-full border border-gray-400 border-collapse">

                <thead className="bg-gray-200">

                    <tr>
                        <th className="border border-gray-400 p-2">ID</th>
                        <th className="border border-gray-400 p-2">Name</th>
                        <th className="border border-gray-400 p-2">Department</th>
                        <th className="border border-gray-400 p-2">Email</th>
                        <th className="border border-gray-400 p-2">Action</th>
                    </tr>

                </thead>

                <tbody>

                    {students.map((student) => (

                        <tr key={student.id}>

                            <td className="border border-gray-400 p-2">
                                {student.id}
                            </td>

                            <td className="border border-gray-400 p-2">
                                {student.name}
                            </td>

                            <td className="border border-gray-400 p-2">
                                {student.department}
                            </td>

                            <td className="border border-gray-400 p-2">
                                {student.email}
                            </td>

                            <td className="border border-gray-400 p-2">

                                <Link
                                    to={`/edit/${student.id}`}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                >
                                    Edit
                                </Link>

                                <button
                                    onClick={() => removeStudent(student.id)}
                                    className="ml-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
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