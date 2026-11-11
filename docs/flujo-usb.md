# Documentación de flujo USB

## Objetivo

Simular la experiencia de gestión de una solicitud de habilitación USB, considerando:

- alta de la solicitud por parte del solicitante
- validación del plazo
- aprobación de Dirección
- asignación del técnico por AASU
- cierre por parte del técnico con ticket CISO y cifrado
- notificaciones asociadas por cada etapa

## Flujos principales

1. Solicitud creada por el solicitante
2. Validación por fecha de fin y motivo
3. Envío a aprobación de Dirección
4. Aprobación → Estado: Pendiente Supervisor AASU
5. Supervisor asigna técnico
6. Técnico registra ticket y cifra o no el disco
7. Cierre o rechazo final

## Reglas aplicadas en el prototipo

- La fecha de inicio siempre se fija a la fecha actual.
- La fecha de fin debe ser:
  - posterior a hoy
  - máximo 1 año después de inicio
- El motivo debe tener al menos 20 caracteres.
- Dirección puede aprobar o rechazar.
- Supervisor solo puede asignar técnico en solicitudes pendientes.
- Técnico solo puede cerrar o escalar con ticket CISO.

## Variables clave

- `sib_fechainicio`
- `sib_fechafin`
- `sib_estado`
- `sib_tecnico`
- `sib_ticketciso`
- `sib_discocifrado`

## Resultado esperado

La app permite entender visualmente el flujo, la separación de permisos y la transición entre estados.
