import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async () => {
        try {
            const parsedInput = JSON.parse(jsonInput);
            const res = await axios.post('https://your-vercel-backend-url.vercel.app/bfhl', parsedInput);
            setResponse(res.data);
        } catch (error) {
            console.error('Invalid JSON or request error', error);
        }
    };

    const renderResponse = () => {
        if (!response) return null;
        const { numbers, alphabets, highest_alphabet } = response;

        return (
            <div>
                {selectedOptions.includes('Numbers') && <div>Numbers: {numbers.join(', ')}</div>}
                {selectedOptions.includes('Alphabets') && <div>Alphabets: {alphabets.join(', ')}</div>}
                {selectedOptions.includes('Highest alphabet') && <div>Highest Alphabet: {highest_alphabet}</div>}
            </div>
        );
    };

    return (
        <div>
            <h1>ABCD123</h1>
            <textarea value={jsonInput} onChange={e => setJsonInput(e.target.value)} />
            <button onClick={handleSubmit}>Submit</button>
            <select multiple onChange={e => setSelectedOptions(Array.from(e.target.selectedOptions, option => option.value))}>
                <option value="Numbers">Numbers</option>
                <option value="Alphabets">Alphabets</option>
                <option value="Highest alphabet">Highest alphabet</option>
            </select>
            {renderResponse()}
        </div>
    );
}

export default App;
