const express = require('express');
const apiRoutes = require('./routes/api-routes');
const htmlRoutes = require('./routes/html-routes');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(htmlRoutes);
app.use(apiRoutes);

app.listen(PORT, () => {
    console.log(`Now Listening at http://localhost:${PORT}`);
});