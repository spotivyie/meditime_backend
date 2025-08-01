import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import exameRoutes from './routes/exameRoutes.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

const allowedOrigins = [
    'http://localhost:5173',
    'https://meditime-frontend.vercel.app'
];

app.use(cookieParser());

app.use(cors({
    origin: function(origin, callback) {
        if (!origin) return callback(null, true); 
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'Acesso negado por CORS: origem não permitida.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
}));

app.use(express.json());

app.use('/uploads', express.static('uploads'));
app.get('/', (req, res) => {
    res.send('MediTime API rodando com ES Modules!');
});

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes); 
app.use('/api', appointmentRoutes);
app.use('/api', exameRoutes);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Conectado ao MongoDB');
}).catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error.message);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
