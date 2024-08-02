import { useState } from 'react';

export default function Home() {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async () => {
        try {
            const res = await fetch('https://<YOUR_BACKEND_URL>/bfhl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsonInput
            });

            const data = await res.json();
            setResponse(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCheckboxChange = (option) => {
        setSelectedOptions(prev => {
            if (prev.includes(option)) {
                return prev.filter(item => item !== option);
            } else {
                return [...prev, option];
            }
        });
    };

    const renderResponse = () => {
        if (!response) return null;

        let filteredResponse = {};

        if (selectedOptions.includes('Alphabets')) {
            filteredResponse.alphabets = response.alphabets;
        }
        if (selectedOptions.includes('Numbers')) {
            filteredResponse.numbers = response.numbers;
        }
        if (selectedOptions.includes('Highest alphabet')) {
            filteredResponse.highest_alphabet = response.highest_alphabet;
        }

        return (
            <div>
                <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
            </div>
        );
    };

    return (
        <div>
            <h1>BFHL API Frontend</h1>
            <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder='Enter JSON here'
            />
            <button onClick={handleSubmit}>Submit</button>

            <div>
                <input
                    type='checkbox'
                    checked={selectedOptions.includes('Alphabets')}
                    onChange={() => handleCheckboxChange('Alphabets')}
                /> Alphabets
                <input
                    type='checkbox'
                    checked={selectedOptions.includes('Numbers')}
                    onChange={() => handleCheckboxChange('Numbers')}
                /> Numbers
                <input
                    type='checkbox'
                    checked={selectedOptions.includes('Highest alphabet')}
                    onChange={() => handleCheckboxChange('Highest alphabet')}
                /> Highest alphabet
            </div>

            {renderResponse()}
        </div>
    );
}
