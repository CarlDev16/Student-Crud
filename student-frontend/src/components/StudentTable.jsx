export default function StudentTable({
  students,
  onView,
  onEdit,
  onDelete,
  loading,
}) {
  if (loading) {
    return (
      <div className="table-loading">
        <div className="spinner"></div>
        <p className="status-msg">Loading student records...</p>
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📋</div>
        <p className="empty-title">No Students Found</p>
        <p className="status-msg">There are no student records matching the criteria.</p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Course</th>
            <th>Section</th>
            <th className="actions-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td className="id-cell">#{s.id}</td>
              <td className="name-cell">{s.firstname}</td>
              <td className="name-cell">{s.lastname}</td>
              <td>
                <span className="course-tag">{s.course}</span>
              </td>
              <td>
                <span className="section-tag">{s.section}</span>
              </td>
              <td className="action-cell">
                <button
                  type="button"
                  className="btn btn-view"
                  title="View Details"
                  onClick={() => onView(s.id)}
                >
                  View
                </button>
                <button
                  type="button"
                  className="btn btn-edit"
                  title="Edit Student"
                  onClick={() => onEdit(s)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-delete"
                  title="Delete Student"
                  onClick={() => onDelete(s.id)}
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
