import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Set document title to roll number when component mounts
  useEffect(() => {
    document.title = "2023001"; // Replace with your actual roll number if different
  }, []);

  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResponse(null);

    try {
      const parsedInput = JSON.parse(jsonInput);

      const result = await axios.post('http://127.0.0.1:8000/bfhl', parsedInput);
      setResponse(result.data);
    } catch (err) {
      if (err.response) {
        setError('Invalid JSON format or server error.');
      } else {
        setError('Invalid JSON format.');
      }
    }
  };

  const renderResponse = () => {
    if (!response) return null;

    const selectedValues = selectedOptions.map(option => option.value);

    return (
      <div>
        <h3>Filtered Response</h3>
        {selectedValues.includes('numbers') && (
          <p>Numbers: {response.numbers.join(', ')}</p>
        )}
        {selectedValues.includes('alphabets') && (
          <p>Alphabets: {response.alphabets.join(', ')}</p>
        )}
        {selectedValues.includes('highest_lowercase_alphabet') && (
          <p>Highest Lowercase Alphabet: {response.highest_lowercase_alphabet.join(', ')}</p>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>API Input</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="5"
          cols="50"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='{"data": ["A","C","z"]}'
        />
        <button type="submit">Submit</button>
        {error && <div className="error">{error}</div>}
      </form>
      {response && (
        <>
          <Select
            options={options}
            isMulti
            onChange={setSelectedOptions}
            placeholder="Select fields to display"
            className="multi-filter"
          />
          {renderResponse()}
        </>
      )}
    </div>
  );
}

export default App;
