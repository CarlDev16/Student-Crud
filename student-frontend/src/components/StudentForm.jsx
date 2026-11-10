import { useState } from 'react';

const emptyStudent = { firstname: '', lastname: '', course: '', section: '' };

export default function StudentForm({ onSave, editingStudent, onCancel }) {
  const [form, setForm] = useState(() =>
    editingStudent
      ? {
          firstname: editingStudent.firstname || '',
          lastname: editingStudent.lastname || '',
          course: editingStudent.course || '',
          section: editingStudent.section || '',
        }
      : emptyStudent
  );

  const [validationError, setValidationError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (validationError) setValidationError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !form.firstname.trim() ||
      !form.lastname.trim() ||
      !form.course.trim() ||
      !form.section.trim()
    ) {
      setValidationError('Please fill in all required fields.');
      return;
    }
    onSave({
      firstname: form.firstname.trim(),
      lastname: form.lastname.trim(),
      course: form.course.trim(),
      section: form.section.trim(),
    });
  };

  return (
    <form className="student-form" onSubmit={handleSubmit} noValidate>
      <div className="form-title-row">
        <h2>{editingStudent ? `Edit Student (ID: ${editingStudent.id})` : 'Add New Student'}</h2>
        {editingStudent && (
          <span className="badge badge-warning">Editing Mode</span>
        )}
      </div>

      {validationError && (
        <div className="form-validation-error">{validationError}</div>
      )}

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="firstname">First Name <span className="required">*</span></label>
          <input
            id="firstname"
            name="firstname"
            type="text"
            placeholder="e.g. Juan"
            value={form.firstname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Last Name <span className="required">*</span></label>
          <input
            id="lastname"
            name="lastname"
            type="text"
            placeholder="e.g. Dela Cruz"
            value={form.lastname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="course">Course <span className="required">*</span></label>
          <input
            id="course"
            name="course"
            type="text"
            placeholder="e.g. BS Information Technology"
            value={form.course}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="section">Section <span className="required">*</span></label>
          <input
            id="section"
            name="section"
            type="text"
            placeholder="e.g. BSIT-3A"
            value={form.section}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {editingStudent ? 'Save Changes' : 'Add Student'}
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
