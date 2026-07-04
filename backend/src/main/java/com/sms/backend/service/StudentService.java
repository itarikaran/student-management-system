package com.sms.backend.service;

import com.sms.backend.entity.Student;
import com.sms.backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    // Add Student
    public Student addStudent(Student student) {
        return studentRepository.save(student);
    }

    // Get All Students
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // Get Student By ID
    public Student getStudentById(Long id) {
        return studentRepository.findById(id).orElse(null);
    }

    // Update Student
    public Student updateStudent(Long id, Student student) {

        Student existingStudent = studentRepository.findById(id).orElse(null);

        if (existingStudent != null) {
            existingStudent.setName(student.getName());
            existingStudent.setDepartment(student.getDepartment());
            existingStudent.setEmail(student.getEmail());

            return studentRepository.save(existingStudent);
        }

        return null;
    }

    // Delete Student
    public String deleteStudent(Long id) {

        studentRepository.deleteById(id);

        return "Student Deleted Successfully";
    }
}