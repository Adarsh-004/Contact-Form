import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../store/contactSlice';
import { Box, Button, TextField } from '@mui/material';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState({});
  const contacts = useSelector((state) => state.contacts);
  const dispatch = useDispatch();

  const validate = () => {
    const newErrors = {};

    // Name
    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (form.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (!/^[a-zA-Z0-9_ ]+$/.test(form.name)) {
      newErrors.name = 'Name can only contain letters, numbers, spaces and underscores';
    }

    // Email
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Email is not valid';
    } else if (contacts.some((c) => c.email === form.email)) {
      newErrors.email = 'This email is already used';
    }

    // Phone
    if (!form.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(form.phone)) {
      newErrors.phone = 'Phone must be 10 digits';
    } else if (contacts.some((c) => c.phone === form.phone)) {
      newErrors.phone = 'This phone number is already used';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    dispatch(addContact(form));
    setForm({ name: '', email: '', phone: '' });
    setErrors({});
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, mb: 2 }}>
      <TextField
        label="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        error={Boolean(errors.name)}
        helperText={errors.name}
        required
      />
      <TextField
        label="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
        error={Boolean(errors.email)}
        helperText={errors.email}
        required
      />
      <TextField
        label="Phone"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        error={Boolean(errors.phone)}
        helperText={errors.phone}
        required
      />
      <Button type="submit" variant="contained">Add</Button>
    </Box>
  );
}
