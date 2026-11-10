import { useEffect, useState } from 'react';
import studentApi from '../api/studentApi';

export default function StudentDetailModal({ studentId, onClose }) {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    async function loadDetails() {
      try {
        setLoading(true);
        setError('');
        const res = await studentApi.getById(studentId);
        if (isMounted) {
          setStudent(res.data);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err.response?.data?.message ||
              err.response?.data ||
              `Failed to load student details for ID #${studentId}.`
          );
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    if (studentId) {
      loadDetails();
    }

    return () => {
      isMounted = false;
    };
  }, [studentId]);

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Student Details</h3>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            &times;
          </button>
        </div>

        <div className="modal-body">
          {loading && <p className="status-msg">Fetching student details...</p>}
          {error && <div className="error-banner">{error}</div>}
          {!loading && !error && student && (
            <div className="student-detail-grid">
              <div className="detail-item">
                <span className="detail-label">Student ID:</span>
                <span className="detail-value">#{student.id}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">First Name:</span>
                <span className="detail-value">{student.firstname}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Last Name:</span>
                <span className="detail-value">{student.lastname}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Course:</span>
                <span className="detail-value">{student.course}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Section:</span>
                <span className="detail-value">{student.section}</span>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
