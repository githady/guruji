import React, { useState } from 'react';

export default function ContactApp() {
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyO7UeDj2JLXaaOODOtbbVhKilVXSdGrCxPoKSG0sSakRl7NPk7zAe_k0ae_PTLo-71Gg/exec"; 

  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    birthLocation: '',
    gender: '',
    email: '',
    phone: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    const formBody = new URLSearchParams(formData);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: formBody,
        mode: 'no-cors', 
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      
      setStatus('success');
      setFormData({
        firstName: '', middleName: '', lastName: '', dob: '', 
        birthLocation: '', gender: '', email: '', phone: ''
      });
    } catch (error) {
      console.error("Error submitting form", error);
      setStatus('error');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Contact Registration</h2>
      
      {status === 'success' && (
        <div style={{ backgroundColor: '#d4edda', color: '#155724', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>
          Contact saved successfully!
        </div>
      )}

      {status === 'error' && (
        <div style={{ backgroundColor: '#f8d7da', color: '#721c24', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>
          Something went wrong. Please try again.
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
          <div>
            <label>First Name *</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required style={inputStyle} />
          </div>
          <div>
            <label>Middle Name *</label>
            <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} required style={inputStyle} />
          </div>
          <div>
            <label>Last Name *</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required style={inputStyle} />
          </div>
        </div>

        <div>
          <label>Date and Time of Birth *</label>
          <input type="datetime-local" name="dob" value={formData.dob} onChange={handleChange} required style={inputStyle} />
        </div>
        
        <div>
          <label>Birth Location *</label>
          <input type="text" name="birthLocation" value={formData.birthLocation} onChange={handleChange} required style={inputStyle} placeholder="City, Country" />
        </div>

        <div>
          <label>Gender *</label>
          <select name="gender" value={formData.gender} onChange={handleChange} required style={inputStyle}>
            <option value="">Select Gender...</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          <div>
            <label>Email Address *</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required style={inputStyle} />
          </div>
          <div>
            <label>Phone Number *</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required style={inputStyle} />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={status === 'submitting'}
          style={{
            backgroundColor: status === 'submitting' ? '#ccc' : '#007bff',
            color: 'white',
            padding: '12px',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
            marginTop: '10px'
          }}
        >
          {status === 'submitting' ? 'Saving...' : 'Submit Contact'}
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginTop: '5px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  boxSizing: 'border-box'
};