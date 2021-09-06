require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const multer = require('multer');
const upload = multer();
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const app = express();
const port = process.env.PORT || 1945;

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

const authRouter = require('./routes/auth.route');
const categoryRouter = require('./routes/category.route');
const articleRouter = require('./routes/article.route');
const quizRouter = require('./routes/quiz.route');

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'ZUPERIOR Backend Rest Api',
			version: '1.0.0',
			description: 'backend rest api for ZUPERIOR apps',
		},
		servers: [
			{ url: 'http://localhost:1945/api/v1', description: 'local development' },
			{ url: 'https://zuperior-backend-rest-api.herokuapp.com/api/v1', description: 'production' },
		],
	},
	apis: ['./routes/*.js'],
};
const specs = swaggerJsDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api/v1/category', upload.single('icon'));
app.use('/api/v1/article', upload.single('thumbnail'));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/article', articleRouter);
app.use('/api/v1/quiz', quizRouter);

app.listen(port, () => console.log(`sicapin server run on port ${port}`));
