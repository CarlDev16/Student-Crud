import { useState, useEffect } from 'react';
import studentApi from './api/studentApi';
import StudentForm from './components/StudentForm';
import StudentTable from './components/StudentTable';
import SearchBar from './components/SearchBar';
import './App.css';

export default function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch all students on mount
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await studentApi.getAll();
      setStudents(res.data);
    } catch (err) {
      setError('Failed to load students.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (formData) => {
    setError('');
    try {
      if (editingStudent) {
        await studentApi.update(editingStudent.id, formData);
      } else {
        await studentApi.create(formData);
      }
      setEditingStudent(null);
      fetchStudents();
    } catch (err) {
      setError('Failed to save student.');
      console.error(err);
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    setError('');
    try {
      await studentApi.delete(id);
      fetchStudents();
    } catch (err) {
      setError('Failed to delete student.');
      console.error(err);
    }
  };

  const handleSearch = async (section) => {
    setLoading(true);
    setError('');
    try {
      const res = await studentApi.searchBySection(section);
      setStudents(res.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setStudents([]);
        setError(`No students found in section "${section}".`);
      } else {
        setError('Search failed.');
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    fetchStudents();
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>📚 Student Management System</h1>
        <p className="subtitle">Mangune CRUD Application</p>
      </header>

      {error && <div className="error-banner">{error}</div>}

      <StudentForm
        onSave={handleSave}
        editingStudent={editingStudent}
        onCancel={handleCancelEdit}
      />

      <section className="table-section">
        <div className="table-header">
          <h2>Student Records</h2>
          <SearchBar onSearch={handleSearch} onClear={handleClearSearch} />
        </div>
        <StudentTable
          students={students}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
        />
      </section>
    </div>
  );
}
