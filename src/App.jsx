// App.jsx
import React from 'react';
import { Container } from '@mui/material';
import ContactForm from './components/ContactForm';
import ContactTable from './components/ContactTable';

export default function App() {
  return (
    <Container sx={{ mt: 4 }}>
      <ContactForm />
      <ContactTable />
    </Container>
  );
}
