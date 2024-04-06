import { testCandidateRegister } from './TestCandidateRegister.js';
import { testRepresentativeRegister } from './TestRepresentativeRegister.js';
import { testRepresentativeAnalysis } from './TestRepresentativeAnalysis.js';
import dotenv from 'dotenv';
import axios from 'axios';
import mongoose from 'mongoose';

//INICIALIZACION----------------------
dotenv.config({ path: '../../api/v1/.env' });
const mongoUrl = process.env.MONGO_URL ?? 'mongodb://localhost:27017';
const dbName = 'talentdb_test';

//FUNCIONES---------------------------
//TODO - Realizar conexión efectiva con base de datos de prueba
async function createTestDatabase() {
    try {
        // Verificar si ya hay una conexión abierta
        if (mongoose.connection.readyState !== 0) {
            // Cerrar la conexión existente antes de abrir una nueva
            await mongoose.connection.close();
        }

        // Conectar a MongoDB
        await mongoose.connect(`${mongoUrl}/${dbName}`);

        console.log('Conexión exitosa a MongoDB');

        const db = mongoose.connection;

        // Verificar si la base de datos ya existe
        const collections = await db.db.collections();
        const dbExists = collections.some((collection) => collection.collectionName === dbName);

        // Si la base de datos no existe, crearla
        if (!dbExists) {
            console.log(`La base de datos ${dbName} se ha creado correctamente`);
        } else {
            console.log(`La base de datos de prueba ${dbName} ya existe`);
        }
    } catch (error) {
        console.error('Error al conectar a MongoDB durante las pruebas:', error);
    }
}

async function resetTestDatabase() {
    try {
        await mongoose.connect(`${mongoUrl}/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true });

        const collections = await mongoose.connection.db.collections();
        for (let collection of collections) {
            await collection.deleteMany({});
        }

        await mongoose.connection.close();
        console.log('La base de datos de prueba se ha restablecido correctamente');
    } catch (error) {
        console.error('Error al restablecer la base de datos de prueba:', error);
    }
}

//TESTS-------------------------------
async function runTests() {
    //await createTestDatabase();

    // Test para representante
    await testRepresentativeRegister();
    await testRepresentativeAnalysis();

    // Test para candidato
    await testCandidateRegister();

    //await resetTestDatabase();
}

runTests().then(() => {
    console.log("Todos los tests se han ejecutado.");
}).catch(error => {
    console.error(error);
});
