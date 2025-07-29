import mongoose from 'mongoose';

const exameSchema = new mongoose.Schema({
    pacienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tipoExame: { type: String, required: true },
    dataSolicitacao: { type: Date, default: Date.now },
    status: { type: String, enum: ['pendente', 'realizado', 'entregue'], default: 'pendente' },
    resultadoUrl: { type: String },
    observacoes: { type: String },
}, {
    timestamps: true 
});

const Exame = mongoose.model('Exame', exameSchema);

export default Exame;
