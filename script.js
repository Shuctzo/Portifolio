/* ============================================
   PORTFÓLIO FUTURISTA - SCRIPT PRINCIPAL
   Sistema de Temas Dinâmicos e Interatividade
   ============================================ */

// ============================================
// CONFIGURAÇÃO INICIAL
// ============================================

/**
 * Mapeamento de cores para cada área/tema
 * Cada área tem uma cor neon específica
 */
const themeColors = {
    home: '#00D9FF',        // Ciano
    redes: '#FF6B00',       // Laranja
    seguranca: '#00D9FF',   // Ciano
    microservicos: '#B300FF', // Roxo
    programacao: '#00FF41', // Verde Elétrico
    design: '#FF006E',      // Magenta
    academico: '#0099FF',   // Azul Ciano
    contato: '#FF6B00',     // Laranja
    ia: '#ffffff',          // Branco
    projetos: '#00D9FF'     // Ciano
};

/**
 * Estado global da aplicação
 */
const appState = {
    currentTheme: 'home',
    isNavOpen: false,
    isScrolling: false
};

// ============================================
// INICIALIZAÇÃO
// ============================================

/**
 * Inicializa todos os event listeners e funcionalidades
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Portfólio Futurista Iniciado');
    
    // Inicializar funcionalidades
    initNavigation();
    initThemeSystem();
    initScrollEffects();
    initIntersectionObserver();
    
    // Definir tema inicial
    setTheme('home');
});

// ============================================
// SISTEMA DE NAVEGAÇÃO
// ============================================

/**
 * Inicializa o sistema de navegação (mobile + desktop)
 */
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const navItems = document.querySelectorAll('.nav-link');
    
    // Toggle do menu hamburger
    hamburger?.addEventListener('click', () => {
        appState.isNavOpen = !appState.isNavOpen;
        navLinks.classList.toggle('active');
        
        // Animar hamburger
        const spans = hamburger.querySelectorAll('span');
        if (appState.isNavOpen) {
            spans[0].style.transform = 'rotate(45deg) translateY(10px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Fechar menu ao clicar em um link
    navItems.forEach(link => {
        link.addEventListener('click', (e) => {
            // Atualizar tema baseado no link clicado
            const theme = link.getAttribute('data-theme');
            if (theme) {
                setTheme(theme);
            }
            
            // Remover classe active de todos os links
            navItems.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
            
            // Fechar menu mobile
            if (appState.isNavOpen) {
                appState.isNavOpen = false;
                navLinks.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar') && appState.isNavOpen) {
            appState.isNavOpen = false;
            navLinks.classList.remove('active');
        }
    });
}

// ============================================
// SISTEMA DE TEMAS DINÂMICOS
// ============================================

/**
 * Define o tema ativo e atualiza as cores de toda a página
 * @param {string} theme - Nome do tema (home, seguranca, programacao, etc)
 */
function setTheme(theme) {
    // Validar tema
    if (!themeColors[theme]) {
        console.warn(`⚠️ Tema "${theme}" não encontrado`);
        return;
    }
    
    // Atualizar estado
    appState.currentTheme = theme;
    
    // Obter cor do tema
    const color = themeColors[theme];
    
    // Atualizar variável CSS
    document.documentElement.style.setProperty('--primary-color', color);
    
    // Animar transição de cor
    animateThemeTransition(color);
    
    // Atualizar navbar
    updateNavbarTheme(theme);
    
    // Log para debug
    console.log(`🎨 Tema alterado para: ${theme} (${color})`);
}

/**
 * Anima a transição de cor do tema
 * @param {string} color - Cor em hexadecimal
 */
function animateThemeTransition(color) {
    // Criar elemento temporário para animação
    const transitionElement = document.createElement('div');
    transitionElement.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: ${color};
        opacity: 0;
        pointer-events: none;
        z-index: 999;
        transition: opacity 0.3s ease-in-out;
    `;
    
    document.body.appendChild(transitionElement);
    
    // Animar entrada
    setTimeout(() => {
        transitionElement.style.opacity = '0.05';
    }, 10);
    
    // Remover após animação
    setTimeout(() => {
        transitionElement.style.opacity = '0';
        setTimeout(() => transitionElement.remove(), 300);
    }, 300);
}

/**
 * Atualiza o estilo da navbar baseado no tema
 * @param {string} theme - Nome do tema
 */
function updateNavbarTheme(theme) {
    const navbar = document.getElementById('navbar');
    
    // Remover classes de tema anteriores
    Object.keys(themeColors).forEach(t => {
        navbar.classList.remove(`theme-${t}`);
    });
    
    // Adicionar classe do novo tema
    navbar.classList.add(`theme-${theme}`);
}

// ============================================
// EFEITOS DE SCROLL
// ============================================

/**
 * Inicializa efeitos de scroll (parallax, fade, etc)
 */
function initScrollEffects() {
    let scrollTimeout;
    
    window.addEventListener('scroll', () => {
        appState.isScrolling = true;
        
        // Limpar timeout anterior
        clearTimeout(scrollTimeout);
        
        // Atualizar navbar ao scroll
        updateNavbarOnScroll();
        
        // Definir como não scrolling após 150ms
        scrollTimeout = setTimeout(() => {
            appState.isScrolling = false;
        }, 150);
    });
}

/**
 * Atualiza a navbar e o tema baseado na posição do scroll
 */
function updateNavbarOnScroll() {
    const navbar = document.getElementById('navbar');
    const scrollPosition = window.scrollY;
    
    // Adicionar sombra ao scroll
    if (scrollPosition > 10) {
        navbar.style.boxShadow = '0 0 30px rgba(0, 217, 255, 0.2)';
    } else {
        navbar.style.boxShadow = '0 0 20px rgba(0, 217, 255, 0.1)';
    }
    
    // Detectar seção ativa e atualizar tema
    detectActiveSection();
}

/**
 * Detecta qual seção está visível e atualiza o tema
 */
function detectActiveSection() {
    const sections = document.querySelectorAll('[data-section]');
    let activeSection = null;
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        
        // Se a seção está no viewport (entre 0 e 50% da altura da tela)
        if (rect.top <= window.innerHeight * 0.5 && rect.bottom > 0) {
            activeSection = section.getAttribute('data-section');
        }
    });
    
    // Atualizar tema se detectou uma seção diferente
    if (activeSection && activeSection !== appState.currentTheme) {
        setTheme(activeSection);
        
        // Atualizar link ativo na navbar
        updateActiveNavLink(activeSection);
    }
}

/**
 * Atualiza o link ativo na navbar
 * @param {string} section - Nome da seção
 */
function updateActiveNavLink(section) {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        if (link.getAttribute('data-theme') === section) {
            link.classList.add('active');
        }
    });
}

// ============================================
// INTERSECTION OBSERVER - ANIMAÇÕES AO ENTRAR NO VIEWPORT
// ============================================

/**
 * Inicializa Intersection Observer para animar elementos ao entrar no viewport
 */
function initIntersectionObserver() {
    // Configuração do observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // Criar observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adicionar classe de animação
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Parar de observar após animar
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos animáveis
    const animatableElements = document.querySelectorAll(
        '.project-card, .contact-card, .area-section'
    );
    
    animatableElements.forEach(el => {
        // Preparar elemento para animação
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        
        // Observar
        observer.observe(el);
    });
}

// ============================================
// INTERATIVIDADE DE CARDS
// ============================================

/**
 * Inicializa interatividade dos cards de projeto
 */
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Efeito de mouse move
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calcular ângulo de rotação baseado na posição do mouse
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            // Aplicar transformação 3D
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        
        // Resetar ao sair
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// ============================================
// SMOOTH SCROLL PARA LINKS ÂNCORA
// ============================================

/**
 * Implementa smooth scroll para links âncora
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Ignorar links vazios
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                // Calcular posição considerando navbar fixa
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                // Scroll suave
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// EFEITOS VISUAIS AVANÇADOS
// ============================================

/**
 * Adiciona efeito de glow ao hover em elementos interativos
 */
function initGlowEffects() {
    const interactiveElements = document.querySelectorAll(
        '.btn, .project-card, .contact-card, .nav-link'
    );
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.style.textShadow = `0 0 10px ${getComputedStyle(document.documentElement).getPropertyValue('--primary-color')}`;
        });
        
        el.addEventListener('mouseleave', function() {
            this.style.textShadow = 'none';
        });
    });
}

/**
 * Anima números em contadores (se houver)
 */
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 segundos
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// ============================================
// UTILITÁRIOS
// ============================================

/**
 * Cria um efeito de partícula ao clicar
 * @param {Event} e - Evento de clique
 */
function createParticleEffect(e) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: 10px;
        height: 10px;
        background: ${getComputedStyle(document.documentElement).getPropertyValue('--primary-color')};
        border-radius: 50%;
        pointer-events: none;
        z-index: 999;
        animation: particleFloat 1s ease-out forwards;
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => particle.remove(), 1000);
}

/**
 * Adiciona animação de partículas ao documento
 */
function addParticleAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0% {
                opacity: 1;
                transform: translate(0, 0) scale(1);
            }
            100% {
                opacity: 0;
                transform: translate(${Math.random() * 100 - 50}px, -100px) scale(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// INICIALIZAÇÃO FINAL
// ============================================

/**
 * Inicializa todas as funcionalidades adicionais
 */
function initAllFeatures() {
    initProjectCards();
    initSmoothScroll();
    initGlowEffects();
    addParticleAnimation();
    
    // Adicionar efeito de partículas ao clicar em botões
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', createParticleEffect);
    });
}

// Chamar inicialização quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllFeatures);
} else {
    initAllFeatures();
}

// ============================================
// CONSOLE EASTER EGG
// ============================================

console.log('%c🚀 Bem-vindo ao Portfólio Futurista!', 'color: #00D9FF; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #00D9FF;');
console.log('%cDesign: Minimalismo Cibernético com Gradientes Dinâmicos', 'color: #00FF41; font-size: 14px;');
console.log('%cTecnologia: HTML5 + CSS3 + JavaScript Vanilla', 'color: #FF006E; font-size: 14px;');
console.log('%cAutor: Seu Nome | 2025', 'color: #B300FF; font-size: 14px;');
