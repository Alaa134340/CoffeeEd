import { useState } from 'react';

function EventSignUPForm() {
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [event, setEvent] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
  };

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
        
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          <option value="bookclub">Book Club</option>
          <option value="latteart">Latte Art Workshop</option>
          <option value="artclass">Art Classes</option>
        </select>
        
        <button 
          type="submit"
          style={{
            width: '100%',
            padding: '14px',
            backgroundColor: '#5A3E36',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: '18px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            fontFamily: "'Lobster', cursive"
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#3D2C27'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#5A3E36'}
          onClick={() => alert("you have signed up for the class!")}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default EventSignUPForm;