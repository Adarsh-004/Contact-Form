import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../store/contactSlice';
import { Box, Button, TextField } from '@mui/material';

export default function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedForm = { ...form, [name]: value };

    if (name === 'name') {
      const cleaned = value
        .toLowerCase()
        .replace(/\s+/g, '')
        .replace(/[^a-z0-9_]/g, '');
      const generatedEmail = cleaned ? `${cleaned}@gmail.com` : '';
      updatedForm.email = generatedEmail;
    }

    setForm(updatedForm);
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!/^[a-zA-Z0-9_ ]+$/.test(form.name)) {
      newErrors.name = 'Only letters, numbers, spaces and _ allowed';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Invalid email format';
    } else if (contacts.some((c) => c.email === form.email)) {
      newErrors.email = 'Email already exists';
    }

    if (!form.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(form.phone)) {
      newErrors.phone = 'Phone must be 10 digits';
    } else if (contacts.some((c) => c.phone === form.phone)) {
      newErrors.phone = 'Phone already exists';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    dispatch(addContact(form));
    setForm({ name: '', email: '', phone: '' });
    setErrors({});
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
          required
        />
        <TextField
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          required
        />
        <TextField
          label="Phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          error={!!errors.phone}
          helperText={errors.phone}
          required
        />
        <Button type="submit" variant="contained">
          Add
        </Button>
      </Box>

      {/* 🔥 Live Preview Box */}
      {(form.name || form.email || form.phone) && (
        <Box
          sx={{
            mt: 2,
            p: 2,
            border: '1px dashed grey',
            borderRadius: 2,
            bgcolor: '#f9f9f9',
            maxWidth: 400,
          }}
        >
          <strong>🔍 Live Preview:</strong>
          <div>👤 <strong>Name:</strong> {form.name || '-'}</div>
          <div>✉️ <strong>Email:</strong> {form.email || '-'}</div>
          <div>📞 <strong>Phone:</strong> {form.phone || '-'}</div>
        </Box>
      )}
    </>
  );
}
