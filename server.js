require('dotenv').config();

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const app = express();
const port = process.env.PORT || 1945;

const authRoute = require('./routes/auth.route');

app.use('/api/v1/auth', authRoute);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => console.log(`sicapin server run on port ${port}`));
