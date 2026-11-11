# Prototipo de gestión de habilitación USB

Este repositorio contiene un prototipo funcional de una aplicación web para gestionar solicitudes de habilitación USB, simulando el flujo de Power Platform descrito en la especificación.

## Qué incluye

- Formulario del solicitante para crear una solicitud
- Validaciones del lado del cliente:
  - fecha de fin posterior a hoy
  - plazo máximo de 1 año
  - motivo con mínimo 20 caracteres
- Vista de Dirección para aprobar o rechazar
- Vista de Supervisor AASU para asignar técnico
- Vista de Técnico AASU para registrar ticket y cierre
- Dashboard con conteos por estado
- Datos de ejemplo para validar el flujo completo

## Cómo ejecutarlo

Desde la raíz del proyecto:

```bash
python -m http.server 8080
```

Luego abre en el navegador:

```text
http://localhost:8080
```

## Estructura

- `index.html` — pantalla principal de la app
- `styles.css` — estilos y diseño
- `app.js` — lógica de la aplicación y simulación del flujo
- `docs/flujo-usb.md` — documentación del flujo

## Roles del prototipo

- Solicitante
- Dirección
- Supervisor AASU
- Técnico AASU

## Estados de la solicitud

- Pendiente Dirección
- Rechazada
- Pendiente Supervisor AASU
- Asignada a técnico
- En gestión con CISO
- Completada
- Vencida
- Cancelada

## Nota

Este prototipo no conecta con Dataverse ni Power Platform. Sirve como maqueta funcional para validar el flujo, roles y decisiones antes de implementar la solución real en el entorno de Microsoft Power Platform.
