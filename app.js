* {
  box-sizing: border-box;
}

:root {
  --bg: #f3f6fb;
  --surface: #ffffff;
  --surface-alt: #eef4ff;
  --primary: #0b5ed7;
  --primary-dark: #0a4ab3;
  --success: #0f9d58;
  --warning: #f59e0b;
  --danger: #d93025;
  --text: #14213d;
  --muted: #5c6b84;
  --border: #dfe7f4;
  --shadow: 0 10px 28px rgba(29, 37, 52, 0.08);
}

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background: var(--bg);
  color: var(--text);
}

button, input, select, textarea {
  font: inherit;
}

.app-shell {
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  margin-bottom: 24px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  box-shadow: var(--shadow);
}

.eyebrow {
  margin: 0 0 6px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
}

h1, h2, h3, p {
  margin-top: 0;
}

.role-switcher {
  display: flex;
  align-items: center;
  gap: 12px;
}

.role-switcher select {
  min-width: 180px;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: white;
}

.layout {
  display: grid;
  grid-template-columns: 1.2fr 1.2fr;
  gap: 24px;
}

.panel {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  box-shadow: var(--shadow);
  padding: 20px;
}

.important {
  grid-column: 1 / -1;
}

.full-span {
  grid-column: 1 / -1;
}

.panel-hidden {
  display: none;
}

.panel-visible {
  display: block;
}

.panel-header {
  margin-bottom: 16px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 16px;
}

.stat-card {
  background: var(--surface-alt);
  border-radius: 12px;
  padding: 18px;
  border: 1px solid var(--border);
}

.stat-card .value {
  font-size: 28px;
  font-weight: bold;
  display: block;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(220px, 1fr));
  gap: 18px;
}

label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-weight: 600;
  color: var(--text);
}

input, select, textarea {
  width: 100%;
  border: 1px solid var(--border);
  background: white;
  border-radius: 10px;
  padding: 10px 12px;
  color: var(--text);
}

textarea {
  resize: vertical;
}

.full-width {
  grid-column: 1 / -1;
}

.actions {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  margin-top: 6px;
}

button {
  border: 0;
  border-radius: 10px;
  padding: 10px 16px;
  cursor: pointer;
  font-weight: 700;
}

button.primary {
  background: var(--primary);
  color: white;
}

button.primary:hover {
  background: var(--primary-dark);
}

button.success {
  background: var(--success);
  color: white;
}

button.warning {
  background: var(--warning);
  color: white;
}

button.danger {
  background: var(--danger);
  color: white;
}

.request-list {
  display: grid;
  gap: 14px;
}

.request-card {
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px;
  background: linear-gradient(180deg, #ffffff, #f8fbff);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.estado-tag {
  display: inline-block;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  background: #e6f4ea;
  color: #146c43;
}

.card-body {
  display: grid;
  grid-template-columns: repeat(2, minmax(140px, 1fr));
  gap: 8px 18px;
  color: var(--muted);
  font-size: 14px;
}

.card-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
}

.table-wrap {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 900px;
}

th, td {
  border-bottom: 1px solid var(--border);
  padding: 12px 10px;
  text-align: left;
}

th {
  background: #fafcff;
}

.badge {
  display: inline-block;
  padding: 5px 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  background: #eef2ff;
  color: var(--primary);
}

.inline-form {
  display: grid;
  grid-template-columns: repeat(2, minmax(160px, 1fr));
  gap: 12px;
  margin-top: 12px;
}

.notice {
  margin-top: 12px;
  padding: 12px 14px;
  border: 1px solid var(--border);
  background: #f7faff;
  border-radius: 10px;
  color: var(--muted);
}

@media (max-width: 880px) {
  .layout {
    grid-template-columns: 1fr;
  }

  .form-grid,
  .inline-form,
  .card-body {
    grid-template-columns: 1fr;
  }

  .topbar {
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
  }
}

