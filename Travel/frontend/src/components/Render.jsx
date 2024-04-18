import { useState, useEffect } from 'react'

const Render = () => {
  const [val, setVal] = useState(false);
  const [res, setRes] = useState({});

  const user_input = "I want to go to monaco with no budget constraints. i will be staying there for 3 days."

  const fetchData = () => {
    fetch('http://localhost:5000/generate_text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user_input: user_input })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Receive the response as JSON
      })
      .then((data) => {
        setVal(true);
        setRes(parseData(data.generated_text));
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      })
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Function to parse the generated_text and create the dictionary structure
  const parseData = (text) => {
    const lines = text.split('\n');
    const dictionary = {};
    let currentDay = null;
    let currentSection = null;

    for (const line of lines) {
      if (line.startsWith('**Day ')||line.startsWith('**Suggested Hotels')||line.startsWith('**Hotel Recommendations:**')||line.startsWith('**Hotel Recommendations**')||line.startsWith('**Total:**')||line.startsWith('**Estimated Total Expenditure:**')||line.startsWith('**Accommodation:**')) {
        currentDay = line.replace('**', '');
        dictionary[currentDay] = {};
      } else if (line.startsWith('* **')) {
        currentSection = line.replace('* **', '').replace('**', '');
        dictionary[currentDay][currentSection] = '';
      } else if (currentSection) {
        dictionary[currentDay][currentSection] += line.trim() + '\n';
      }
    }

    return dictionary;
  }

  return (
    <div>
      {val && (
        <pre>{JSON.stringify(res, null, 2)}</pre>
      )}
    </div>
  )
}

export default Render