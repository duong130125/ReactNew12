import React, { useEffect, useState } from 'react'
interface Employee {
  id: number;
  name: string;
  dateOfBirth: string;
  email: string;
  address: string;
  status: string;
}

export default function ListJob() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState<Employee | null>(null);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedDateOfBirth, setEditedDateOfBirth] = useState('');
  const [editedAddress, setEditedAddress] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
    setEmployees(storedEmployees);
  }, []);

  const handleBlockUnblock = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowBlockModal(true);
  };

  const handleDelete = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowDeleteModal(true);
  };

  const handleEdit = (employee: Employee) => {
    setEditedEmployee(employee);
    setEditedName(employee.name);
    setEditedEmail(employee.email);
    setEditedDateOfBirth(employee.dateOfBirth);
    setEditedAddress(employee.address);
    setShowEditModal(true);
  };

  const confirmBlockUnblock = () => {
    // Code xác nhận chặn hoặc bỏ chặn
  };

  const confirmDelete = () => {
    // Code xác nhận xóa
  };

  const confirmEdit = () => {
    if (!editedName.trim() || !editedEmail.trim() || !editedDateOfBirth.trim()) {
      setError('Họ và tên, Email và Ngày sinh không được để trống');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editedEmail)) {
      setError('Email không hợp lệ');
      return;
    }

    const currentDate = new Date();
    const selectedDate = new Date(editedDateOfBirth);
    if (selectedDate > currentDate) {
      setError('Ngày sinh không được lớn hơn ngày hiện tại');
      return;
    }

    const updatedEmployees = employees.map((emp) => 
      emp.id === editedEmployee!.id 
        ? { ...emp, name: editedName, email: editedEmail, dateOfBirth: editedDateOfBirth, address: editedAddress } 
        : emp
    );
    setEmployees(updatedEmployees);
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    setShowEditModal(false);
    setEditedEmployee(null);
    setError(null);
  };

  const closeModal = () => {
    setShowBlockModal(false);
    setShowDeleteModal(false);
    setShowEditModal(false);
    setEditedEmployee(null);
    setError(null);
  };
  return (
    <>
     <table className="table table-bordered table-hover table-striped">
        <thead>
          <tr>
            <th>STT</th>
            <th>Họ và tên</th>
            <th>Ngày sinh</th>
            <th>Email</th>
            <th>Địa chỉ</th>
            <th>Trạng thái</th>
            <th colSpan={3}>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={employee.id}>
              <td>{index + 1}</td>
              <td>{employee.name}</td>
              <td>{employee.dateOfBirth}</td>
              <td>{employee.email}</td>
              <td>{employee.address}</td>
              <td>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div className={`status ${employee.status === 'active' ? 'status-active' : 'status-stop'}`} />
                  <span>{employee.status === 'active' ? 'Đang hoạt động' : 'Ngừng hoạt động'}</span>
                </div>
              </td>
              <td>
                <span className="button button-block" onClick={() => handleBlockUnblock(employee)}>
                  {employee.status === 'active' ? 'Chặn' : 'Bỏ chặn'}
                </span>
              </td>
              <td>
                <span className="button button-edit" onClick={() => handleEdit(employee)}>Sửa</span>
              </td>
              <td>
                <span className="button button-delete" onClick={() => handleDelete(employee)}>Xóa</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showBlockModal && (
        <div className="overlay">
          <div className="modal-custom">
            <div className="modal-title">
              <h4>Cảnh báo</h4>
              <i className="fa-solid fa-xmark" onClick={closeModal} />
            </div>
            <div className="modal-body-custom">
              <span>Bạn có chắc chắn muốn {selectedEmployee?.status === 'active' ? 'chặn' : 'bỏ chặn'} tài khoản này?</span>
            </div>
            <div className="modal-footer-custom">
              <button className="btn btn-light" onClick={closeModal}>Hủy</button>
              <button className="btn btn-danger" onClick={confirmBlockUnblock}>Xác nhận</button>
            </div>
          </div>
        </div>
      )}
      {showDeleteModal && (
        <div className="overlay">
          <div className="modal-custom">
            <div className="modal-title">
              <h4>Cảnh báo</h4>
              <i className="fa-solid fa-xmark" onClick={closeModal} />
            </div>
            <div className="modal-body-custom">
              <span>Bạn có chắc chắn muốn xóa tài khoản này?</span>
            </div>
            <div className="modal-footer-custom">
              <button className="btn btn-light" onClick={closeModal}>Hủy</button>
              <button className="btn btn-danger" onClick={confirmDelete}>Xác nhận</button>
            </div>
          </div>
        </div>
      )}
      {showEditModal && (
  <div className="overlay">
    <form className="form">
      <div className="d-flex justify-content-between align-items-center">
        <h4>Chỉnh sửa thông tin nhân viên</h4>
        <i className="fa-solid fa-xmark" onClick={closeModal} style={{ cursor: 'pointer' }} />
      </div>
      <div>
        <label className="form-label" htmlFor="editedUserName">
          Họ và tên
        </label>
        <input
          id="editedUserName"
          type="text"
          className="form-control"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
        />
        {error && <div className="form-text error">{error.name}</div>}
      </div>
      <div>
        <label className="form-label" htmlFor="editedDateOfBirth">
          Ngày sinh
        </label>
        <input
          id="editedDateOfBirth"
          type="date"
          className="form-control"
          value={editedDateOfBirth}
          onChange={(e) => setEditedDateOfBirth(e.target.value)}
        />
        {error && <div className="form-text error">{error.dateOfBirth}</div>}
      </div>
      <div>
        <label className="form-label" htmlFor="editedEmail">
          Email
        </label>
        <input
          id="editedEmail"
          type="text"
          className="form-control"
          value={editedEmail}
          onChange={(e) => setEditedEmail(e.target.value)}
        />
        {error && <div className="form-text error">{error.email}</div>}
      </div>
      <div>
        <label className="form-label" htmlFor="editedAddress">
          Địa chỉ
        </label>
        <textarea
          className="form-control"
          id="editedAddress"
          rows={3}
          value={editedAddress}
          onChange={(e) => setEditedAddress(e.target.value)}
        />
      </div>
      <div>
        <button className="w-100 btn btn-primary" type="submit">
          Lưu
        </button>
      </div>
    </form>
  </div>
)}
    </>
  )
}

