// Elementos dos modais
const headerLoginBtn = document.getElementById('headerLoginBtn');
const headerCadastroBtn = document.getElementById('headerCadastroBtn');
const loginModal = document.getElementById('loginModal');
const cadastroModal = document.getElementById('cadastroModal');
const closeButtons = document.querySelectorAll('.close');

// Abrir modal de login
headerLoginBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
});

// Abrir modal de cadastro
headerCadastroBtn.addEventListener('click', () => {
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

// Newsletter form
document.getElementById('newsletterForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    if (email) {
        alert('Obrigado por assinar nossa newsletter!');
        this.reset();
    }
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

// Destacar link ativo na navegação
function highlightActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'home.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Animação para os cards
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.access-card, .section-card, .article-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    highlightActiveNavLink();
    initAnimations();
    
    console.log('Página Home carregada com sucesso!');
});