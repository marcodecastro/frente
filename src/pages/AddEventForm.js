import React, { useState } from 'react';
import '../styles/common-form.css';

const AddEventForm = () => {
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    description: '',
  });

  const handleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let response;
      if (eventData.id) { // Se o evento já tem um ID, atualize-o
        //response = await fetch(`http://localhost:5000/api/events/${eventData.id}`, {
        response = await fetch(`https://detras.onrender.com/api/events/${eventData.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(eventData),
        });
      } else { // Se o evento não tem um ID, crie um novo
        //response = await fetch('http://localhost:5000/api/events', {
        response = await fetch('https://detras.onrender.com/api/events', {
                   method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(eventData),
        });
      }
  
      if (!response.ok) {
        throw new Error('Failed to add or update event');
      }
  
      const result = await response.json();
      console.log(result.event); // Aqui você pode adicionar a lógica para lidar com o novo evento
      setSuccessMessage(result.message);
      clearForm();
    } catch (error) {
      setError('Error adding or updating event: ' + error);
      console.error('Error adding or updating event:', error);
    } finally {
      setLoading(false);
    }
  };  

  const clearForm = () => {
    setEventData({
      title: '',
      date: '',
      startTime: '',
      endTime: '',
      description: '',
    });
  };


  return (
    <div className='common-form'>
    <form onSubmit={handleSubmit}>
    <div className="form-group">
        <label>Titulo</label>
          <input 
          type="text" 
          name="title" 
          value={eventData.title} 
          onChange={handleChange} 
          required 
          />
      </div>

      <div className="form-group">
        <label>Data</label>
        <input type="date" 
        name="date" 
        value={eventData.date} 
        onChange={handleChange} 
        required 
        />
      </div>

      <div className="form-group">
      <label>Início</label>
        <input type="time" 
        name="startTime" 
        value={eventData.startTime} 
        onChange={handleChange} 
        required 
        />
      </div>

      <div className="form-group">
      <label>Término</label>
          <input type="time" 
          name="endTime" 
          value={eventData.endTime} 
          onChange={handleChange} 
          required 
          />
      </div>

      <div className="form-group">
        <label>Descrição</label> 
          <textarea name="description" 
          value={eventData.description} 
          onChange={handleChange} 
          required 
          />
      </div>

      <div className="form-group">
          {error && <p className="error-message">{error}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
      
        <div className="form-group">
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Enviando...' : 'Adicionar Evento'}
          </button>
        </div>
    </form>
  </div>
  );
};

export default AddEventForm;
