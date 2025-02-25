import pool from '../../lib/db';

export default async function handler(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM activity'); // Replace with your table name
    res.status(200).json(rows); // Send the result back as JSON
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}