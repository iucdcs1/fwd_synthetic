import { Pool } from 'pg';
import express from 'express';
import cors from 'cors';

const app = express();
const port = 5000; // Replace with your desired port number

// PostgreSQL database configuration
const pool = new Pool({
	connectionString:
		'postgres://gvmrzsax:mIdwjpEt1B84eZYL53o7VP-J8Qr-AN1o@john.db.elephantsql.com/gvmrzsax'
});

app.use(cors({ origin: 'http://localhost:5173' }));
// API endpoint to fetch data from the database table and return it as JSON
app.get('/api/data/', async (req, res) => {
	try {
		const queryResult = await pool.query('SELECT * FROM reviews');
		const data = queryResult.rows; // Assuming there's one review for the given ID
		res.json(data);
	} catch (error) {
		console.error('Error fetching review:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

app.get('/api/data/:reviewId', async (req, res) => {
	const { reviewId } = req.params;

	try {
		const queryResult = await pool.query('SELECT * FROM reviews WHERE number = $1', [reviewId]);
		const data = queryResult.rows[0]; // Assuming there's one review for the given ID
		res.json(data);
	} catch (error) {
		console.error('Error fetching review:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// Start the server
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
