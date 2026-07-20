import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// File upload setup via Multer
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB Limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files (JPG, PNG, WEBP) are allowed!'));
    }
  }
});

// SERVER-SIDE VALIDATION ROUTE
app.post('/api/submit-form', upload.single('profileImage'), (req, res) => {
  const { fullName, email, role, joiningDate, bio } = req.body;
  const errors = {};

  // 1. Full Name Validation
  if (!fullName || fullName.trim().length < 3) {
    errors.fullName = 'Full Name must be at least 3 characters long.';
  }

  // 2. Email Validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.email = 'Please provide a valid email address.';
  }

  // 3. Dropdown Role Validation
  if (!role || role === '') {
    errors.role = 'Please select a valid role.';
  }

  // 4. Joining Date Validation
  if (!joiningDate) {
    errors.joiningDate = 'Joining Date is required.';
  }

  // 5. Bio Validation
  if (!bio || bio.trim().length < 10) {
    errors.bio = 'Bio must be at least 10 characters long.';
  }

  // 6. File Upload Validation
  if (!req.file) {
    errors.profileImage = 'Profile image is required.';
  }

  // If validation errors exist
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  // SUCCESS Response
  res.status(200).json({
    success: true,
    message: 'Form submitted and validated successfully on the server!',
    data: { fullName, email, role, joiningDate, bio, fileName: req.file.originalname }
  });
});

app.listen(PORT, () => {
  console.log(`Validation Server running on http://localhost:${PORT}`);
});