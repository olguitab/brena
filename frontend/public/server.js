const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const { Contactos } = require('./models'); // Importar el modelo Contactos

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit', async (req, res) => {
  const { nombre, apellidos, telefono, correo } = req.body;

  try {
    await Contactos.create({ nombre, apellidos, telefono, correo });
    res.status(200).send('Formulario enviado exitosamente');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al enviar el formulario');
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

