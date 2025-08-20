
import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import './App.css';


const API_URL = 'http://localhost:8000'; // Update this to your backend URL if needed


function App() {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } = useAuth0();
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    setError(null);
    const userMsg = { role: "user", content: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    try {
      const res = await axios.post(`${API_URL}/api/chat`, {
        message: input
      });
      const aiMsg = { role: "assistant", content: res.data.response || JSON.stringify(res.data) };
      setMessages((msgs) => [...msgs, aiMsg]);
    } catch (err: any) {
      setError(err.message || 'Error calling backend');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>RythmAI Europa</h1>
        <div>
          {!isAuthenticated ? (
            <button className="auth-btn" onClick={() => loginWithRedirect()}>
              Log In
            </button>
          ) : (
            <button className="auth-btn" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
              Log Out
            </button>
          )}
        </div>
      </header>
      <main>
        {isLoading ? (
          <p>Loading authentication...</p>
        ) : isAuthenticated && user ? (
          <div className="profile">
            <img src={user.picture} alt={user.name} className="avatar" />
            <h2>Welcome, {user.name}!</h2>
            <p>{user.email}</p>
          </div>
        ) : (
          <p>Please log in to access the app features.</p>
        )}

        <section className="api-section">
          <h3>AI Chat</h3>
          <div className="chat-box">
            {messages.length === 0 && <div className="empty-chat">Start the conversation!</div>}
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-msg ${msg.role}`}>
                <span className="role">{msg.role === 'user' ? 'You' : 'RythmAI'}:</span> {msg.content}
              </div>
            ))}
            {loading && <div className="chat-msg assistant">RythmAI is typing...</div>}
          </div>
          <form className="chat-form" onSubmit={sendMessage}>
            <input
              type="text"
              className="chat-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={!isAuthenticated || loading}
            />
            <button className="api-btn" type="submit" disabled={!isAuthenticated || loading || !input.trim()}>
              Send
            </button>
          </form>
          {error && <p className="error">{error}</p>}
        </section>
      </main>
      <footer className="footer">
        <p>Made with <span role="img" aria-label="heart">❤️</span> by RythmAI Team</p>
      </footer>
    </div>
  );
}

export default App;
