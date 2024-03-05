import { useEffect, useState } from 'react';
import { getJournals } from '../../utils/data/journalData';
import JournalCard from '../../components/journals/JournalCard';

function Journal() {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getAllJournals = async () => {
    try {
      const data = await getJournals();
      setJournals(data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch journals:', err);
      setError('Failed to load journals.');
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllJournals();
  }, []);

  if (loading) return <p>Loading journals...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <h1 style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>Journal</h1>
      <article className="journals">
        {journals.map((journal) => (
          <section key={`journal--${journal.id}`} className="goal">
            <JournalCard journalObj={journal} onUpdate={getAllJournals} />
          </section>
        ))}
      </article>
    </>
  );
}

export default Journal;
