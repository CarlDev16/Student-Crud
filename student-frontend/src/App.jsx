import { useState, useEffect } from 'react';
import studentApi from './api/studentApi';
import StudentForm from './components/StudentForm';
import StudentTable from './components/StudentTable';
import SearchBar from './components/SearchBar';
import StudentDetailModal from './components/StudentDetailModal';
import './App.css';

export default function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [viewingStudentId, setViewingStudentId] = useState(null);
  const [activeFilter, setActiveFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchStudents = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await studentApi.getAll();
      setStudents(Array.isArray(res.data) ? res.data : []);
      setActiveFilter('');
    } catch (err) {
      setError('Failed to load students. Make sure the backend server is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    studentApi
      .getAll()
      .then((res) => {
        if (!ignore) {
          setStudents(Array.isArray(res.data) ? res.data : []);
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError('Failed to load students. Make sure the backend server is running.');
          console.error(err);
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  const handleSave = async (formData) => {
    setError('');
    setSuccess('');
    try {
      if (editingStudent) {
        await studentApi.update(editingStudent.id, formData);
        setSuccess(`Student #${editingStudent.id} updated successfully!`);
        setEditingStudent(null);
      } else {
        const res = await studentApi.create(formData);
        setSuccess(`Student "${res.data.firstname} ${res.data.lastname}" added successfully!`);
      }

      if (activeFilter) {
        await handleSearch(activeFilter);
      } else {
        await fetchStudents();
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data ||
        'Failed to save student record.';
      setError(typeof errorMsg === 'string' ? errorMsg : 'Failed to save student.');
      console.error(err);
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  const handleDelete = async (id) => {
    const target = students.find((s) => s.id === id);
    const label = target ? `${target.firstname} ${target.lastname} (ID: ${id})` : `ID: ${id}`;
    if (!window.confirm(`Are you sure you want to delete student ${label}?`)) {
      return;
    }

    try {
      await studentApi.delete(id);
      setSuccess(`Student #${id} deleted successfully.`);
      if (editingStudent?.id === id) {
        setEditingStudent(null);
      }
      if (activeFilter) {
        await handleSearch(activeFilter);
      } else {
        await fetchStudents();
      }
    } catch (err) {
      setError('Failed to delete student.');
      console.error(err);
    }
  };

  const handleSearch = async (section) => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await studentApi.searchBySection(section);
      setStudents(Array.isArray(res.data) ? res.data : []);
      setActiveFilter(section);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setStudents([]);
        setActiveFilter(section);
      } else {
        setError('Search failed. Please try again.');
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
        <div className="header-badge">Full-Stack Demo</div>
        <h1>Student Management System</h1>
        <p className="subtitle">
          React &amp; Vite Frontend integrated with Spring Boot REST API
        </p>
      </header>

      {error && (
        <div className="alert alert-error" role="alert">
          <span>{error}</span>
          <button className="alert-close" onClick={() => setError('')}>&times;</button>
        </div>
      )}

      {success && (
        <div className="alert alert-success" role="alert">
          <span>{success}</span>
          <button className="alert-close" onClick={() => setSuccess('')}>&times;</button>
        </div>
      )}

      <StudentForm
        key={editingStudent ? `edit-${editingStudent.id}` : 'create'}
        onSave={handleSave}
        editingStudent={editingStudent}
        onCancel={handleCancelEdit}
      />

      <section className="table-section">
        <div className="table-header">
          <div className="table-title-group">
            <h2>Student Directory</h2>
            <span className="count-pill">
              {students.length} {students.length === 1 ? 'student' : 'students'}
            </span>
            {activeFilter && (
              <span className="active-filter-badge">
                Section: <strong>{activeFilter}</strong>
              </span>
            )}
          </div>
          <SearchBar
            onSearch={handleSearch}
            onClear={handleClearSearch}
            isFiltering={Boolean(activeFilter)}
          />
        </div>

        <StudentTable
          students={students}
          onView={(id) => setViewingStudentId(id)}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
        />
      </section>

      {viewingStudentId && (
        <StudentDetailModal
          studentId={viewingStudentId}
          onClose={() => setViewingStudentId(null)}
        />
      )}
    </div>
  );
}
