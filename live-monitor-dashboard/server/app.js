const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.use('/api/admin', require('./routes/admin'));
// ודא שיש גם את שאר הנתיבים שלך

app.listen(3001, () => console.log('Server running'));