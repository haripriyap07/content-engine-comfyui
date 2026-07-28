import { useState, useEffect } from 'react';

const API_BASE = 'https://content-engine-comfyui.onrender.com/api';

function App() {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchJobs = async () => {
    try {
      const res = await fetch(`${API_BASE}/jobs`);

      if (res.ok) {
        const data = await res.json();
        setJobs(data);
      } else {
        console.error("Failed to fetch jobs:", res.status);
      }

    } catch (err) {
      console.error("Failed to fetch jobs", err);
    }
  };

  useEffect(() => {
    fetchJobs();

    const interval = setInterval(fetchJobs, 3000);

    return () => clearInterval(interval);
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productName,
          productDescription,
          productImage
        }),
      });


      if (res.ok) {

        setProductName('');
        setProductDescription('');
        setProductImage('');

        fetchJobs();

      } else {

        alert("Error creating generation job");

      }


    } catch (err) {

      console.error(err);
      alert("Error connecting to backend");

    } finally {

      setLoading(false);

    }
  };


  return (
    <div 
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '2rem',
        fontFamily: 'sans-serif'
      }}
    >

      <h1>Mini Content Engine</h1>

      <p>
        Turn product information into AI-generated lifestyle visual assets.
      </p>


      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          background: '#f5f5f5',
          padding: '1.5rem',
          borderRadius: '8px'
        }}
      >

        <h3>Generate Asset</h3>


        <input
          type="text"
          placeholder="Product Name (e.g. Florentine Wooden Salad Bowl)"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
          style={{ padding: '0.5rem' }}
        />


        <textarea
          placeholder="Product Description"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          required
          rows={3}
          style={{ padding: '0.5rem' }}
        />


        <input
          type="url"
          placeholder="Reference Product Image Link (Optional)"
          value={productImage}
          onChange={(e) => setProductImage(e.target.value)}
          style={{ padding: '0.5rem' }}
        />


        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '0.75rem',
            background: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {loading ? 'Submitting...' : 'Generate Content Job'}
        </button>

      </form>



      <h2 style={{ marginTop: '2.5rem' }}>
        Generation Jobs
      </h2>



      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}
      >

        {
          jobs.length === 0 &&
          <p>No jobs created yet.</p>
        }



        {
          jobs.map((job) => (

            <div
              key={job.id}
              style={{
                border: '1px solid #ccc',
                padding: '1rem',
                borderRadius: '8px'
              }}
            >


              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >

                <h4>
                  #{job.id} - {job.productName}
                </h4>


                <span
                  style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    color: '#fff',
                    fontWeight: 'bold',

                    background:
                      job.status === 'COMPLETED'
                        ? '#16a34a'
                        : job.status === 'PROCESSING'
                        ? '#d97706'
                        : '#6b7280'
                  }}
                >
                  {job.status}
                </span>


              </div>



              <p>
                <strong>Description:</strong>
                {' '}
                {job.productDescription}
              </p>




              {
                job.generatedPrompt && (

                  <p>
                    <strong>LLM Prompt:</strong>
                    {' '}
                    <em>{job.generatedPrompt}</em>
                  </p>

                )
              }





              {
                job.outputImageUrl && (

                  <div style={{ marginTop: '1rem' }}>

                    <strong>
                      Generated Result:
                    </strong>

                    <br />

                    <img
                      src={job.outputImageUrl}
                      alt="Generated result"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '300px',
                        borderRadius: '6px',
                        marginTop: '0.5rem'
                      }}
                    />

                  </div>

                )
              }



            </div>

          ))
        }


      </div>


    </div>
  );
}


export default App;
