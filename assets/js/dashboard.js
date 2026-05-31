// ========== CONFIGURACIÓN ==========
const API_URL = 'https://script.google.com/macros/s/AKfycbwKkL3_vJ4mteq2Y1aujsDfibo2Y-gjyFYkJGF-_rZm_RvWYfjitPKZt1ARX-8g0Nh0/exec';

// ========== VERIFICAR SESIÓN ==========
const user = localStorage.getItem('camellando_user');
if (!user) {
    window.location.href = 'index.html';
}

const userData = JSON.parse(user);
if (userData.rol !== 'admin') {
    alert('Acceso no autorizado. Solo administradores.');
    window.location.href = 'index.html';
}

// Verificación adicional por email
if (userData.email !== 'shoyosb@gmail.com') {
    alert('Acceso no autorizado. Credenciales de administrador inválidas.');
    window.location.href = 'index.html';
}

document.getElementById('adminName').innerText = userData.name;

// ========== CERRAR SESIÓN ==========
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('camellando_user');
    window.location.href = 'index.html';
});

// ========== NAVEGACIÓN ENTRE SECCIONES ==========
const navBtns = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.dashboard-section');

navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const section = btn.getAttribute('data-section');
        navBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        sections.forEach(s => s.classList.remove('active'));
        document.getElementById(`section-${section}`).classList.add('active');
    });
});

// ========== FUNCIÓN PARA LLAMAR AL API ==========
async function callAPI(accion, datos = {}) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ accion, ...datos })
        });
        const result = await response.json();
        console.log(`API ${accion}:`, result);
        return result;
    } catch (error) {
        console.error('Error llamando a la API:', error);
        return { exito: false, error: error.message };
    }
}

// ========== CLIENTES ==========
let clients = [];

async function loadClients() {
    const result = await callAPI('obtenerClientes');
    if (result.exito) {
        clients = result.clientes || [];
        renderClientsTable();
        updateStats();
    } else {
        console.error('Error cargando clientes:', result.error);
        clients = [];
        renderClientsTable();
    }
}

function renderClientsTable() {
    const tbody = document.getElementById('clientsTableBody');
    if (!tbody) return;
    
    if (clients.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">No hay clientes registrados</td></tr>';
        return;
    }
    
    tbody.innerHTML = clients.map(client => `
        <tr>
            <td>${client.id}</td>
            <td>${client.nombre || ''}</td>
            <td>${client.email || ''}</td>
            <td>${client.telefono || '-'}</td>
            <td><span class="status-badge">${client.estado || 'Activo'}</span></td>
            <td>
                <button class="btn-delete" onclick="deleteClient(${client.id})">Eliminar</button>
            </td>
        </tr>
    `).join('');
}

async function deleteClient(id) {
    if (confirm('¿Eliminar este cliente?')) {
        const result = await callAPI('eliminarCliente', { id });
        if (result.exito) {
            await loadClients();
            alert('Cliente eliminado correctamente');
        } else {
            alert('Error al eliminar cliente: ' + (result.error || result.mensaje));
        }
    }
}

async function updateStats() {
    const totalClients = clients.length;
    document.getElementById('totalClients').innerText = totalClients;
    
    // Cargar horarios para contar citas
    const horariosResult = await callAPI('obtenerHorarios');
    if (horariosResult.exito) {
        document.getElementById('totalAppointments').innerText = horariosResult.horarios?.length || 0;
    }
    
    // Cargar métricas
    const metricasResult = await callAPI('obtenerMetricas');
    if (metricasResult.exito && metricasResult.metricas && metricasResult.metricas.length > 0) {
        const ultimaMetrica = metricasResult.metricas[metricasResult.metricas.length - 1];
        document.getElementById('totalPlacements').innerText = ultimaMetrica.colocaciones || '0';
        document.getElementById('totalRevenue').innerText = `$${ultimaMetrica.ingresos || 0}`;
    }
}

// Agregar cliente
const clientModal = document.getElementById('clientModal');
const addClientBtn = document.getElementById('addClientBtn');
const closeClientModal = document.getElementById('closeClientModal');

addClientBtn?.addEventListener('click', () => {
    clientModal.style.display = 'flex';
});

closeClientModal?.addEventListener('click', () => {
    clientModal.style.display = 'none';
});

document.getElementById('addClientForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('clientName').value;
    const email = document.getElementById('clientEmail').value;
    const telefono = document.getElementById('clientPhone').value;
    
    const result = await callAPI('agregarCliente', { nombre, email, telefono });
    if (result.exito) {
        await loadClients();
        clientModal.style.display = 'none';
        document.getElementById('addClientForm').reset();
        alert('Cliente agregado correctamente');
    } else {
        alert('Error al agregar cliente: ' + (result.error || result.mensaje));
    }
});

// ========== HORARIOS ==========
let schedules = [];

async function loadSchedules() {
    const result = await callAPI('obtenerHorarios');
    if (result.exito) {
        schedules = result.horarios || [];
        renderSchedules();
    } else {
        console.error('Error cargando horarios:', result.error);
        schedules = [];
        renderSchedules();
    }
}

function renderSchedules() {
    const scheduleList = document.getElementById('scheduleList');
    if (!scheduleList) return;
    
    if (schedules.length === 0) {
        scheduleList.innerHTML = '<div style="text-align:center; padding:30px;">No hay horarios registrados</div>';
        return;
    }
    
    scheduleList.innerHTML = schedules.map(schedule => `
        <div class="schedule-item" data-id="${schedule.id}">
            <div class="drag-handle"><i class="fas fa-grip-vertical"></i></div>
            <div class="schedule-info">
                <strong>${schedule.dia || ''}</strong>
                <span>Cliente: ${schedule.cliente || ''}</span>
                <span>Tipo: ${schedule.tipo || ''}</span>
            </div>
            <button class="delete-schedule" data-id="${schedule.id}"><i class="fas fa-trash"></i></button>
        </div>
    `).join('');
    
    // Inicializar Sortable
    if (typeof Sortable !== 'undefined') {
        new Sortable(scheduleList, {
            handle: '.drag-handle',
            animation: 300,
            onEnd: async function() {
                const newOrder = [];
                document.querySelectorAll('.schedule-item').forEach((item, index) => {
                    newOrder.push({ id: parseInt(item.dataset.id), orden: index + 1 });
                });
                await callAPI('reordenarHorarios', { ordenes: newOrder });
            }
        });
    }
    
    // Eventos de eliminar
    document.querySelectorAll('.delete-schedule').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const id = parseInt(btn.dataset.id);
            if (confirm('¿Eliminar este horario?')) {
                const result = await callAPI('eliminarHorario', { id });
                if (result.exito) {
                    await loadSchedules();
                    alert('Horario eliminado correctamente');
                } else {
                    alert('Error al eliminar horario');
                }
            }
        });
    });
}

// Agregar horario
const scheduleModal = document.getElementById('scheduleModal');
const addScheduleBtn = document.getElementById('addScheduleBtn');
const closeScheduleModal = document.getElementById('closeScheduleModal');

addScheduleBtn?.addEventListener('click', () => {
    scheduleModal.style.display = 'flex';
});

closeScheduleModal?.addEventListener('click', () => {
    scheduleModal.style.display = 'none';
});

document.getElementById('addScheduleForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const dia = document.getElementById('scheduleDay').value;
    const cliente = document.getElementById('scheduleClient').value;
    const tipo = document.getElementById('scheduleType').value;
    
    const result = await callAPI('agregarHorario', { dia, cliente, tipo });
    if (result.exito) {
        await loadSchedules();
        scheduleModal.style.display = 'none';
        document.getElementById('addScheduleForm').reset();
        alert('Horario agregado correctamente');
    } else {
        alert('Error al agregar horario');
    }
});

// ========== DRAG & DROP ORGANIZADOR ==========
const dragContainer = document.getElementById('dragContainer');
if (dragContainer && typeof Sortable !== 'undefined') {
    new Sortable(dragContainer, {
        animation: 300,
        ghostClass: 'dragging',
        onEnd: function() {
            console.log('Nuevo orden de tareas guardado en localStorage');
            const newOrder = [];
            document.querySelectorAll('.drag-card').forEach((card, index) => {
                newOrder.push({ id: card.dataset.id, order: index });
            });
            localStorage.setItem('dashboard_tasks_order', JSON.stringify(newOrder));
        }
    });
    
    // Restaurar orden guardado
    const savedOrder = localStorage.getItem('dashboard_tasks_order');
    if (savedOrder) {
        try {
            const order = JSON.parse(savedOrder);
            const container = dragContainer;
            const items = order.map(o => document.querySelector(`.drag-card[data-id="${o.id}"]`)).filter(item => item);
            items.forEach(item => container.appendChild(item));
        } catch(e) {}
    }
}

// ========== GRÁFICOS CON CHART.JS ==========
let metricsChart, servicesChart;

async function loadCharts() {
    const result = await callAPI('obtenerMetricas');
    if (result.exito && result.metricas && result.metricas.length > 0) {
        const metricas = result.metricas;
        const meses = metricas.map(m => m.mes);
        const clientesNuevos = metricas.map(m => m.clientes_nuevos);
        const colocaciones = metricas.map(m => m.colocaciones);
        
        // Gráfico de métricas (Resumen)
        const ctx = document.getElementById('metricsChart')?.getContext('2d');
        if (ctx && typeof Chart !== 'undefined') {
            if (metricsChart) metricsChart.destroy();
            metricsChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: meses,
                    datasets: [
                        {
                            label: 'Clientes nuevos',
                            data: clientesNuevos,
                            borderColor: '#0B2B5E',
                            backgroundColor: 'rgba(11,43,94,0.1)',
                            tension: 0.3,
                            fill: true
                        },
                        {
                            label: 'Colocaciones',
                            data: colocaciones,
                            borderColor: '#F59E0B',
                            backgroundColor: 'rgba(245,158,11,0.1)',
                            tension: 0.3,
                            fill: true
                        }
                    ]
                },
                options: { responsive: true, maintainAspectRatio: true }
            });
        }
    }
    
    // Gráfico de servicios (datos estáticos de ejemplo)
    const servicesCtx = document.getElementById('servicesChart')?.getContext('2d');
    if (servicesCtx && typeof Chart !== 'undefined') {
        if (servicesChart) servicesChart.destroy();
        servicesChart = new Chart(servicesCtx, {
            type: 'doughnut',
            data: {
                labels: ['Entrevistas Mock', 'Revisión HV', 'Capacitación', 'Outsourcing'],
                datasets: [{
                    data: [35, 25, 25, 15],
                    backgroundColor: ['#0B2B5E', '#F59E0B', '#10B981', '#6B7280'],
                }]
            },
            options: { responsive: true }
        });
    }
}

// ========== INICIALIZAR DASHBOARD ==========
async function initDashboard() {
    await loadClients();
    await loadSchedules();
    await loadCharts();
}

initDashboard();

// Cerrar modales al hacer clic fuera
window.onclick = (e) => {
    if (e.target === clientModal) clientModal.style.display = 'none';
    if (e.target === scheduleModal) scheduleModal.style.display = 'none';
};

// Exponer funciones globales para los botones onclick
window.deleteClient = deleteClient;