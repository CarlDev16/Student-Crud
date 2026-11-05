
package com.mangune.student;

import java.util.List;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path="/mangune/students")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @PostMapping
    public ResponseEntity createStudent(@RequestBody Student student)
            throws URISyntaxException {
        Student savedStudent = studentRepository.save(student);
        return ResponseEntity.created(
                new URI("/mangune/students/" + savedStudent.getId())
        ).body(savedStudent);
    }

    @GetMapping
    public @ResponseBody Iterable<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @GetMapping("/{id}")
    @ResponseBody
    public ResponseEntity<?> getStudentById(@PathVariable Integer id) {
        Optional<Student> student = studentRepository.findById(id);

        if (student.isPresent()) {
            return ResponseEntity.ok(student.get());
        }

        return ResponseEntity.status(404)
                .body("Student with id " + id + " not found");
    }

    @PutMapping("/{id}")
    @ResponseBody
    public ResponseEntity<?> updateStudent(
            @PathVariable Integer id,
            @RequestBody Student updated) {

        Optional<Student> existingOpt = studentRepository.findById(id);

        if (existingOpt.isEmpty()) {
            return ResponseEntity.status(404)
                    .body("Student with id " + id + " not found.");
        }

        Student existing = existingOpt.get();

        // Follow your Student entity fields exactly
        existing.setFirstname(updated.getFirstname());
        existing.setLastname(updated.getLastname());
        existing.setCourse(updated.getCourse());
        existing.setSection(updated.getSection());

        Student saved = studentRepository.save(existing);
        return ResponseEntity.ok(saved);
    }

    // SEARCH STUDENT BY SECTION
    @GetMapping("/search/{section}")
    @ResponseBody
    public ResponseEntity<?> searchStudentBySection(
            @PathVariable String section) {

        List<Student> students =
                studentRepository.findBySection(section);

        if (students.isEmpty()) {
            return ResponseEntity.status(404)
                    .body("No students found in section " + section);
        }

        return ResponseEntity.ok(students);
    }

    @DeleteMapping("/{id}")
    @ResponseBody
    public ResponseEntity<String> deleteStudent(@PathVariable Integer id) {
        Optional<Student> student = studentRepository.findById(id);

        if (student.isPresent()) {
            studentRepository.deleteById(id);
            return ResponseEntity.ok(
                    "Student with id " + id + " deleted.");
        }

        return ResponseEntity.status(404)
                .body("Student with id " + id + " not found.");
    }
}
