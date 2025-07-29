import Exame from '../models/Exame.js';

// Criar novo exame, associando doctorId do usuário logado
export const createExame = async (req, res) => {
  try {
    const doctorId = req.user._id;  
    if (!doctorId) return res.status(401).json({ error: 'Usuário não autenticado' });

    const exame = new Exame({ ...req.body, doctorId });
    await exame.save();
    res.status(201).json(exame);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Listar exames do paciente, populando nome do médico
export const getExamesByPaciente = async (req, res) => {
  try {
    const exames = await Exame.find({ pacienteId: req.params.pacienteId })
      .populate('doctorId', 'name');  
    res.json(exames);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Atualizar status do exame
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['pendente', 'realizado', 'entregue'].includes(status)) {
      return res.status(400).json({ error: 'Status inválido' });
    }
    const exame = await Exame.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!exame) return res.status(404).json({ error: 'Exame não encontrado' });
    res.json(exame);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Upload do resultado do exame
export const uploadResultado = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Arquivo não enviado' });

    const exame = await Exame.findByIdAndUpdate(
      req.params.id,
      { resultadoUrl: req.file.path, status: 'entregue' },
      { new: true }
    );

    if (!exame) return res.status(404).json({ error: 'Exame não encontrado' });

    res.json(exame);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export async function getExameById(req, res) {
  try {
    const exame = await Exame.findById(req.params.id).populate('doctorId', 'name');
    if (!exame) {
      return res.status(404).json({ message: 'Exame não encontrado' });
    }
    res.json(exame);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
}
