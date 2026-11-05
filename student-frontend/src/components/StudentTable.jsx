export default function StudentTable({ students, onEdit, onDelete, loading }) {
  if (loading) {
    return <p className="status-msg">Loading students...</p>;
  }

  if (students.length === 0) {
    return <p className="status-msg">No students found.</p>;
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.firstname}</td>
              <td>{s.lastname}</td>
              <td>{s.course}</td>
              <td>{s.section}</td>
              <td className="action-cell">
                <button className="btn btn-edit" onClick={() => onEdit(s)}>
                  Edit
                </button>
                <button className="btn btn-delete" onClick={() => onDelete(s.id)}>
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
