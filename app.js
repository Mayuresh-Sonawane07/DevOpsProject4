const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

const feedbackList = [];

app.get('/', (req, res) => {
    const feedbackHTML = feedbackList.map(f => `<li><strong>${f.name}:</strong> ${f.msg}</li>`).join('');

    res.send(`
        <h1>DevOps CI/CD Project Working</h1>
        
        <h3>Leave Feedback</h3>
        <form action="/feedback" method="POST">
            <input type="text" name="name" placeholder="Your Name" required /><br><br>
            <textarea name="msg" placeholder="Your Feedback" required></textarea><br><br>
            <button type="submit">Submit Feedback</button>
        </form>

        <h3>Recent Feedback</h3>
        <ul>
            ${feedbackHTML || '<li>No feedback yet. Be the first!</li>'}
        </ul>
    `);
});

app.post('/feedback', (req, res) => {
    const { name, msg } = req.body;
    if (name && msg) {
        feedbackList.push({ name, msg });
    }
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('Running on port 3000');
});
