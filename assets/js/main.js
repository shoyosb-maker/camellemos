// ========== WHATSAPP ==========
const WHATSAPP_NUMBER = "573177366474";
function sendWhatsApp(msg = "🐪 Hola! Quiero impulsar mi carrera con Camellemos") {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
}

document.getElementById('heroWhatsappBtn')?.addEventListener('click', () => sendWhatsApp());
document.getElementById('contactWhatsappBtn')?.addEventListener('click', () => sendWhatsApp());
document.getElementById('whatsappFloatBtn')?.addEventListener('click', () => sendWhatsApp());

// ========== REDES SOCIALES ==========
const SOCIAL = {
    linkedin: "https://linkedin.com/company/camellando",
    instagram: "https://instagram.com/camellando",
    facebook: "https://facebook.com/camellando",
    twitter: "https://twitter.com/camellando",
    youtube: "https://youtube.com/@camellando"
};
document.getElementById('socialLinkedin')?.setAttribute('href', SOCIAL.linkedin);
document.getElementById('socialInstagram')?.setAttribute('href', SOCIAL.instagram);
document.getElementById('socialFacebook')?.setAttribute('href', SOCIAL.facebook);
document.getElementById('socialTwitter')?.setAttribute('href', SOCIAL.twitter);
document.getElementById('socialYoutube')?.setAttribute('href', SOCIAL.youtube);
document.getElementById('footerLinkedin')?.setAttribute('href', SOCIAL.linkedin);
document.getElementById('footerInstagram')?.setAttribute('href', SOCIAL.instagram);
document.getElementById('footerFacebook')?.setAttribute('href', SOCIAL.facebook);
document.getElementById('footerTwitter')?.setAttribute('href', SOCIAL.twitter);
document.getElementById('footerYoutube')?.setAttribute('href', SOCIAL.youtube);

// ========== NAVEGACIÓN ==========
function showPage(pageId) {
    const pages = ['inicio', 'trabajos', 'capacitacion', 'planes', 'contacto'];
    pages.forEach(id => {
        const el = document.getElementById(`page-${id}`);
        if (el) el.style.display = 'none';
    });
    
    const selected = document.getElementById(`page-${pageId}`);
    if (selected) selected.style.display = 'block';
    
    const buttons = ['navTrabajosBtn', 'navCapacitacionBtn', 'navPlanesBtn', 'navContactoBtn'];
    buttons.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.classList.remove('active');
    });
    
    if (pageId !== 'inicio') {
        const activeBtn = document.getElementById(`nav${pageId.charAt(0).toUpperCase() + pageId.slice(1)}Btn`);
        if (activeBtn) activeBtn.classList.add('active');
    }
}

document.getElementById('navTrabajosBtn')?.addEventListener('click', () => showPage('trabajos'));
document.getElementById('navCapacitacionBtn')?.addEventListener('click', () => showPage('capacitacion'));
document.getElementById('navPlanesBtn')?.addEventListener('click', () => showPage('planes'));
document.getElementById('navContactoBtn')?.addEventListener('click', () => showPage('contacto'));
document.getElementById('navInicioBtn')?.addEventListener('click', () => showPage('inicio'));
document.getElementById('navInicioBtnMenu')?.addEventListener('click', () => showPage('inicio'));
document.getElementById('heroToJobsBtn')?.addEventListener('click', () => showPage('trabajos'));
document.getElementById('capacitacionToPlanesBtn')?.addEventListener('click', () => showPage('planes'));

document.getElementById('footerInicioBtn')?.addEventListener('click', () => showPage('inicio'));
document.getElementById('footerTrabajosBtn')?.addEventListener('click', () => showPage('trabajos'));
document.getElementById('footerCapacitacionBtn')?.addEventListener('click', () => showPage('capacitacion'));
document.getElementById('footerPlanesBtn')?.addEventListener('click', () => showPage('planes'));
document.getElementById('footerContactoBtn')?.addEventListener('click', () => showPage('contacto'));

// ========== JOBS ==========
const jobsDB = {
    tecnologia: [
        { title: "Ingeniero Software Senior", company: "LinkedIn Corp", location: "Remoto" },
        { title: "Data Scientist", company: "Google", location: "CDMX" },
        { title: "Frontend React Developer", company: "Globant", location: "Buenos Aires" }
    ],
    marketing: [
        { title: "Growth Manager", company: "HubSpot", location: "Bogotá" },
        { title: "Social Media Strategist", company: "WPP", location: "Remoto" }
    ],
    finanzas: [
        { title: "Financial Analyst", company: "JP Morgan", location: "Bogotá" },
        { title: "Auditor Senior", company: "EY", location: "Santiago" }
    ]
};

function fetchJobs(career) {
    const container = document.getElementById('jobsContainer');
    if (!container) return;
    container.innerHTML = '<div style="text-align:center; padding:30px;"><i class="fas fa-spinner fa-pulse"></i> Cargando...</div>';
    setTimeout(() => {
        const jobs = jobsDB[career];
        container.innerHTML = jobs.map(job => `
            <div class="job-card">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div class="job-title">${job.title}</div>
                    <span class="job-badge">✨ Nueva</span>
                </div>
                <div class="job-company"><i class="fab fa-linkedin"></i> ${job.company}</div>
                <div class="job-location">📍 ${job.location}</div>
                <button class="btn-secondary" style="margin-top:12px; padding:6px 14px; font-size:0.8rem;" onclick="sendWhatsApp('Me interesa ${job.title}')">Aplicar vía WhatsApp</button>
            </div>
        `).join('');
    }, 400);
}

document.querySelectorAll('.career-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.career-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        fetchJobs(this.dataset.career);
    });
});
fetchJobs('tecnologia');

// ========== MATERIAL PREMIUM ==========
const premiumMaterials = [
    { icon: "fas fa-video", title: "Masterclass: Cómo pasar un ATS", desc: "Optimiza tu HV para filtros automatizados", type: "Video", duration: "45 min" },
    { icon: "fas fa-file-pdf", title: "Guía de entrevista por competencias", desc: "Preguntas frecuentes y cómo responderlas", type: "PDF", pages: "28 páginas" },
    { icon: "fas fa-chalkboard", title: "Webinar: Negociación salarial", desc: "Técnicas para aumentar tu oferta", type: "Webinar", duration: "60 min" }
];

function renderPremiumMaterials() {
    const container = document.getElementById('premiumMaterialsContainer');
    const isLoggedIn = localStorage.getItem('camellando_user') !== null;
    if (!container) return;
    if (isLoggedIn) {
        const user = JSON.parse(localStorage.getItem('camellando_user'));
        container.innerHTML = `
            <div class="premium-materials">
                <div style="text-align:center; margin-bottom:28px;">
                    <i class="fas fa-camel" style="font-size:2.5rem; color:#F59E0B;"></i>
                    <h2 style="margin-top:12px;">🎓 Material Exclusivo para ${user.name.split(' ')[0]}</h2>
                    <p>Contenido premium desbloqueado - Actualizado semanalmente</p>
                </div>
                <div class="materials-grid">
                    ${premiumMaterials.map(mat => `
                        <div class="material-card" onclick="alert('🔓 Contenido exclusivo: ${mat.title}')">
                            <i class="${mat.icon}"></i>
                            <h4>${mat.title}</h4>
                            <p>${mat.desc}</p>
                            <span class="material-badge">${mat.type} · ${mat.duration || mat.pages}</span>
                        </div>
                    `).join('')}
                </div>
                <button class="btn-secondary" id="accessAllMaterialsBtn" style="background:#F59E0B; color:#0B2B5E; margin-top:24px; display:block; margin-left:auto; margin-right:auto;">Descargar recursos</button>
            </div>
        `;
        document.getElementById('accessAllMaterialsBtn')?.addEventListener('click', () => {
            alert("📚 Enlace de descarga enviado a tu correo registrado.");
            sendWhatsApp("Quiero acceder al material premium");
        });
    } else {
        container.innerHTML = `
            <div class="login-required-message">
                <i class="fas fa-lock" style="font-size:3rem; color:#F59E0B;"></i>
                <h3>🔒 Contenido Exclusivo para Miembros</h3>
                <p>Accede a masterclasses, guías, plantillas y webinars exclusivos.</p>
                <button id="unlockMaterialsBtn" class="btn-primary">Iniciar Sesión para Desbloquear</button>
            </div>
        `;
        document.getElementById('unlockMaterialsBtn')?.addEventListener('click', () => {
            document.getElementById('loginModal').style.display = 'flex';
        });
    }
}

// ========== LOGIN / REGISTRO ==========
const loginModal = document.getElementById('loginModal');
const loginNavBtn = document.getElementById('loginNavBtn');
const closeLoginModal = document.getElementById('closeLoginModal');
const userMenu = document.getElementById('userMenu');
const userNameDisplay = document.getElementById('userNameDisplay');

const loginPanel = document.getElementById('loginPanel');
const registerPanel = document.getElementById('registerPanel');
const showRegisterLink = document.getElementById('showRegisterLink');
const showLoginLink = document.getElementById('showLoginLink');

function showLoginPanel() {
    if (loginPanel) loginPanel.classList.add('active');
    if (registerPanel) registerPanel.classList.remove('active');
}

function showRegisterPanel() {
    if (registerPanel) registerPanel.classList.add('active');
    if (loginPanel) loginPanel.classList.remove('active');
}

showRegisterLink?.addEventListener('click', (e) => {
    e.preventDefault();
    showRegisterPanel();
});
showLoginLink?.addEventListener('click', (e) => {
    e.preventDefault();
    showLoginPanel();
});

function updateUI() {
    const user = localStorage.getItem('camellando_user');
    if (user) {
        const userData = JSON.parse(user);
        if (loginNavBtn) loginNavBtn.style.display = 'none';
        if (userMenu) {
            userMenu.style.display = 'flex';
            if (userNameDisplay) userNameDisplay.textContent = userData.name.split(' ')[0];
        }
        renderPremiumMaterials();
    } else {
        if (loginNavBtn) loginNavBtn.style.display = 'block';
        if (userMenu) userMenu.style.display = 'none';
        renderPremiumMaterials();
    }
}

loginNavBtn?.addEventListener('click', () => {
    showLoginPanel();
    if (loginModal) loginModal.style.display = 'flex';
});

closeLoginModal?.addEventListener('click', () => {
    if (loginModal) loginModal.style.display = 'none';
});
window.addEventListener('click', (e) => { if (e.target === loginModal) loginModal.style.display = 'none'; });

// Login
document.getElementById('loginForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    if (email && password.length >= 1) {
        const stored = localStorage.getItem('camellando_user');
        if (stored) {
            const u = JSON.parse(stored);
            if (u.email === email && u.password === password) {
                alert(`✅ ¡Bienvenido de nuevo, ${u.name}! 🐪`);
                if (loginModal) loginModal.style.display = 'none';
                updateUI();
            } else {
                alert('❌ Credenciales incorrectas. Si no tienes cuenta, regístrate.');
            }
        } else {
            alert('❌ No hay cuenta registrada. Por favor, regístrate primero.');
        }
    } else {
        alert('Por favor ingresa email y contraseña');
    }
});

// Registro
document.getElementById('registerForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    if (name && email && password.length >= 4) {
        localStorage.setItem('camellando_user', JSON.stringify({ name, email, password }));
        alert(`✅ ¡Cuenta creada exitosamente, ${name}! Ahora puedes iniciar sesión. 🐪`);
        showLoginPanel();
        document.getElementById('loginEmail').value = email;
        document.getElementById('loginPassword').value = '';
    } else {
        alert('Por favor completa todos los campos (contraseña mínimo 4 caracteres)');
    }
});

// Cierre de sesión
if (userMenu) {
    userMenu.addEventListener('click', () => {
        if (confirm('¿Cerrar sesión?')) {
            localStorage.removeItem('camellando_user');
            updateUI();
            alert('Sesión cerrada correctamente');
        }
    });
}

// ========== MENÚ HAMBURGUESA ==========
const menuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');
const overlay = document.getElementById('menuOverlay');

function closeMenu() {
    if (navLinks) navLinks.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    const icon = menuToggle?.querySelector('i');
    if (icon) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

function openMenu() {
    if (navLinks) navLinks.classList.add('active');
    if (overlay) overlay.classList.add('active');
    const icon = menuToggle?.querySelector('i');
    if (icon) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    }
}

if (menuToggle) {
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (navLinks?.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });
}

if (overlay) {
    overlay.addEventListener('click', () => {
        closeMenu();
    });
}

document.querySelectorAll('.nav-links button').forEach(btn => {
    btn.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            closeMenu();
        }
    });
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeMenu();
    }
});

// ========== EFECTO STICKY NAVBAR ==========
const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ========== CHATBOT ==========
const chatbotWidget = document.getElementById('chatbotWidget');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendChatBtn = document.getElementById('sendChatBtn');
const chatbotFloat = document.getElementById('chatbotFloatBtn');
const closeChat = document.getElementById('closeChatBtn');

chatbotFloat?.addEventListener('click', () => chatbotWidget.classList.toggle('open'));
closeChat?.addEventListener('click', () => chatbotWidget.classList.remove('open'));

const knowledgeBase = [
    { keywords: ["precio", "costo", "plan", "mensualidad", "pago"], response: "🐪 Nuestro Plan Élite cuesta $49 USD al mes (o $399 anual). Incluye capacitación completa, revisión de HV con IA, entrevistas mock y postulación a vacantes estratégicas." },
    { keywords: ["hoja de vida", "hv", "curriculum", "mejorar", "optimizar"], response: "📄 Ofrecemos revisión de hoja de vida con IA (análisis ATS). Detectamos áreas de mejora y te entregamos una versión optimizada. ¿Quieres una revisión gratuita inicial? Escríbenos al WhatsApp." },
    { keywords: ["entrevista", "preparación", "mock", "simulación"], response: "🎯 Tenemos sesiones de entrevistas mock con feedback de reclutadores expertos. Incluye técnicas de storytelling y negociación salarial. ¿Agendamos una prueba?" },
    { keywords: ["outsourcing", "postular", "vacantes", "empleo", "trabajo"], response: "💼 Con Outsourcing Élite te postulamos a +50 vacantes estratégicas por mes, alineadas con tu perfil. ¿Quieres que revisemos tu perfil?" },
    { keywords: ["contacto", "whatsapp", "teléfono", "número"], response: "📞 Puedes contactarnos al WhatsApp 3177366474 (respuesta en menos de 5 minutos). También por correo: hola@camellando.co" },
    { keywords: ["horario", "horarios", "atención"], response: "⏰ Lunes a viernes de 8am a 6pm. Sábados de 9am a 1pm por chat y WhatsApp." }
];

function getResponse(msg) {
    const lowerMsg = msg.toLowerCase();
    for (const item of knowledgeBase) {
        for (const keyword of item.keywords) {
            if (lowerMsg.includes(keyword)) return item.response;
        }
    }
    return "🐪 No entendí bien tu pregunta. Puedes preguntarme sobre: precios, mejora de hoja de vida, preparación para entrevistas, outsourcing, horarios de atención o cómo contactarnos.";
}

function addMessage(text, isUser) {
    const div = document.createElement('div');
    div.className = `message ${isUser ? 'user' : 'bot'}`;
    div.innerHTML = text;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendMessage() {
    const msg = chatInput.value.trim();
    if (!msg) return;
    addMessage(msg, true);
    chatInput.value = '';
    setTimeout(() => addMessage(getResponse(msg), false), 300);
}

sendChatBtn?.addEventListener('click', sendMessage);
chatInput?.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });

document.querySelectorAll('.quick-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        chatInput.value = btn.getAttribute('data-question');
        sendMessage();
    });
});
// ========== ANIMACIONES AL SCROLL (INTERSECTION OBSERVER) ==========
const animatedElements = document.querySelectorAll('.service-card, .job-card, .pricing-card, .contact-box, .social-section');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Deja de observar una vez visible
        }
    });
}, { threshold: 0.2 }); // Se activa cuando el 20% del elemento es visible

animatedElements.forEach(el => observer.observe(el));
// ========== ANIMACIONES DECORATIVAS ==========
function createLeaf() {
    const leaf = document.createElement('div');
    leaf.className = 'leaf';
    leaf.innerHTML = ['🍂', '🍃', '🌿', '🍁', '🌾'][Math.floor(Math.random() * 5)];
    leaf.style.left = Math.random() * 100 + '%';
    leaf.style.animationDuration = Math.random() * 5 + 4 + 's';
    leaf.style.animationDelay = Math.random() * 5 + 's';
    leaf.style.fontSize = Math.random() * 10 + 15 + 'px';
    leaf.style.opacity = Math.random() * 0.4 + 0.3;
    document.body.appendChild(leaf);
    setTimeout(() => leaf.remove(), 10000);
}
setInterval(createLeaf, 1500);

const shapes = ['●', '◆', '■', '▲', '♥'];
for (let i = 0; i < 12; i++) {
    const shape = document.createElement('div');
    shape.className = 'floating-shape';
    shape.style.width = Math.random() * 80 + 30 + 'px';
    shape.style.height = shape.style.width;
    shape.style.left = Math.random() * 100 + '%';
    shape.style.top = Math.random() * 100 + '%';
    shape.style.animationDelay = Math.random() * 5 + 's';
    shape.style.animationDuration = Math.random() * 6 + 4 + 's';
    shape.style.background = `rgba(245, 158, 11, ${Math.random() * 0.08 + 0.02})`;
    document.body.appendChild(shape);
}

for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 5 + 's';
    particle.style.animationDuration = Math.random() * 4 + 3 + 's';
    document.body.appendChild(particle);
}

// Inicializar UI
updateUI();
showPage('inicio');

