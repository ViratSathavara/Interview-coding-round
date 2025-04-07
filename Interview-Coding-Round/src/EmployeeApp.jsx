import React, { useState, useEffect } from "react";
import "./EmployeeApp.css";

const initialForm = {
  fullName: "",
  email: "",
  gender: "",
  dob: "",
  department: "",
  phone: "",
  address: "",
  position: "",
  salary: "",
};

const EmployeeApp = () => {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [employees, setEmployees] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const savedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(savedEmployees);
  }, []);

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) {
      errs.fullName = "Full Name is required";
    } else if (formData.fullName.length < 3) {
      errs.fullName = "Full Name must be at least 3 characters long";
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errs.email = "Valid Email required";
    }

    if (!formData.gender) errs.gender = "Gender is required";

    if (!formData.dob || new Date(formData.dob) > new Date()) {
      errs.dob = "Valid DOB required";
    }

    if (!formData.department.trim()) errs.department = "Department is required";

    if (!/^\d{10}$/.test(formData.phone)) {
      errs.phone = "Phone must be 10 digits";
    } else if (!formData.phone.startsWith("9")) {
      errs.phone = "Phone number must start with 9";
    }

    if (!formData.address.trim()) errs.address = "Address is required";

    if (!formData.position.trim()) errs.position = "Position is required";

    if (!formData.salary || isNaN(formData.salary) || formData.salary < 0) {
      errs.salary = "Valid Salary required";
    } else if (formData.salary < 30000) {
      errs.salary = "Salary must be at least ₹10,000";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const updatedList = [...employees];
    if (editIndex !== null) {
      updatedList[editIndex] = formData;
      setEditIndex(null);
    } else {
      updatedList.push(formData);
    }
    setEmployees(updatedList);
    setFormData(initialForm);
    setErrors({});
  };

  const handleEdit = (index) => {
    setFormData(employees[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedList = employees.filter((_, i) => i !== index);
    setEmployees(updatedList);
  };

  return (
    <div className="container">
      <h2>Employee Management</h2>

      <form onSubmit={handleSubmit} className="form">
        {[
          { name: "fullName", placeholder: "Full Name" },
          { name: "email", placeholder: "Email", type: "email" },
          { name: "dob", type: "date" },
          { name: "department", placeholder: "Department" },
          { name: "phone", placeholder: "Phone" },
          { name: "address", placeholder: "Address" },
          { name: "position", placeholder: "Position" },
          { name: "salary", placeholder: "Salary", type: "number" },
        ].map(({ name, placeholder, type = "text" }) => (
          <div className="form-group" key={name}>
            <input
              type={type}
              name={name}
              placeholder={placeholder || name}
              value={formData[name]}
              onChange={handleChange}
            />
            {errors[name] && <small className="error">{errors[name]}</small>}
          </div>
        ))}

        <div className="form-group">
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          {errors.gender && <small className="error">{errors.gender}</small>}
        </div>

        <button type="submit">{editIndex !== null ? "Update" : "Add"} Employee</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>Full Name</th><th>Email</th><th>Gender</th><th>DOB</th><th>Department</th>
            <th>Phone</th><th>Address</th><th>Position</th><th>Salary</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((emp, index) => (
              <tr key={index}>
                <td>{emp.fullName}</td>
                <td>{emp.email}</td>
                <td>{emp.gender}</td>
                <td>{emp.dob}</td>
                <td>{emp.department}</td>
                <td>{emp.phone}</td>
                <td>{emp.address}</td>
                <td>{emp.position}</td>
                <td>₹{emp.salary}</td>
                <td>
                  <button onClick={() => handleEdit(index)}>Edit</button>{" "}
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="10" align="center">No employees added yet</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeApp;
