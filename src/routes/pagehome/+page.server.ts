import pkg from 'pg';
const { Pool } = pkg;
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 5000; // Replace with your desired port number

// PostgreSQL database configuration
const pool = new Pool({
	connectionString:
		'postgres://gvmrzsax:mIdwjpEt1B84eZYL53o7VP-J8Qr-AN1o@john.db.elephantsql.com/gvmrzsax'
});

app.use(cors());

app.use(bodyParser.json());
// API endpoint to fetch data from the database table and return it as JSON
app.get('/api/data', async (req, res) => {
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

app.post('/api/addReview', async (req, res) => {
	const { name, score, text, short_text, email } = req.body;
	try {
		const query =
			'INSERT INTO reviews (name, score, text, short_text, email) VALUES ($1, $2, $3, $4, $5) RETURNING *';
		const values = [name, score, text, short_text, email];
		const queryResult = await pool.query(query, values);
		const newReview = queryResult.rows[0];

		res.json(newReview);
	} catch (error) {
		console.log('Error adding review: ', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});
// Start the server
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
