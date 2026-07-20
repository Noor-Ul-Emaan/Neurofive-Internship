import { useState } from 'react';
import './App.css';

const API_URL = 'http://localhost:5000/api/submit-form';

export default function App() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: '',
    joiningDate: '',
    bio: '',
  });
  const [profileImage, setProfileImage] = useState(null);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverFeedback, setServerFeedback] = useState(null);

  // Field change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  // File change handler
  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
    if (errors.profileImage) setErrors({ ...errors, profileImage: '' });
  };

  // Client-Side Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim() || formData.fullName.length < 3) {
      newErrors.fullName = 'Full Name must be at least 3 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.role) {
      newErrors.role = 'Please select a role.';
    }

    if (!formData.joiningDate) {
      newErrors.joiningDate = 'Joining date is required.';
    }

    if (!formData.bio.trim() || formData.bio.length < 10) {
      newErrors.bio = 'Bio must be at least 10 characters long.';
    }

    if (!profileImage) {
      newErrors.profileImage = 'Please upload a profile image.';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerFeedback(null);

    // 1. Run Client-side Validation
    const clientErrors = validateForm();
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    // 2. Prepare FormData for file payload
    const payload = new FormData();
    payload.append('fullName', formData.fullName);
    payload.append('email', formData.email);
    payload.append('role', formData.role);
    payload.append('joiningDate', formData.joiningDate);
    payload.append('bio', formData.bio);
    payload.append('profileImage', profileImage);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: payload,
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) setErrors(data.errors);
        throw new Error(data.message || 'Server validation failed!');
      }

      setServerFeedback({ type: 'success', message: data.message });
      // Reset Form on Success
      setFormData({ fullName: '', email: '', role: '', joiningDate: '', bio: '' });
      setProfileImage(null);
    } catch (err) {
      setServerFeedback({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-card">
      <h2>User Registration Form</h2>

      {serverFeedback && (
        <div className={`banner ${serverFeedback.type}`}>
          {serverFeedback.message}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* 1. Text Input: Full Name */}
        <div className="form-group">
          <label>Full Name *</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={errors.fullName ? 'input-error' : ''}
            placeholder="John Doe"
          />
          {errors.fullName && <p className="error-text">{errors.fullName}</p>}
        </div>

        {/* 2. Email Input */}
        <div className="form-group">
          <label>Email Address *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'input-error' : ''}
            placeholder="john@example.com"
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>

        {/* 3. Dropdown / Select Input */}
        <div className="form-group">
          <label>Role *</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={errors.role ? 'input-error' : ''}
          >
            <option value="">-- Select Role --</option>
            <option value="developer">Developer</option>
            <option value="designer">Designer</option>
            <option value="manager">Project Manager</option>
          </select>
          {errors.role && <p className="error-text">{errors.role}</p>}
        </div>

        {/* 4. Date Picker Input */}
        <div className="form-group">
          <label>Joining Date *</label>
          <input
            type="date"
            name="joiningDate"
            value={formData.joiningDate}
            onChange={handleChange}
            className={errors.joiningDate ? 'input-error' : ''}
          />
          {errors.joiningDate && <p className="error-text">{errors.joiningDate}</p>}
        </div>

        {/* 5. Textarea: Bio */}
        <div className="form-group">
          <label>Short Bio *</label>
          <textarea
            name="bio"
            rows="3"
            value={formData.bio}
            onChange={handleChange}
            className={errors.bio ? 'input-error' : ''}
            placeholder="Write a brief introduction..."
          ></textarea>
          {errors.bio && <p className="error-text">{errors.bio}</p>}
        </div>

        {/* 6. File / Image Input */}
        <div className="form-group">
          <label>Profile Picture (JPG/PNG/WEBP) *</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={errors.profileImage ? 'input-error' : ''}
          />
          {errors.profileImage && <p className="error-text">{errors.profileImage}</p>}
        </div>

        {/* Submit Button with Loading State */}
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting & Validating...' : 'Submit Registration'}
        </button>
      </form>
    </div>
  );
}