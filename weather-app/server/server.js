const express = require('express');
const cors = require('cors');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('152826738328-2gschac9945q44ilfue2n9c6d19nt296.apps.googleusercontent.com');

const app = express();
app.use(cors());
app.use(express.json());

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: '152826738328-2gschac9945q44ilfue2n9c6d19nt296.apps.googleusercontent.com',
    });
    return ticket.getPayload();
}

app.post('/api/google-login', async (req, res) => {

    try {
        console.log('it triggers server!');
        const { token } = req.body;
        const user = await verify(token);
        console.log("User Verified:", user);
        // Here, handle user login logic.
        res.status(200).json({ message: 'User authenticated', user });
    } catch (error) {
        console.log('it triggers server!');
        res.status(401).json({ message: 'Authentication failed' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

