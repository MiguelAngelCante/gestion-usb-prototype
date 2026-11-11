const estadoMap = {
  100000000: 'Pendiente Dirección',
  100000001: 'Rechazada',
  100000002: 'Pendiente Supervisor AASU',
  100000003: 'Asignada a técnico',
  100000004: 'En gestión con CISO',
  100000005: 'Completada',
  100000006: 'Vencida',
  100000007: 'Cancelada',
};

const requests = [
  {
    id: 'USB-000001',
    solicitante: 'Ana Gómez',
    email: 'ana.gomez@institucion.com',
    fechaInicio: '2026-11-11',
    fechaFin: '2027-05-11',
    tipoDispositivo: 'Memoria USB',
    marcaModelo: 'Kingston DataTraveler 128GB',
    numeroSerie: 'KD-12345',
    capacidad: 128,
    proporcionadoSIB: 'Sí',
    motivo: 'Necesito transportar reportes financieros de un proyecto para revisión externa.',
    estado: 100000000,
    aprobador: '',
    supervisor: '',
    tecnico: '',
    ticketCISO: '',
    discocifrado: null,
    observacionesTecnico: '',
    fechaDecisionDireccion: '',
    comentarioDireccion: '',
    fechaAsignacion: '',
  },
  {
    id: 'USB-000002',
    solicitante: 'Luis Paredes',
    email: 'luis.paredes@institucion.com',
    fechaInicio: '2026-11-11',
    fechaFin: '2027-02-10',
    tipoDispositivo: 'Disco SSD externo',
    marcaModelo: 'Samsung T7 1TB',
    numeroSerie: 'SM-7789',
    capacidad: 1000,
    proporcionadoSIB: 'No',
    motivo: 'Requiero respaldar información de auditoría para entrega de cumplimiento trimestral.',
    estado: 100000002,
    aprobador: 'María Torres',
    supervisor: 'Javier López',
    tecnico: 'Pedro Ruiz',
    ticketCISO: 'CISO-4501',
    discocifrado: true,
    observacionesTecnico: '',
    fechaDecisionDireccion: '2026-11-12',
    comentarioDireccion: '',
    fechaAsignacion: '2026-11-13',
  },
  {
    id: 'USB-000003',
    solicitante: 'Carmen Mota',
    email: 'carmen.mota@institucion.com',
    fechaInicio: '2026-11-11',
    fechaFin: '2026-11-20',
    tipoDispositivo: 'Otro',
    marcaModelo: 'SanDisk 256GB',
    numeroSerie: 'SD-8890',
    capacidad: 256,
    proporcionadoSIB: 'Sí',
    motivo: 'Necesito mover documentación de campo para una prueba con equipo externo de soporte.',
    estado: 100000003,
    aprobador: 'María Torres',
    supervisor: 'Javier López',
    tecnico: 'Pedro Ruiz',
    ticketCISO: 'CISO-9100',
    discocifrado: false,
    observacionesTecnico: 'Se entregó sin cifrado por bloqueo del equipo del usuario.',
    fechaDecisionDireccion: '2026-11-12',
    comentarioDireccion: '',
    fechaAsignacion: '2026-11-13',
  },
];

const roles = {
  solicitante: 'Solicitante',
  direccion: 'Dirección',
  supervisor: 'Supervisor AASU',
  tecnico: 'Técnico AASU',
};

const formSolicitud = document.getElementById('formSolicitud');
const rolActual = document.getElementById('rolActual');
const statsGrid = document.getElementById('statsGrid');
const tablaSolicitudes = document.getElementById('tablaSolicitudes');
const listaAprobacion = document.getElementById('listaAprobacion');
const listaSupervisor = document.getElementById('listaSupervisor');
const listaTecnico = document.getElementById('listaTecnico');

const sections = {
  solicitante: document.getElementById('solicitanteSection'),
  direccion: document.getElementById('direccionSection'),
  supervisor: document.getElementById('supervisorSection'),
  tecnico: document.getElementById('tecnicoSection'),
};

const tecnicos = ['Pedro Ruiz', 'Diego Gómez', 'Sofía León'];

function formatDate(dateString) {
  if (!dateString) return '-';
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function setCurrentDate() {
  const hoy = new Date();
  const fecha = hoy.toISOString().split('T')[0];
  document.getElementById('fechaInicio').value = fecha;
}

function getRequestById(id) {
  return requests.find((request) => request.id === id);
}

function calculateStats() {
  const counts = {};
  Object.values(estadoMap).forEach((estado) => {
    counts[estado] = 0;
  });

  requests.forEach((request) => {
    counts[estadoMap[request.estado]] = (counts[estadoMap[request.estado]] || 0) + 1;
  });

  return [
    { label: 'Total', value: requests.length },
    { label: 'Pendientes Dirección', value: counts['Pendiente Dirección'] },
    { label: 'Asignadas', value: counts['Asignada a técnico'] },
    { label: 'Completadas', value: counts['Completada'] },
    { label: 'Vencidas', value: counts['Vencida'] },
  ];
}

function renderStats() {
  const stats = calculateStats();
  statsGrid.innerHTML = stats
    .map(
      (stat) => `
        <div class="stat-card">
          <span class="label">${stat.label}</span>
          <span class="value">${stat.value}</span>
        </div>
      `,
    )
    .join('');
}

function statusClass(estado) {
  const map = {
    'Pendiente Dirección': 'warning',
    'Rechazada': 'danger',
    'Pendiente Supervisor AASU': 'warning',
    'Asignada a técnico': 'primary',
    'En gestión con CISO': 'primary',
    'Completada': 'success',
    'Vencida': 'danger',
    'Cancelada': 'danger',
  };

  return map[estado] || 'primary';
}

function renderTable() {
  tablaSolicitudes.innerHTML = requests
    .map(
      (request) => `
        <tr>
          <td>${request.id}</td>
          <td>${request.solicitante}</td>
          <td>${formatDate(request.fechaInicio)}</td>
          <td>${formatDate(request.fechaFin)}</td>
          <td>${request.tipoDispositivo}</td>
          <td><span class="badge ${statusClass(estadoMap[request.estado])}">${estadoMap[request.estado]}</span></td>
          <td>${request.tecnico || '-'}</td>
        </tr>
      `,
    )
    .join('');
}

function renderDireccion() {
  const solicitudes = requests.filter((r) => r.estado === 100000000);

  listaAprobacion.innerHTML = solicitudes.length
    ? solicitudes
        .map(
          (request) => `
            <article class="request-card">
              <div class="card-header">
                <strong>${request.id}</strong>
                <span class="estado-tag">${estadoMap[request.estado]}</span>
              </div>
              <div class="card-body">
                <div><strong>Solicitante:</strong> ${request.solicitante}</div>
                <div><strong>Dispositivo:</strong> ${request.tipoDispositivo}</div>
                <div><strong>Serie:</strong> ${request.numeroSerie}</div>
                <div><strong>Fecha fin:</strong> ${formatDate(request.fechaFin)}</div>
                <div class="full-width"><strong>Motivo:</strong> ${request.motivo}</div>
              </div>
              <div class="card-actions">
                <button class="success" data-action="approve" data-id="${request.id}">Aprobar</button>
                <button class="danger" data-action="reject" data-id="${request.id}">Rechazar</button>
              </div>
            </article>
          `,
        )
        .join('')
    : '<div class="notice">No hay solicitudes pendientes de aprobación.</div>';
}

function renderSupervisor() {
  const solicitudes = requests.filter((r) => r.estado === 100000002);

  listaSupervisor.innerHTML = solicitudes.length
    ? solicitudes
        .map(
          (request) => `
            <article class="request-card">
              <div class="card-header">
                <strong>${request.id}</strong>
                <span class="estado-tag">${estadoMap[request.estado]}</span>
              </div>
              <div class="card-body">
                <div><strong>Solicitante:</strong> ${request.solicitante}</div>
                <div><strong>Dispositivo:</strong> ${request.tipoDispositivo}</div>
                <div><strong>Serie:</strong> ${request.numeroSerie}</div>
                <div><strong>Fecha fin:</strong> ${formatDate(request.fechaFin)}</div>
              </div>
              <div class="inline-form">
                <label>
                  Técnico
                  <select data-tech-select="${request.id}">
                    <option value="">Seleccione</option>
                    ${tecnicos.map((t) => `<option value="${t}">${t}</option>`).join('')}
                  </select>
                </label>
                <div class="actions">
                  <button class="primary" data-action="assign" data-id="${request.id}">Asignar</button>
                </div>
              </div>
            </article>
          `,
        )
        .join('')
    : '<div class="notice">No hay solicitudes esperando asignación.</div>';
}

function renderTecnico() {
  const solicitudes = requests.filter((r) => ['100000003', '100000004'].includes(String(r.estado)));

  listaTecnico.innerHTML = solicitudes.length
    ? solicitudes
        .map(
          (request) => `
            <article class="request-card">
              <div class="card-header">
                <strong>${request.id}</strong>
                <span class="estado-tag">${estadoMap[request.estado]}</span>
              </div>
              <div class="card-body">
                <div><strong>Solicitante:</strong> ${request.solicitante}</div>
                <div><strong>Dispositivo:</strong> ${request.tipoDispositivo}</div>
                <div><strong>Serie:</strong> ${request.numeroSerie}</div>
                <div><strong>Fecha fin:</strong> ${formatDate(request.fechaFin)}</div>
              </div>
              <div class="inline-form">
                <label>
                  Número de ticket CISO
                  <input type="text" data-ticket="${request.id}" value="${request.ticketCISO || ''}" placeholder="CISO-####" />
                </label>
                <label>
                  ¿Disco cifrado?
                  <select data-cifrado="${request.id}">
                    <option value="">Seleccione</option>
                    <option value="Sí" ${request.discocifrado === true ? 'selected' : ''}>Sí</option>
                    <option value="No" ${request.discocifrado === false ? 'selected' : ''}>No</option>
                  </select>
                </label>
                <label class="full-width">
                  Observaciones del técnico
                  <textarea data-observacion="${request.id}" rows="3" placeholder="Se requiere si el disco no se cifró">${request.observacionesTecnico || ''}</textarea>
                </label>
              </div>
              <div class="card-actions">
                <button class="primary" data-action="escalar" data-id="${request.id}">Escalado a CISO</button>
                <button class="success" data-action="cerrar" data-id="${request.id}">Cerrar solicitud</button>
              </div>
            </article>
          `,
        )
        .join('')
    : '<div class="notice">No hay tareas pendientes para el técnico.</div>';
}

function renderRoleViews() {
  const role = rolActual.value;
  Object.keys(sections).forEach((key) => {
    const element = sections[key];
    if (key === role) {
      element.classList.remove('panel-hidden');
      element.classList.add('panel-visible');
    } else {
      element.classList.remove('panel-visible');
      element.classList.add('panel-hidden');
    }
  });
}

function validateSolicitud(data) {
  const fechaFin = new Date(data.fechaFin + 'T00:00:00');
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  if (!data.fechaFin) {
    return 'Debe indicar la fecha de fin.';
  }

  if (fechaFin <= hoy) {
    return 'La fecha de fin debe ser posterior a hoy.';
  }

  const maximo = new Date(hoy);
  maximo.setFullYear(hoy.getFullYear() + 1);
  if (fechaFin > maximo) {
    return 'La fecha de fin no puede superar un año desde hoy.';
  }

  if ((data.motivo || '').trim().length < 20) {
    return 'El motivo debe contener al menos 20 caracteres.';
  }

  return null;
}

function showAlert(message, isError = false) {
  const color = isError ? '#d93025' : '#0f9d58';
  const info = document.createElement('div');
  info.textContent = message;
  info.style.position = 'fixed';
  info.style.right = '20px';
  info.style.bottom = '20px';
  info.style.background = color;
  info.style.color = 'white';
  info.style.padding = '12px 16px';
  info.style.borderRadius = '10px';
  info.style.zIndex = '1000';
  document.body.appendChild(info);
  setTimeout(() => info.remove(), 2200);
}

formSolicitud.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = {
    fechaFin: document.getElementById('fechaFin').value,
    tipoDispositivo: document.getElementById('tipoDispositivo').value,
    marcaModelo: document.getElementById('marcaModelo').value.trim(),
    numeroSerie: document.getElementById('numeroSerie').value.trim(),
    capacidad: document.getElementById('capacidad').value,
    proporcionadoSIB: document.getElementById('proporcionadoSIB').value,
    motivo: document.getElementById('motivo').value.trim(),
  };

  const error = validateSolicitud(data);
  if (error) {
    showAlert(error, true);
    return;
  }

  const newRequest = {
    id: `USB-${String(requests.length + 1).padStart(6, '0')}`,
    solicitante: 'Usuario actual',
    email: 'usuario@institucion.com',
    fechaInicio: new Date().toISOString().split('T')[0],
    fechaFin: data.fechaFin,
    tipoDispositivo: data.tipoDispositivo,
    marcaModelo: data.marcaModelo,
    numeroSerie: data.numeroSerie,
    capacidad: Number(data.capacidad || 0),
    proporcionadoSIB: data.proporcionadoSIB,
    motivo: data.motivo,
    estado: 100000000,
    aprobador: '',
    supervisor: '',
    tecnico: '',
    ticketCISO: '',
    discocifrado: null,
    observacionesTecnico: '',
    fechaDecisionDireccion: '',
    comentarioDireccion: '',
    fechaAsignacion: '',
  };

  requests.unshift(newRequest);
  formSolicitud.reset();
  setCurrentDate();
  renderAll();
  showAlert('Solicitud creada y enviada a Dirección');
});

function handleAction(event) {
  const { action, id } = event.target.dataset;
  if (!action || !id) return;

  const request = getRequestById(id);
  if (!request) return;

  if (action === 'approve') {
    request.estado = 100000002;
    request.fechaDecisionDireccion = new Date().toISOString().split('T')[0];
    request.aprobador = 'Director';
    request.comentarioDireccion = 'Aprobado por Dirección';
    showAlert('Solicitud aprobada. Enviada a Supervisor AASU.');
  }

  if (action === 'reject') {
    request.estado = 100000001;
    request.fechaDecisionDireccion = new Date().toISOString().split('T')[0];
    request.comentarioDireccion = 'Solicitud rechazada por Dirección';
    showAlert('Solicitud rechazada.');
  }

  if (action === 'assign') {
    const select = document.querySelector(`select[data-tech-select="${id}"]`);
    const assigned = select?.value;
    if (!assigned) {
      showAlert('Debe seleccionar un técnico.', true);
      return;
    }
    request.tecnico = assigned;
    request.supervisor = 'Supervisor actual';
    request.fechaAsignacion = new Date().toISOString();
    request.estado = 100000003;
    showAlert(`Técnico asignado: ${assigned}`);
  }

  if (action === 'escalar') {
    const ticket = document.querySelector(`input[data-ticket="${id}"]`)?.value?.trim();
    if (!ticket) {
      showAlert('Ingrese el número de ticket de CISO.', true);
      return;
    }
    request.ticketCISO = ticket;
    request.estado = 100000004;
    showAlert('Ticket registrado y solicitud escalada a CISO.');
  }

  if (action === 'cerrar') {
    const ticket = document.querySelector(`input[data-ticket="${id}"]`)?.value?.trim();
    const cifrado = document.querySelector(`select[data-cifrado="${id}"]`)?.value;
    const observacion = document.querySelector(`textarea[data-observacion="${id}"]`)?.value?.trim();

    if (!ticket) {
      showAlert('Ingrese el número de ticket de CISO.', true);
      return;
    }

    if (!cifrado) {
      showAlert('Indique si el disco fue cifrado.', true);
      return;
    }

    if (cifrado === 'No' && observacion.length < 10) {
      showAlert('Debe indicar una observación si el disco no se cifró.', true);
      return;
    }

    request.ticketCISO = ticket;
    request.discocifrado = cifrado === 'Sí';
    request.observacionesTecnico = observacion;
    request.estado = 100000005;
    showAlert('Solicitud cerrada correctamente.');
  }

  renderAll();
}

document.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action]');
  if (button) handleAction({ target: button });
});

rolActual.addEventListener('change', renderRoleViews);

function renderAll() {
  renderStats();
  renderTable();
  renderDireccion();
  renderSupervisor();
  renderTecnico();
  renderRoleViews();
}

setCurrentDate();
renderAll();

