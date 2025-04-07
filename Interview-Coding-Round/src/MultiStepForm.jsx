import React, { useState } from "react";

const steps = ["User Info", "Address", "Job Details", "Review", "Confirmation"];

function MultiStepForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    jobTitle: "",
    company: "",
  });
  const [submittedData, setSubmittedData] = useState(null);
console.log(Object.entries(submittedData))
  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    setSubmittedData(formData);
    setStep(step + 1);
  };

  return (
    <div className="multi-step-form">
      <h2>{steps[step]} - {step}</h2>

      {step === 0 && (
        <>
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </>
      )}

      {step === 1 && (
        <input
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />
      )}

      {step === 2 && (
        <>
          <input
            name="jobTitle"
            placeholder="Job Title"
            value={formData.jobTitle}
            onChange={handleChange}
          />
          <input
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={handleChange}
          />
        </>
      )}

      {step === 3 && (
        <pre className="review-data">{JSON.stringify(formData, null, 2)}</pre>
      )}

      {step === 4 && submittedData && (
        <table className="confirmation-table">
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(submittedData).map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="form-navigation">
        {step > 0 && step < steps.length - 1 && (
          <button onClick={handleBack}>Back</button>
        )}
        {step < steps.length - 2 && (
          <button onClick={handleNext}>Next</button>
        )}
        {step === steps.length - 2 && (
          <button onClick={handleSubmit}>Submit</button>
        )}
      </div>
    </div>
  );
}

export default MultiStepForm;