// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import Layout from '../components/layouts/Layout';
import './Css/Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Dashboard = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = () => {
    const textToCopy = 'git clone https://github.com/FOURDE1/Data-science.git';
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  };

  return (
    <Layout>
      <h1>Welcome to the Data Visualization Dashboard</h1>
      <p>
        This dashboard allows you to explore various charts and insights based on the scraped data from Al Mayadeen.
      </p>
      <h2>About</h2>
      <p>
        This project is part of a data visualization task using amCharts. You can find more information and the source code on my GitHub.
      </p>
      <h2>Connect with Me</h2>
      <ul>
        <li>
          <a href="https://www.linkedin.com/in/hussein-raad-326a71227/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
          </a>
        </li>
        <li>
          <a href="https://github.com/FOURDE1/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} /> GitHub
          </a>
        </li>
      </ul>
      <h2>Guide to Clone the Repository</h2>
      <p>To clone the tasks repository, follow these steps:</p>
      <ol>
        <li>Open your terminal.</li>
        <li>Navigate to the directory where you want to clone the repository.</li>
        <li>Run the following command:</li>
        <div className="code-container" onClick={handleCopyToClipboard}>
          <pre>
            <code>git clone https://github.com/FOURDE1/Data-science.git</code>
          </pre>
          {copied && <span className="copied-message">Copied!</span>}
        </div>
        <li>Navigate into the cloned repository:</li>
        <pre>
          <code>cd Task3</code>
        </pre>
        <li>Install the dependencies:</li>
        <pre>
          <code>npm install</code>
        </pre>
        <li>Start the development server:</li>
        <pre>
          <code>npm start</code>
        </pre>
      </ol>
    </Layout>
  );
};

export default Dashboard;
