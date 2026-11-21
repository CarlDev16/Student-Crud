package com.mangune.student;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = {
        "http://localhost:3000",
        "http://localhost:5173",
        "${FRONTEND_URL:http://localhost:3000}"
})
@RequestMapping(path = "/mangune/students")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    // CREATE STUDENT
    @PostMapping
    public ResponseEntity<Student> createStudent(
            @RequestBody Student student) throws URISyntaxException {

        Student savedStudent = studentRepository.save(student);

        return ResponseEntity.created(
                new URI("/mangune/students/" + savedStudent.getId())
        ).body(savedStudent);
    }

    // GET ALL STUDENTS
    @GetMapping
    public Iterable<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // GET STUDENT BY ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getStudentById(
            @PathVariable Integer id) {

        Optional<Student> student = studentRepository.findById(id);

        if (student.isPresent()) {
            return ResponseEntity.ok(student.get());
        }

        return ResponseEntity.status(404)
                .body("Student with id " + id + " not found.");
    }

    // UPDATE STUDENT (Path ID)
    @PutMapping("/{id}")
    public ResponseEntity<?> updateStudent(
            @PathVariable Integer id,
            @RequestBody Student updated) {

        Optional<Student> existingOpt =
                studentRepository.findById(id);

        if (existingOpt.isEmpty()) {
            return ResponseEntity.status(404)
                    .body("Student with id " + id + " not found.");
        }

        Student existing = existingOpt.get();

        existing.setFirstname(updated.getFirstname());
        existing.setLastname(updated.getLastname());
        existing.setCourse(updated.getCourse());
        existing.setSection(updated.getSection());

        Student saved = studentRepository.save(existing);

        return ResponseEntity.ok(saved);
    }

    // Support PUT /mangune/students (ID provided via query param or body)
    @PutMapping
    public ResponseEntity<?> updateStudentWithoutIdInPath(
            @RequestParam(required = false) Integer id,
            @RequestBody Student updated) {
        Integer targetId = (id != null) ? id : updated.getId();
        if (targetId == null) {
            return ResponseEntity.badRequest()
                    .body("Student ID is required for update.");
        }
        return updateStudent(targetId, updated);
    }

    // SEARCH STUDENT BY SECTION
    @GetMapping("/search/{section}")
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

    // DELETE STUDENT (Path ID)
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStudent(
            @PathVariable Integer id) {

        Optional<Student> student =
                studentRepository.findById(id);

        if (student.isPresent()) {
            studentRepository.deleteById(id);

            return ResponseEntity.ok(
                    "Student with id " + id + " deleted.");
        }

        return ResponseEntity.status(404)
                .body("Student with id " + id + " not found.");
    }

    // Support DELETE /mangune/students (ID provided via query param or body)
    @DeleteMapping
    public ResponseEntity<String> deleteStudentWithoutIdInPath(
            @RequestParam(required = false) Integer id,
            @RequestBody(required = false) Student student) {
        Integer targetId = id;
        if (targetId == null && student != null) {
            targetId = student.getId();
        }
        if (targetId == null) {
            return ResponseEntity.badRequest()
                    .body("Student ID is required for deletion.");
        }
        return deleteStudent(targetId);
    }
}
