import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_URL from '../config';

function EventSignUPForm() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [event, setEvent] = useState('');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Check if user is logged in
    const userId = localStorage.getItem('userId');
    const storedUsername = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('userEmail');

    if (!userId) {
      setError('You must be logged in to sign up for events');
      setIsLoggedIn(false);
      return;
    }

    setIsLoggedIn(true);
    setUsername(storedUsername || '');
    setEmail(storedEmail || '');
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${API_URL}/api/events`);
      const data = await response.json();
      setEvents(data);
      if (data.length > 0) {
        setEvent(data[0].name);
      }
    } catch (err) {
      console.error('Failed to fetch events:', err);
      setError('Failed to load events');
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const userId = localStorage.getItem('userId');
    console.log('userId from localStorage:', userId);
    if (!userId) {
      setError('You must be logged in to sign up for events');
      setLoading(false);
      return;
    }

    if (!age || !event) {
      setError('Please fill in all fields');
      setLoading(false);
      console.log('Form validation failed - age:', age, 'event:', event);
      return;
    }

    try {
      const payload = {
        age: parseInt(age),
        event_name: event,
      };
      
      console.log('Form values - age (string):', age, 'event (string):', event);
      console.log('Sending event signup payload:', payload);
      console.log('Payload JSON:', JSON.stringify(payload));

      const response = await fetch(`${API_URL}/api/event/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'user-id': userId,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Signup error:', data);
        setError(data.error || 'Signup failed');
        setLoading(false);
        return;
      }

      setSuccess('You have successfully signed up for the event!');
      setAge('');
      setEvent(events.length > 0 ? events[0].name : '');
      setLoading(false);
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/orders');
      }, 2000);
    } catch (err) {
      console.error('Error during signup:', err);
      setError('An error occurred. Please try again. Details: ' + err.message);
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={{
        backgroundColor: '#F5EDE2',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px 20px'
      }}>
        <div style={{
          backgroundColor: '#fff',
          padding: '40px',
          borderRadius: '15px',
          boxShadow: '0 5px 15px rgba(90, 62, 54, 0.2)',
          maxWidth: '500px',
          width: '100%',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontFamily: "'Lobster', cursive",
            color: '#5A3E36',
            marginBottom: '30px',
            fontSize: '2.5rem'
          }}>
            Please Log In
          </h2>
          <p style={{
            color: '#666',
            marginBottom: '20px',
            fontSize: '16px'
          }}>
            You must be logged in to sign up for events.
          </p>
          <button
            onClick={() => navigate('/signin')}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#5A3E36',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              marginBottom: '10px'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#3D2C27'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#5A3E36'}
          >
            Sign In
          </button>
          <button
            onClick={() => navigate('/signup')}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#8B7355',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#6B5344'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#8B7355'}
          >
            Sign Up
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: '#F5EDE2',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px 20px'
    }}>
      <form 
        onSubmit={handleSubmit}
        style={{
          backgroundColor: '#fff',
          padding: '40px',
          borderRadius: '15px',
          boxShadow: '0 5px 15px rgba(90, 62, 54, 0.2)',
          maxWidth: '500px',
          width: '100%'
        }}
      >
        <h2 style={{
          fontFamily: "'Lobster', cursive",
          color: '#5A3E36',
          textAlign: 'center',
          marginBottom: '30px',
          fontSize: '2.5rem'
        }}>
           Class Sign Up
        </h2>

        {/* Display user info as read-only */}
        <div style={{
          marginBottom: '20px',
          padding: '12px',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          border: '2px solid #d0bfb1'
        }}>
          <p style={{ margin: '5px 0', color: '#5A3E36' }}>
            <strong>Username:</strong> {username}
          </p>
          <p style={{ margin: '5px 0', color: '#5A3E36' }}>
            <strong>Email:</strong> {email}
          </p>
        </div>
        
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#5A3E36' }}>Age</label>
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '20px',
            border: '2px solid #d0bfb1',
            borderRadius: '8px',
            fontSize: '16px',
            boxSizing: 'border-box',
            fontFamily: 'Arial, sans-serif'
          }}
        />
        
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#5A3E36' }}>Select an Event</label>
        
        <select
          value={event}
          onChange={(e) => setEvent(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '25px',
            border: '2px solid #d0bfb1',
            borderRadius: '8px',
            fontSize: '16px',
            boxSizing: 'border-box',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: 'white',
            cursor: 'pointer'
          }}
        >
          <option value="">Select an Event</option>
          {events.map((evt) => (
            <option key={evt.id} value={evt.name}>
              {evt.name}
            </option>
          ))}
        </select>
        
        <button 
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '14px',
            backgroundColor: loading ? '#999' : '#5A3E36',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: '18px',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.3s ease',
            fontFamily: "'Lobster', cursive"
          }}
          onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#3D2C27')}
          onMouseOut={(e) => !loading && (e.target.style.backgroundColor = '#5A3E36')}
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>

        {error && (
          <p style={{
            color: 'red',
            marginTop: '15px',
            textAlign: 'center',
            fontWeight: 'bold'
          }}>
            {error}
          </p>
        )}

        {success && (
          <p style={{
            color: 'green',
            marginTop: '15px',
            textAlign: 'center',
            fontWeight: 'bold'
          }}>
            {success}
          </p>
        )}
      </form>
    </div>
  );
}

export default EventSignUPForm;