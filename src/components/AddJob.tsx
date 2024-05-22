import React, { useState } from 'react';

interface Employee {
  id: number;
  name: string;
  dateOfBirth: string;
  email: string;
  address: string;
}

const AddJob: React.FC = () => {
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    dateOfBirth: '',
    email: '',
  });
  const [isFormVisible, setFormVisible] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    const newErrors = { name: '', dateOfBirth: '', email: '' };
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = 'Họ và tên không được để trống.';
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = 'Email không được để trống.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email phải đúng định dạng.';
      isValid = false;
    }

    const currentDate = new Date().toISOString().split('T')[0];
    if (!dateOfBirth) {
      newErrors.dateOfBirth = 'Ngày sinh không được để trống.';
      isValid = false;
    } else if (dateOfBirth > currentDate) {
      newErrors.dateOfBirth = 'Ngày sinh không được lớn hơn ngày hiện tại.';
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      const newEmployee: Employee = {
        id: Date.now(),
        name,
        dateOfBirth,
        email,
        address,
      };

      // Save to localStorage
      const employees = JSON.parse(localStorage.getItem('employees') || '[]');
      employees.push(newEmployee);
      localStorage.setItem('employees', JSON.stringify(employees));

      // Clear form
      setName('');
      setDateOfBirth('');
      setEmail('');
      setAddress('');
      setErrors({ name: '', dateOfBirth: '', email: '' });

      // Close form
      setFormVisible(false);
    }
  };

  const openForm = () => {
    setFormVisible(true);
  };

  const closeForm = () => {
    setFormVisible(false);
  };

  return (
    <>
      <header className="d-flex justify-content-between mb-3">
        <h3>Nhân viên</h3>
        <button onClick={openForm} className="btn btn-primary">Thêm mới nhân viên</button>
      </header>

      {isFormVisible && (
        <div className="overlay">
          <form className="form" onSubmit={handleSubmit}>
            <div className="d-flex justify-content-between align-items-center">
              <h4>Thêm mới nhân viên</h4>
              <i className="fa-solid fa-xmark" onClick={closeForm} style={{ cursor: 'pointer' }} />
            </div>
            <div>
              <label className="form-label" htmlFor="userName">
                Họ và tên
              </label>
              <input
                id="userName"
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <div className="form-text error">{errors.name}</div>}
            </div>
            <div>
              <label className="form-label" htmlFor="dateOfBirth">
                Ngày sinh
              </label>
              <input
                id="dateOfBirth"
                type="date"
                className="form-control"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
              {errors.dateOfBirth && <div className="form-text error">{errors.dateOfBirth}</div>}
            </div>
            <div>
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="text"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <div className="form-text error">{errors.email}</div>}
            </div>
            <div>
              <label className="form-label" htmlFor="address">
                Địa chỉ
              </label>
              <textarea
                className="form-control"
                id="address"
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <button className="w-100 btn btn-primary" type="submit">Thêm mới</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AddJob;
