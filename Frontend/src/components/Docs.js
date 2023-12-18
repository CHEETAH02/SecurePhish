import React, { useState } from 'react';

function Docs() {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(/* Your authentication logic here */);
  const [apiKey, setApiKey] = useState(null);

  const generateApiKey = () => {
    // You can implement your logic for generating API keys here
    const generatedKey = 'your_generated_api_key';
    setApiKey(generatedKey);
  };

  return (
    <div style={{ margin: '5vw', padding: '10px', boxShadow: '4px 4px 8px rgba(0, 77, 153, 0.3)' }}>
      <div style={{ marginBottom: '20px', padding: '20px', backgroundColor: '#e6f3ff', borderRadius: '8px' }}>
        <h1>API Documentation</h1>

        {/* Check if the user is logged in to display API key generation */}
        {userIsLoggedIn ? (
          <div>
            <h2>Generate API Key</h2>
            <button onClick={generateApiKey}>Generate API Key</button>
            {apiKey && (
              <div>
                <p>Your API Key:</p>
                <code>{apiKey}</code>
              </div>
            )}
          </div>
        ) : (
          <p>Please log in to generate an API key.</p>
        )}
      </div>

      <div style={{ marginBottom: '20px', padding: '20px', backgroundColor: '#e6f3ff', borderRadius: '8px' }}>
        {/* Integration Guide */}
        <h2>Integration Guide</h2>
        <p>To integrate our API into your system, follow these simple steps:</p>
        <ol>
          <li>Sign up for an account on our platform.</li>
          <li>Generate an API key by logging into your account and visiting the API Key section.</li>
          <li>Copy the generated API key.</li>
          <li>Integrate the API into your system using the provided documentation.</li>
        </ol>
      </div>

      <div style={{ padding: '20px', backgroundColor: '#e6f3ff', borderRadius: '8px' }}>
        <h3>Sample Code</h3>
        <p>Here is a sample code snippet in JavaScript to get you started:</p>
        <div>
        <p>1. Choose a SecurePhish API Endpoint URL
          <br/>An example endpoint is Check phishing, which checks a URL if it phishing or not. The URL for this endpoint is:
          <br/>
          <p style={{border: '2px solid #ccc', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', wordBreak: 'break-all', color: '#333'}}>const apiUrl = https://securephish.onrender.com/v1/Predict</p>
        </p>
        </div>
      </div>
    </div>
  );
}

export default Docs;
