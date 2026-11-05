package com.mangune.student;

import org.springframework.data.repository.CrudRepository;
import java.util.List;

public interface StudentRepository extends CrudRepository<Student, Integer> {

    List<Student> findBySection(String section);

    List<Student> findByLastname(String lastname);

    List<Student> findByCourse(String course);
}