const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const swaggerDocs = yaml.load('swagger.yaml');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sécurité avec Helmet (autorise images locales + base64)
app.use(
  helmet({
    crossOriginResourcePolicy: false,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", 'data:'], // permet images locales et en base64
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        connectSrc: ["'self'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
  })
);

// Dossier images backend
app.use('/images', express.static(path.join(__dirname, 'images')));

// Dossier frontend statique
app.use(express.static(path.join(__dirname, '../FrontEnd')));

// Routes API
const db = require('./models');
const userRoutes = require('./routes/user.routes');
const categoriesRoutes = require('./routes/categories.routes');
const worksRoutes = require('./routes/works.routes');

db.sequelize.sync().then(() => console.log('DB is ready'));

app.use('/api/users', userRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/works', worksRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rediriger toutes les routes inconnues vers index.html (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../FrontEnd/index.html'));
});

module.exports = app;