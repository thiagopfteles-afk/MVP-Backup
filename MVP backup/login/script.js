// Elementos dos modais
const loginBtn = document.getElementById('loginBtn');
const cadastroBtn = document.getElementById('cadastroBtn');
const loginModal = document.getElementById('loginModal');
const cadastroModal = document.getElementById('cadastroModal');
const closeButtons = document.querySelectorAll('.close');

// Abrir modal de login
loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
});

// Abrir modal de cadastro
cadastroBtn.addEventListener('click', () => {
    cadastroModal.style.display = 'block';
});

// Fechar modais
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        loginModal.style.display = 'none';
        cadastroModal.style.display = 'none';
    });
});

// Fechar modal ao clicar fora
window.addEventListener('click', (event) => {
    if (event.target === loginModal) {
        loginModal.style.display = 'none';
    }
    if (event.target === cadastroModal) {
        cadastroModal.style.display = 'none';
    }
});

// Formulário de login
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Validação básica
    if (email && password) {
        alert('Login realizado com sucesso!');
        loginModal.style.display = 'none';
        // Limpar formulário
        document.getElementById('loginForm').reset();
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});

// Formulário de cadastro
document.getElementById('cadastroForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('cadastroEmail').value;
    const password = document.getElementById('cadastroPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validações
    if (!nome || !email || !password || !confirmPassword) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('As senhas não coincidem.');
        return;
    }
    
    if (password.length < 6) {
        alert('A senha deve ter pelo menos 6 caracteres.');
        return;
    }
    
    alert('Cadastro realizado com sucesso!');
    cadastroModal.style.display = 'none';
    // Limpar formulário
    document.getElementById('cadastroForm').reset();
});

// Navegação suave para as seções
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

// Efeito de scroll no header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.2)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});