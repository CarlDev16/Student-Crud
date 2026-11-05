import { useState, useEffect } from 'react';

const emptyStudent = { firstname: '', lastname: '', course: '', section: '' };

export default function StudentForm({ onSave, editingStudent, onCancel }) {
  const [form, setForm] = useState(emptyStudent);

  useEffect(() => {
    if (editingStudent) {
      setForm({
        firstname: editingStudent.firstname || '',
        lastname: editingStudent.lastname || '',
        course: editingStudent.course || '',
        section: editingStudent.section || '',
      });
    } else {
      setForm(emptyStudent);
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.firstname || !form.lastname || !form.course || !form.section) {
      alert('Please fill in all fields.');
      return;
    }
    onSave(form);
    setForm(emptyStudent);
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <h2>{editingStudent ? 'Edit Student' : 'Add Student'}</h2>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="firstname">First Name</label>
          <input
            id="firstname"
            name="firstname"
            type="text"
            placeholder="First name"
            value={form.firstname}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Last Name</label>
          <input
            id="lastname"
            name="lastname"
            type="text"
            placeholder="Last name"
            value={form.lastname}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="course">Course</label>
          <input
            id="course"
            name="course"
            type="text"
            placeholder="Course"
            value={form.course}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="section">Section</label>
          <input
            id="section"
            name="section"
            type="text"
            placeholder="Section"
            value={form.section}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {editingStudent ? 'Update' : 'Add'}
        </button>
        {editingStudent && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
