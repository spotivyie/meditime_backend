// Verifica se o usuário tem role de admin
export const isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Acesso restrito ao administrador' });
    }
    next();
};

// Verifica se o usuário tem role de doctor
export const isDoctor = (req, res, next) => {
    if (!req.user || req.user.role !== 'doctor') {
        return res.status(403).json({ message: 'Acesso restrito ao médico' });
    }
    next();
};

// Verifica se o usuário tem role de patient
export const isPatient = (req, res, next) => {
    if (!req.user || req.user.role !== 'patient') {
        return res.status(403).json({ message: 'Acesso restrito ao paciente' });
    }
    next();
};

// Verifica se o usuário é admin ou doctor
export const isAdminOrDoctor = (req, res, next) => {
    if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'doctor')) {
        return res.status(403).json({ message: 'Acesso restrito ao administrador ou médico' });
    }
    next();
};
