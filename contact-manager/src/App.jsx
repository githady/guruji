import React, { useState, useRef, useEffect } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div style={styles.appContainer}>
      {/* Top Navigation Bar */}
      <nav style={styles.navbar}>
        <div style={styles.navBrand}>Guruji Bharat Dave Portal</div>
        <div style={styles.navLinks}>
          <button 
            style={activeTab === 'dashboard' ? styles.navButtonActive : styles.navButton} 
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard & Chat
          </button>
          <button 
            style={activeTab === 'registration' ? styles.navButtonActive : styles.navButton} 
            onClick={() => setActiveTab('registration')}
          >
            New Registration
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main style={styles.mainContent}>
        {activeTab === 'dashboard' ? <DashboardView /> : <RegistrationView />}
      </main>
    </div>
  );
}

/* =========================================
   1. DASHBOARD & CHAT VIEW
   ========================================= */
function DashboardView() {
  // Dummy Kundli Data
  const kundliData = {
    name: "Aarav Sharma",
    sunSign: "Leo (Simha)",
    moonSign: "Aries (Mesha)",
    nakshatra: "Ashwini",
    currentDasha: "Jupiter (Guru) Mahadasha",
    prediction: "Today brings favorable cosmic alignments for career growth. The presence of Jupiter in your 10th house suggests unexpected support from a mentor. Avoid making large financial investments before sunset."
  };

  // Interactive Chat State
  const [messages, setMessages] = useState([
    { id: 1, sender: 'system', text: 'Welcome to AstroConnect Support. How can we assist with your astrological reading today?' },
    { id: 2, sender: 'user', text: 'Can you tell me more about my current Mahadasha?' },
    { id: 3, sender: 'system', text: 'You are currently in the Jupiter Mahadasha. This is generally a period of expansion, wisdom, and financial stability. Would you like a detailed report?' }
  ]);
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    // Add user message
    const newMsg = { id: Date.now(), sender: 'user', text: inputText };
    setMessages([...messages, newMsg]);
    setInputText('');

    // Simulate an auto-reply after 1 second
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now(), 
        sender: 'system', 
        text: 'Thank you for your message. An astrologer will review your chart and respond shortly.' 
      }]);
    }, 1000);
  };

  return (
    <div style={styles.dashboardGrid}>
      {/* Left Column: Kundli Forecast */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Kundli Overview</h2>
        <div style={styles.profileHeader}>
          <div style={styles.avatar}>AS</div>
          <div>
            <h3 style={{ margin: 0, color: '#1e293b' }}>{kundliData.name}</h3>
            <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>Premium Member</p>
          </div>
        </div>
        
        <div style={styles.dataGrid}>
          <div style={styles.dataBox}>
            <span style={styles.dataLabel}>Sun Sign</span>
            <strong style={styles.dataValue}>{kundliData.sunSign}</strong>
          </div>
          <div style={styles.dataBox}>
            <span style={styles.dataLabel}>Moon Sign</span>
            <strong style={styles.dataValue}>{kundliData.moonSign}</strong>
          </div>
          <div style={styles.dataBox}>
            <span style={styles.dataLabel}>Nakshatra</span>
            <strong style={styles.dataValue}>{kundliData.nakshatra}</strong>
          </div>
          <div style={styles.dataBox}>
            <span style={styles.dataLabel}>Active Dasha</span>
            <strong style={styles.dataValue}>{kundliData.currentDasha}</strong>
          </div>
        </div>

        <div style={styles.predictionBox}>
          <h4 style={{ margin: '0 0 10px 0', color: '#4338ca' }}>Daily Forecast</h4>
          <p style={{ margin: 0, lineHeight: '1.6', color: '#334155' }}>{kundliData.prediction}</p>
        </div>
      </div>

      {/* Right Column: Interactive Chat */}
      <div style={{ ...styles.card, display: 'flex', flexDirection: 'column' }}>
        <h2 style={styles.cardTitle}>General Consult Chat</h2>
        
        <div style={styles.chatWindow}>
          {messages.map((msg) => (
            <div key={msg.id} style={msg.sender === 'user' ? styles.msgWrapperUser : styles.msgWrapperSystem}>
              <div style={msg.sender === 'user' ? styles.msgBubbleUser : styles.msgBubbleSystem}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <form onSubmit={handleSendMessage} style={styles.chatInputContainer}>
          <input 
            style={styles.chatInput}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message..."
          />
          <button type="submit" style={styles.sendButton}>Send</button>
        </form>
      </div>
    </div>
  );
}

/* =========================================
   2. REGISTRATION VIEW (From Previous)
   ========================================= */
function RegistrationView() {
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyO7UeDj2JLXaaOODOtbbVhKilVXSdGrCxPoKSG0sSakRl7NPk7zAe_k0ae_PTLo-71Gg/exec"; 

  const [formData, setFormData] = useState({
    firstName: '', middleName: '', lastName: '', dob: '', 
    birthLocation: '', gender: '', email: '', phone: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    const formBody = new URLSearchParams(formData);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: formBody,
        mode: 'no-cors', 
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      setStatus('success');
      setFormData({ firstName: '', middleName: '', lastName: '', dob: '', birthLocation: '', gender: '', email: '', phone: '' });
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div style={{ ...styles.card, maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={styles.cardTitle}>New Client Registration</h2>
      <p style={{ color: '#64748b', marginBottom: '20px' }}>Enter details below to generate a new birth chart and profile.</p>
      
      {status === 'success' && <div style={styles.alertSuccess}>Registration saved securely!</div>}
      {status === 'error' && <div style={styles.alertError}>Network error. Please try again.</div>}

      <form onSubmit={handleSubmit} style={styles.formLayout}>
        <div style={styles.formRow3}>
          <div><label style={styles.label}>First Name *</label><input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required style={styles.input} /></div>
          <div><label style={styles.label}>Middle Name</label><input type="text" name="middleName" value={formData.middleName} onChange={handleChange} style={styles.input} /></div>
          <div><label style={styles.label}>Last Name *</label><input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required style={styles.input} /></div>
        </div>

        <div style={styles.formRow2}>
          <div><label style={styles.label}>Date and Time of Birth *</label><input type="datetime-local" name="dob" value={formData.dob} onChange={handleChange} required style={styles.input} /></div>
          <div><label style={styles.label}>Birth Location *</label><input type="text" name="birthLocation" value={formData.birthLocation} onChange={handleChange} required style={styles.input} placeholder="City, State, Country" /></div>
        </div>

        <div style={styles.formRow2}>
          <div>
            <label style={styles.label}>Gender *</label>
            <select name="gender" value={formData.gender} onChange={handleChange} required style={styles.input}>
              <option value="">Select Gender...</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option>
            </select>
          </div>
          <div><label style={styles.label}>Phone Number *</label><input type="tel" name="phone" value={formData.phone} onChange={handleChange} required style={styles.input} /></div>
        </div>

        <div><label style={styles.label}>Email Address *</label><input type="email" name="email" value={formData.email} onChange={handleChange} required style={styles.input} /></div>

        <button type="submit" disabled={status === 'submitting'} style={status === 'submitting' ? styles.submitBtnDisabled : styles.submitBtn}>
          {status === 'submitting' ? 'Processing...' : 'Register Profile'}
        </button>
      </form>
    </div>
  );
}

/* =========================================
   3. DESIGN SYSTEM (Inline Styles)
   ========================================= */
const styles = {
  appContainer: { minHeight: '100vh', backgroundColor: '#f1f5f9', fontFamily: 'Inter, system-ui, sans-serif' },
  navbar: { backgroundColor: '#ffffff', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 10 },
  navBrand: { fontSize: '20px', fontWeight: 'bold', color: '#4338ca', letterSpacing: '-0.5px' },
  navLinks: { display: 'flex', gap: '10px' },
  navButton: { padding: '8px 16px', border: 'none', backgroundColor: 'transparent', color: '#64748b', cursor: 'pointer', fontWeight: '500', borderRadius: '6px', transition: 'all 0.2s' },
  navButtonActive: { padding: '8px 16px', border: 'none', backgroundColor: '#e0e7ff', color: '#4338ca', cursor: 'pointer', fontWeight: '600', borderRadius: '6px' },
  mainContent: { padding: '30px', maxWidth: '1200px', margin: '0 auto' },
  
  // Dashboard Grid
  dashboardGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px', height: 'calc(100vh - 140px)' },
  card: { backgroundColor: '#ffffff', borderRadius: '12px', padding: '25px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)', border: '1px solid #e2e8f0' },
  cardTitle: { margin: '0 0 20px 0', color: '#0f172a', fontSize: '18px', fontWeight: '600', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' },
  
  // Kundli Components
  profileHeader: { display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' },
  avatar: { width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#4338ca', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 'bold' },
  dataGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '25px' },
  dataBox: { backgroundColor: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' },
  dataLabel: { display: 'block', fontSize: '12px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' },
  dataValue: { color: '#0f172a', fontSize: '15px' },
  predictionBox: { backgroundColor: '#e0e7ff', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #4338ca' },
  
  // Chat Components
  chatWindow: { flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px', padding: '10px', backgroundColor: '#f8fafc', borderRadius: '8px', marginBottom: '15px', minHeight: '300px' },
  msgWrapperSystem: { display: 'flex', justifyContent: 'flex-start' },
  msgWrapperUser: { display: 'flex', justifyContent: 'flex-end' },
  msgBubbleSystem: { backgroundColor: '#ffffff', color: '#334155', padding: '12px 16px', borderRadius: '12px 12px 12px 0', maxWidth: '80%', border: '1px solid #e2e8f0', fontSize: '14px', lineHeight: '1.5' },
  msgBubbleUser: { backgroundColor: '#4338ca', color: '#ffffff', padding: '12px 16px', borderRadius: '12px 12px 0 12px', maxWidth: '80%', fontSize: '14px', lineHeight: '1.5' },
  chatInputContainer: { display: 'flex', gap: '10px' },
  chatInput: { flex: 1, padding: '12px', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none', fontSize: '14px' },
  sendButton: { padding: '12px 20px', backgroundColor: '#4338ca', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' },
  
  // Registration Form Components
  formLayout: { display: 'flex', flexDirection: 'column', gap: '20px' },
  formRow3: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' },
  formRow2: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' },
  label: { display: 'block', marginBottom: '6px', fontSize: '14px', color: '#475569', fontWeight: '500' },
  input: { width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '15px', boxSizing: 'border-box', backgroundColor: '#f8fafc' },
  submitBtn: { backgroundColor: '#4338ca', color: '#ffffff', padding: '14px', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', marginTop: '10px', transition: 'background-color 0.2s' },
  submitBtnDisabled: { backgroundColor: '#94a3b8', color: '#ffffff', padding: '14px', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'not-allowed', marginTop: '10px' },
  alertSuccess: { backgroundColor: '#dcfce7', color: '#166534', padding: '12px', borderRadius: '6px', marginBottom: '20px', border: '1px solid #bbf7d0' },
  alertError: { backgroundColor: '#fee2e2', color: '#991b1b', padding: '12px', borderRadius: '6px', marginBottom: '20px', border: '1px solid #fecaca' }
};