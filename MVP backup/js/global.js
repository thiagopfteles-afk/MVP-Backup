// ===== FUNÇÕES GLOBAIS =====

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    initGlobalFunctions();
    highlightActiveNavLink();
    initScrollEffects();
    initAnimations();
});

// ===== FUNÇÕES DE INICIALIZAÇÃO =====

function initGlobalFunctions() {
    initModals();
    initForms();
    initSmoothScroll();
    console.log('Funções globais inicializadas');
}

function initModals() {
    // Elementos dos modais
    const loginModal = document.getElementById('loginModal');
    const cadastroModal = document.getElementById('cadastroModal');
    const closeButtons = document.querySelectorAll('.close');
    
    // Botões que abrem modais
    const loginButtons = document.querySelectorAll('[id*="LoginBtn"], .btn-secondary');
    const cadastroButtons = document.querySelectorAll('[id*="CadastroBtn"], .btn-primary:not(.newsletter-form .btn)');
    
    // Abrir modal de login
    loginButtons.forEach(btn => {
        if (btn.id !== 'mobileLoginBtn') { // Evitar duplicação
            btn.addEventListener('click', () => {
                if (loginModal) loginModal.style.display = 'block';
            });
        }
    });
    
    // Abrir modal de cadastro
    cadastroButtons.forEach(btn => {
        if (!btn.closest('.auth-options') && !btn.closest('.newsletter-form')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (cadastroModal) cadastroModal.style.display = 'block';
            });
        }
    });
    
    // Fechar modais
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (loginModal) loginModal.style.display = 'none';
            if (cadastroModal) cadastroModal.style.display = 'none';
        });
    });
    
    // Fechar modal ao clicar fora
    window.addEventListener('click', (event) => {
        if (loginModal && event.target === loginModal) {
            loginModal.style.display = 'none';
        }
        if (cadastroModal && event.target === cadastroModal) {
            cadastroModal.style.display = 'none';
        }
    });
}

function initForms() {
    // Formulário de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Formulário de cadastro
    const cadastroForm = document.getElementById('cadastroForm');
    if (cadastroForm) {
        cadastroForm.addEventListener('submit', handleCadastro);
    }
    
    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletter);
    }
}

// ===== HANDLERS DE FORMULÁRIOS =====

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (email && password) {
        showNotification('Login realizado com sucesso!', 'success');
        document.getElementById('loginModal').style.display = 'none';
        document.getElementById('loginForm').reset();
        
        // Redirecionar para home após login (opcional)
        setTimeout(() => {
            if (!window.location.href.includes('home.html')) {
                window.location.href = 'home.html';
            }
        }, 1000);
    } else {
        showNotification('Por favor, preencha todos os campos.', 'error');
    }
}

function handleCadastro(e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('cadastroEmail').value;
    const password = document.getElementById('cadastroPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (!nome || !email || !password || !confirmPassword) {
        showNotification('Por favor, preencha todos os campos.', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showNotification('As senhas não coincidem.', 'error');
        return;
    }
    
    if (password.length < 6) {
        showNotification('A senha deve ter pelo menos 6 caracteres.', 'error');
        return;
    }
    
    showNotification('Cadastro realizado com sucesso!', 'success');
    document.getElementById('cadastroModal').style.display = 'none';
    document.getElementById('cadastroForm').reset();
}

function handleNewsletter(e) {
    e.preventDefault();
    const emailInput = e.target.querySelector('input[type="email"]');
    const email = emailInput.value;
    
    if (email) {
        showNotification('Obrigado por assinar nossa newsletter!', 'success');
        e.target.reset();
    }
}

// ===== NAVEGAÇÃO E UI =====

function highlightActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initScrollEffects() {
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.2)';
                header.style.background = 'linear-gradient(135deg, #1e5799 0%, #1a4d8c 100%)';
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                header.style.background = 'linear-gradient(135deg, #1e5799 0%, #207cca 100%)';
            }
        });
    }
}

// ===== ANIMAÇÕES =====

function initAnimations() {
    // Configuração do Intersection Observer para animações
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Elementos para animar
    const animatedElements = document.querySelectorAll('.feature-card, .service-card, .access-card, .section-card, .article-card, .team-member, .value-card, .stat-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Adicionar classe de animação quando visível
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// ===== NOTIFICAÇÕES =====

function showNotification(message, type = 'info') {
    // Remover notificação existente
    const existingNotification = document.querySelector('.global-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Criar nova notificação
    const notification = document.createElement('div');
    notification.className = `global-notification global-notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    // Estilos da notificação
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 3000;
        display: flex;
        align-items: center;
        gap: 15px;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Botão de fechar
    notification.querySelector('button').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(notification);
    
    // Remover automaticamente após 5 segundos
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// ===== UTILITÁRIOS =====

// Debounce function para otimizar performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Formatação de dados
function formatDate(date) {
    return new Date(date).toLocaleDateString('pt-BR');
}

// Validação de email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== EXPORTAÇÃO PARA USO GLOBAL =====
window.globalUtils = {
    showNotification,
    debounce,
    formatDate,
    isValidEmail
};
// ===== SISTEMA DE AGENDAMENTO COM PREPARAÇÃO PARA BANCO DE DADOS =====

class SistemaAgendamento {
    constructor() {
        this.agendamentos = [];
        this.medicos = [];
        this.especialidades = [];
        this.horariosOcupados = {};
        
        this.init();
    }

    async init() {
        await this.carregarDadosIniciais();
        this.inicializarTabs();
        this.configurarEventos();
        this.configurarDataMinima();
    }

    // ===== SERVIÇOS PARA BANCO DE DADOS (MOCK - SERÃO SUBSTITUÍDOS) =====

    async carregarDadosIniciais() {
        try {
            // Estes serviços serão substituídos por chamadas reais ao backend
            this.medicos = await this.medicoService.getMedicos();
            this.especialidades = await this.medicoService.getEspecialidades();
            this.agendamentos = await this.agendamentoService.getAgendamentos();
            this.horariosOcupados = await this.agendamentoService.getHorariosOcupados();
            
            this.carregarMedicosSelect();
            this.carregarEspecialidadesSelect();
            this.carregarHistorico();
            this.carregarGridMedicos();
            
        } catch (error) {
            console.error('Erro ao carregar dados iniciais:', error);
            showNotification('Erro ao carregar dados. Tente novamente.', 'error');
        }
    }

    // Serviço de Médicos (Mock - substituir por API real)
    medicoService = {
        async getMedicos() {
            // SIMULAÇÃO: Substituir por fetch('/api/medicos')
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve([
                        {
                            id: 1,
                            nome: 'Dr. João Silva',
                            especialidade: 'Urologia',
                            crm: 'SP-123456',
                            experiencia: '15 anos',
                            disponibilidade: ['Segunda', 'Quarta', 'Sexta'],
                            horarios: ['08:00', '09:00', '10:00', '14:00', '15:00', '16:00'],
                            telefone: '(11) 9999-1111',
                            email: 'joao.silva@clinica.com',
                            ativo: true
                        },
                        {
                            id: 2,
                            nome: 'Dr. Carlos Santos',
                            especialidade: 'Cardiologia',
                            crm: 'SP-234567',
                            experiencia: '12 anos',
                            disponibilidade: ['Terça', 'Quinta'],
                            horarios: ['08:30', '09:30', '10:30', '14:30', '15:30', '16:30'],
                            telefone: '(11) 9999-2222',
                            email: 'carlos.santos@clinica.com',
                            ativo: true
                        }
                    ]);
                }, 500);
            });
        },

        async getEspecialidades() {
            // SIMULAÇÃO: Substituir por fetch('/api/especialidades')
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(['Urologia', 'Cardiologia', 'Endocrinologia', 'Psicologia']);
                }, 300);
            });
        },

        async getMedicoById(id) {
            // SIMULAÇÃO: Substituir por fetch(`/api/medicos/${id}`)
            const medicos = await this.getMedicos();
            return medicos.find(medico => medico.id === id);
        },

        async getMedicosPorEspecialidade(especialidade) {
            // SIMULAÇÃO: Substituir por fetch(`/api/medicos?especialidade=${especialidade}`)
            const medicos = await this.getMedicos();
            return medicos.filter(medico => medico.especialidade === especialidade && medico.ativo);
        }
    };

    // Serviço de Agendamentos (Mock - substituir por API real)
    agendamentoService = {
        async getAgendamentos() {
            // SIMULAÇÃO: Substituir por fetch('/api/agendamentos')
            const agendamentosSalvos = localStorage.getItem('agendamentos');
            return agendamentosSalvos ? JSON.parse(agendamentosSalvos) : [];
        },

        async getAgendamentosPorUsuario(usuarioId) {
            // SIMULAÇÃO: Substituir por fetch(`/api/agendamentos?usuario=${usuarioId}`)
            const agendamentos = await this.getAgendamentos();
            return agendamentos.filter(ag => ag.usuarioId === usuarioId);
        },

        async getHorariosOcupados() {
            // SIMULAÇÃO: Substituir por fetch('/api/agendamentos/horarios-ocupados')
            const horariosSalvos = localStorage.getItem('horariosOcupados');
            return horariosSalvos ? JSON.parse(horariosSalvos) : {};
        },

        async getHorariosDisponiveis(medicoId, data) {
            // SIMULAÇÃO: Substituir por fetch(`/api/agendamentos/horarios-disponiveis?medico=${medicoId}&data=${data}`)
            const medico = await this.medicoService.getMedicoById(medicoId);
            const horariosOcupados = await this.getHorariosOcupados();
            const chave = `${medicoId}-${data}`;
            const ocupados = horariosOcupados[chave] || [];
            
            return medico.horarios.filter(horario => !ocupados.includes(horario));
        },

        async criarAgendamento(dadosAgendamento) {
            // SIMULAÇÃO: Substituir por fetch('/api/agendamentos', { method: 'POST', body: ... })
            return new Promise((resolve, reject) => {
                try {
                    // Validar dados
                    if (!this.validarAgendamento(dadosAgendamento)) {
                        reject(new Error('Dados de agendamento inválidos'));
                        return;
                    }

                    // Verificar se horário está disponível
                    const chave = `${dadosAgendamento.medicoId}-${dadosAgendamento.data}`;
                    const horariosOcupados = this.horariosOcupados[chave] || [];
                    
                    if (horariosOcupados.includes(dadosAgendamento.horario)) {
                        reject(new Error('Horário já ocupado'));
                        return;
                    }

                    // Criar agendamento
                    const novoAgendamento = {
                        id: Date.now(),
                        ...dadosAgendamento,
                        status: 'agendado',
                        dataCriacao: new Date().toISOString(),
                        codigo: this.gerarCodigoAgendamento()
                    };

                    // Salvar no "banco" (localStorage por enquanto)
                    this.salvarAgendamento(novoAgendamento);
                    resolve(novoAgendamento);

                } catch (error) {
                    reject(error);
                }
            });
        },

        async cancelarAgendamento(agendamentoId) {
            // SIMULAÇÃO: Substituir por fetch(`/api/agendamentos/${agendamentoId}`, { method: 'DELETE' })
            return new Promise((resolve, reject) => {
                try {
                    const agendamentos = this.getAgendamentos();
                    const index = agendamentos.findIndex(ag => ag.id === agendamentoId);
                    
                    if (index === -1) {
                        reject(new Error('Agendamento não encontrado'));
                        return;
                    }

                    // Liberar horário
                    const agendamento = agendamentos[index];
                    const chave = `${agendamento.medicoId}-${agendamento.data}`;
                    const horariosOcupados = this.horariosOcupados[chave] || [];
                    const indexHorario = horariosOcupados.indexOf(agendamento.horario);
                    
                    if (indexHorario > -1) {
                        horariosOcupados.splice(indexHorario, 1);
                        this.horariosOcupados[chave] = horariosOcupados;
                        localStorage.setItem('horariosOcupados', JSON.stringify(this.horariosOcupados));
                    }

                    // Atualizar status
                    agendamentos[index].status = 'cancelado';
                    agendamentos[index].dataCancelamento = new Date().toISOString();
                    localStorage.setItem('agendamentos', JSON.stringify(agendamentos));

                    resolve(agendamentos[index]);
                } catch (error) {
                    reject(error);
                }
            });
        },

        validarAgendamento(dados) {
            return dados.medicoId && dados.data && dados.horario && dados.motivo;
        },

        gerarCodigoAgendamento() {
            return 'AG' + Date.now().toString().slice(-6);
        },

        salvarAgendamento(agendamento) {
            const agendamentos = this.getAgendamentos();
            agendamentos.push(agendamento);
            localStorage.setItem('agendamentos', JSON.stringify(agendamentos));

            // Atualizar horários ocupados
            const chave = `${agendamento.medicoId}-${agendamento.data}`;
            if (!this.horariosOcupados[chave]) {
                this.horariosOcupados[chave] = [];
            }
            this.horariosOcupados[chave].push(agendamento.horario);
            localStorage.setItem('horariosOcupados', JSON.stringify(this.horariosOcupados));
        }
    };

    // ===== INICIALIZAÇÃO DA UI =====

    inicializarTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabPanes = document.querySelectorAll('.tab-pane');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remover classe active de todos
                tabBtns.forEach(b => b.classList.remove('active'));
                tabPanes.forEach(p => p.classList.remove('active'));

                // Ativar tab clicada
                btn.classList.add('active');
                const tabId = btn.getAttribute('data-tab');
                const tabPane = document.getElementById(tabId);
                
                if (tabPane) {
                    tabPane.classList.add('active');
                    
                    // Carregar conteúdo específico da aba
                    this.carregarConteudoAba(tabId);
                }
            });
        });
    }

    async carregarConteudoAba(tabId) {
        switch (tabId) {
            case 'historico':
                await this.carregarHistorico();
                break;
            case 'medicos':
                await this.carregarGridMedicos();
                break;
            case 'novo-agendamento':
                await this.carregarDadosAgendamento();
                break;
        }
    }

    configurarEventos() {
        // Formulário de agendamento
        document.getElementById('medico')?.addEventListener('change', (e) => this.atualizarEspecialidade(e.target.value));
        document.getElementById('especialidade')?.addEventListener('change', (e) => this.filtrarMedicosPorEspecialidade(e.target.value));
        document.getElementById('data')?.addEventListener('change', (e) => this.carregarHorariosDisponiveis(e.target.value));
        document.getElementById('formAgendamento')?.addEventListener('submit', (e) => this.processarAgendamento(e));

        // Filtros do histórico
        document.getElementById('filtro-status')?.addEventListener('change', () => this.filtrarHistorico());
        document.getElementById('filtro-data')?.addEventListener('change', () => this.filtrarHistorico());

        // Modais
        document.getElementById('btnConfirmar')?.addEventListener('click', () => this.confirmarAgendamento());
        document.getElementById('btnCancelar')?.addEventListener('click', () => this.fecharModalConfirmacao());
        document.getElementById('btnEntendido')?.addEventListener('click', () => this.fecharModalHorarioOcupado());
    }

    // ===== INTERAÇÃO COM FORMULÁRIO =====

    carregarMedicosSelect() {
        const select = document.getElementById('medico');
        if (!select) return;

        select.innerHTML = '<option value="">Selecione um médico</option>';
        
        this.medicos.forEach(medico => {
            if (medico.ativo) {
                const option = document.createElement('option');
                option.value = medico.id;
                option.textContent = `${medico.nome} - ${medico.especialidade}`;
                option.setAttribute('data-especialidade', medico.especialidade);
                select.appendChild(option);
            }
        });
    }

    carregarEspecialidadesSelect() {
        const select = document.getElementById('especialidade');
        if (!select) return;

        select.innerHTML = '<option value="">Selecione a especialidade</option>';
        
        this.especialidades.forEach(especialidade => {
            const option = document.createElement('option');
            option.value = especialidade;
            option.textContent = especialidade;
            select.appendChild(option);
        });
    }

    async atualizarEspecialidade(medicoId) {
        if (!medicoId) return;

        try {
            const medico = await this.medicoService.getMedicoById(parseInt(medicoId));
            if (medico) {
                document.getElementById('especialidade').value = medico.especialidade;
                this.atualizarInformacoesAgendamento();
            }
        } catch (error) {
            console.error('Erro ao carregar médico:', error);
        }
    }

    async filtrarMedicosPorEspecialidade(especialidade) {
        const selectMedico = document.getElementById('medico');
        if (!selectMedico) return;

        const options = selectMedico.querySelectorAll('option');
        
        options.forEach(option => {
            if (option.value === '') return;
            const mostra = !especialidade || option.getAttribute('data-especialidade') === especialidade;
            option.style.display = mostra ? '' : 'none';
        });

        // Resetar seleção se necessário
        const medicoAtual = selectMedico.value;
        if (medicoAtual && selectMedico.querySelector(`option[value="${medicoAtual}"]`).style.display === 'none') {
            selectMedico.value = '';
            this.atualizarInformacoesAgendamento();
        }
    }

    async carregarHorariosDisponiveis(data) {
        const medicoId = document.getElementById('medico').value;
        const horarioSelect = document.getElementById('horario');
        const listaHorarios = document.getElementById('lista-horarios');
        
        if (!medicoId || !data) {
            listaHorarios.innerHTML = '<p>Selecione um médico e uma data para ver os horários disponíveis</p>';
            horarioSelect.innerHTML = '<option value="">Selecione um horário</option>';
            return;
        }

        try {
            const horariosDisponiveis = await this.agendamentoService.getHorariosDisponiveis(parseInt(medicoId), data);
            
            // Atualizar select
            horarioSelect.innerHTML = '<option value="">Selecione um horário</option>';
            horariosDisponiveis.forEach(horario => {
                const option = document.createElement('option');
                option.value = horario;
                option.textContent = horario;
                horarioSelect.appendChild(option);
            });

            // Atualizar grid
            this.atualizarGridHorarios(horariosDisponiveis, medicoId, data);
            this.atualizarInformacoesAgendamento();

        } catch (error) {
            console.error('Erro ao carregar horários:', error);
            showNotification('Erro ao carregar horários disponíveis', 'error');
        }
    }

    async atualizarGridHorarios(horariosDisponiveis, medicoId, data) {
        const listaHorarios = document.getElementById('lista-horarios');
        listaHorarios.innerHTML = '';

        if (horariosDisponiveis.length === 0) {
            listaHorarios.innerHTML = '<p>Nenhum horário disponível para esta data</p>';
            return;
        }

        horariosDisponiveis.forEach(horario => {
            const horarioBtn = document.createElement('button');
            horarioBtn.type = 'button';
            horarioBtn.className = 'horario-btn disponivel';
            horarioBtn.textContent = horario;
            horarioBtn.addEventListener('click', () => this.selecionarHorario(horario));
            listaHorarios.appendChild(horarioBtn);
        });
    }

    selecionarHorario(horario) {
        document.getElementById('horario').value = horario;
        
        // Atualizar visual
        document.querySelectorAll('.horario-btn').forEach(btn => {
            btn.classList.remove('selecionado');
        });
        event.target.classList.add('selecionado');
        
        this.atualizarInformacoesAgendamento();
    }

    atualizarInformacoesAgendamento() {
        const medicoId = document.getElementById('medico').value;
        const especialidade = document.getElementById('especialidade').value;
        const data = document.getElementById('data').value;
        const horario = document.getElementById('horario').value;

        const medico = this.medicos.find(m => m.id == medicoId);

        document.getElementById('info-medico').textContent = medico ? medico.nome : 'Nenhum';
        document.getElementById('info-especialidade').textContent = especialidade || 'Nenhuma';
        document.getElementById('info-data').textContent = data ? this.formatarData(data) : '--/--/----';
        document.getElementById('info-horario').textContent = horario || '--:--';
    }

    // ===== PROCESSAMENTO DE AGENDAMENTO =====

    async processarAgendamento(e) {
        e.preventDefault();
        
        const medicoId = document.getElementById('medico').value;
        const data = document.getElementById('data').value;
        const horario = document.getElementById('horario').value;
        const motivo = document.getElementById('motivo').value;

        if (!medicoId || !data || !horario || !motivo) {
            showNotification('Por favor, preencha todos os campos.', 'error');
            return;
        }

        try {
            // Verificar disponibilidade
            const horariosDisponiveis = await this.agendamentoService.getHorariosDisponiveis(parseInt(medicoId), data);
            
            if (!horariosDisponiveis.includes(horario)) {
                this.mostrarModalHorarioOcupado();
                return;
            }

            // Mostrar confirmação
            this.mostrarModalConfirmacao({
                medicoId: parseInt(medicoId),
                data,
                horario,
                motivo
            });

        } catch (error) {
            console.error('Erro ao verificar agendamento:', error);
            showNotification('Erro ao processar agendamento', 'error');
        }
    }

    async confirmarAgendamento() {
        const dados = this.dadosAgendamentoPendente;
        
        try {
            const agendamento = await this.agendamentoService.criarAgendamento({
                ...dados,
                usuarioId: this.getUsuarioLogadoId(), // Implementar conforme sistema de autenticação
                usuarioNome: 'Usuário Teste' // Substituir por dados reais
            });

            showNotification('Agendamento realizado com sucesso!', 'success');
            this.fecharModalConfirmacao();
            this.limparFormulario();
            await this.carregarHistorico();

        } catch (error) {
            console.error('Erro ao confirmar agendamento:', error);
            
            if (error.message === 'Horário já ocupado') {
                this.mostrarModalHorarioOcupado();
            } else {
                showNotification('Erro ao confirmar agendamento', 'error');
            }
        }
    }

    // ===== HISTÓRICO DE AGENDAMENTOS =====

    async carregarHistorico() {
        try {
            // Substituir por: this.agendamentoService.getAgendamentosPorUsuario(usuarioId)
            const agendamentos = await this.agendamentoService.getAgendamentos();
            this.exibirHistorico(agendamentos);
        } catch (error) {
            console.error('Erro ao carregar histórico:', error);
            showNotification('Erro ao carregar histórico', 'error');
        }
    }

    exibirHistorico(agendamentos) {
        const container = document.getElementById('lista-agendamentos');
        if (!container) return;

        if (agendamentos.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <h3>Nenhum agendamento encontrado</h3>
                    <p>Você ainda não possui agendamentos realizados.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = agendamentos.map(agendamento => `
            <div class="agendamento-item" data-status="${agendamento.status}">
                <div class="agendamento-header">
                    <span class="agendamento-medico">${this.getNomeMedico(agendamento.medicoId)}</span>
                    <span class="agendamento-codigo">${agendamento.codigo}</span>
                </div>
                <div class="agendamento-detalhes">
                    <div class="agendamento-especialidade">${this.getEspecialidadeMedico(agendamento.medicoId)}</div>
                    <div class="agendamento-data">${this.formatarData(agendamento.data)}</div>
                    <div class="agendamento-horario">${agendamento.horario}</div>
                    <span class="status-${agendamento.status}">${this.formatarStatus(agendamento.status)}</span>
                </div>
                <div class="agendamento-motivo">
                    <strong>Motivo:</strong> ${agendamento.motivo}
                </div>
                <div class="agendamento-acoes">
                    ${agendamento.status === 'agendado' ? `
                        <button class="btn btn-cancelar btn-small" onclick="sistemaAgendamento.cancelarAgendamento(${agendamento.id})">
                            Cancelar
                        </button>
                    ` : ''}
                </div>
            </div>
        `).join('');
    }

    async cancelarAgendamento(agendamentoId) {
        if (!confirm('Tem certeza que deseja cancelar este agendamento?')) return;

        try {
            await this.agendamentoService.cancelarAgendamento(agendamentoId);
            showNotification('Agendamento cancelado com sucesso', 'success');
            await this.carregarHistorico();
        } catch (error) {
            console.error('Erro ao cancelar agendamento:', error);
            showNotification('Erro ao cancelar agendamento', 'error');
        }
    }

    filtrarHistorico() {
        const filtroStatus = document.getElementById('filtro-status').value;
        const filtroData = document.getElementById('filtro-data').value;
        
        const agendamentos = this.agendamentos.filter(ag => {
            const atendeStatus = filtroStatus === 'todos' || ag.status === filtroStatus;
            const atendeData = !filtroData || ag.data.startsWith(filtroData);
            return atendeStatus && atendeData;
        });

        this.exibirHistorico(agendamentos);
    }

    // ===== LISTA DE MÉDICOS =====

    async carregarGridMedicos() {
        try {
            const medicos = await this.medicoService.getMedicos();
            this.exibirGridMedicos(medicos.filter(m => m.ativo));
        } catch (error) {
            console.error('Erro ao carregar médicos:', error);
            showNotification('Erro ao carregar lista de médicos', 'error');
        }
    }

    exibirGridMedicos(medicos) {
        const container = document.getElementById('grid-medicos');
        if (!container) return;

        container.innerHTML = medicos.map(medico => `
            <div class="medico-card">
                <div class="medico-header">
                    <div class="medico-foto">👨‍⚕️</div>
                    <h3 class="medico-nome">${medico.nome}</h3>
                    <p class="medico-especialidade">${medico.especialidade}</p>
                </div>
                <div class="medico-body">
                    <div class="medico-info">
                        <div class="medico-detalhe">
                            <strong>CRM:</strong>
                            <span>${medico.crm}</span>
                        </div>
                        <div class="medico-detalhe">
                            <strong>Experiência:</strong>
                            <span>${medico.experiencia}</span>
                        </div>
                        <div class="medico-detalhe">
                            <strong>Telefone:</strong>
                            <span>${medico.telefone}</span>
                        </div>
                        <div class="medico-detalhe">
                            <strong>Email:</strong>
                            <span>${medico.email}</span>
                        </div>
                    </div>
                    <div class="disponibilidade">
                        <h4>Disponibilidade</h4>
                        <div class="dias-semana">
                            ${medico.disponibilidade.map(dia => `
                                <span class="dia">${dia}</span>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // ===== MODAIS =====

    mostrarModalConfirmacao(dados) {
        this.dadosAgendamentoPendente = dados;
        const medico = this.medicos.find(m => m.id === dados.medicoId);
        
        document.getElementById('confirm-medico').textContent = medico?.nome || '';
        document.getElementById('confirm-especialidade').textContent = medico?.especialidade || '';
        document.getElementById('confirm-data').textContent = this.formatarData(dados.data);
        document.getElementById('confirm-horario').textContent = dados.horario;
        document.getElementById('confirm-motivo').textContent = dados.motivo;
        
        document.getElementById('modalConfirmacao').style.display = 'block';
    }

    mostrarModalHorarioOcupado() {
        document.getElementById('modalHorarioOcupado').style.display = 'block';
    }

    fecharModalConfirmacao() {
        document.getElementById('modalConfirmacao').style.display = 'none';
        this.dadosAgendamentoPendente = null;
    }

    fecharModalHorarioOcupado() {
        document.getElementById('modalHorarioOcupado').style.display = 'none';
    }

    // ===== UTILITÁRIOS =====

    getUsuarioLogadoId() {
        // Implementar conforme sistema de autenticação
        // Por enquanto retorna um ID mock
        return 1;
    }

    getNomeMedico(medicoId) {
        const medico = this.medicos.find(m => m.id === medicoId);
        return medico ? medico.nome : 'Médico não encontrado';
    }

    getEspecialidadeMedico(medicoId) {
        const medico = this.medicos.find(m => m.id === medicoId);
        return medico ? medico.especialidade : 'Especialidade não encontrada';
    }

    formatarData(data) {
        return new Date(data + 'T00:00:00').toLocaleDateString('pt-BR');
    }

    formatarStatus(status) {
        const statusMap = {
            'agendado': 'Agendado',
            'realizado': 'Realizado',
            'cancelado': 'Cancelado'
        };
        return statusMap[status] || status;
    }

    limparFormulario() {
        document.getElementById('formAgendamento').reset();
        document.getElementById('lista-horarios').innerHTML = '<p>Selecione um médico e uma data para ver os horários disponíveis</p>';
        this.atualizarInformacoesAgendamento();
    }
}

// ===== INICIALIZAÇÃO DO SISTEMA =====

let sistemaAgendamento;

document.addEventListener('DOMContentLoaded', function() {
    sistemaAgendamento = new SistemaAgendamento();
});