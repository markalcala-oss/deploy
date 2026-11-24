import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('deploy');
  protected readonly activeSection = signal('Resumen');
  protected readonly selectedPeriod = signal('Últimos 7 días');
  protected readonly toastVisible = signal(false);
  protected readonly isAuthenticated = signal(false);
  protected readonly email = signal('');
  protected readonly password = signal('');
  protected readonly showPassword = signal(false);
  protected readonly loginError = signal('');

  protected readonly navigation = [
    { label: 'Resumen', icon: '▦' },
    { label: 'Analítica', icon: '◔' },
    { label: 'Proyectos', icon: '▣', badge: '4' },
    { label: 'Equipo', icon: '♧' },
    { label: 'Reportes', icon: '▤' },
  ];

  protected readonly stats = [
    { label: 'Ingresos totales', value: '$48,295', change: '+12.5%', icon: '$', tone: 'blue' },
    { label: 'Usuarios activos', value: '12,840', change: '+8.2%', icon: '♙', tone: 'purple' },
    { label: 'Tasa de conversión', value: '24.8%', change: '+4.6%', icon: '↗', tone: 'green' },
    { label: 'Sesiones totales', value: '36,420', change: '-2.1%', negative: true, icon: '◷', tone: 'orange' },
  ];

  protected readonly activities = [
    { title: 'Nuevo usuario registrado', detail: 'Carlos Mendoza creó una cuenta', time: 'Hace 5 min', icon: '♙', tone: 'blue' },
    { title: 'Proyecto actualizado', detail: 'Se actualizó el proyecto “Portal web”', time: 'Hace 25 min', icon: '✓', tone: 'green' },
    { title: 'Reporte generado', detail: 'Reporte mensual disponible para descargar', time: 'Hace 1 h', icon: '▤', tone: 'purple' },
  ];

  protected readonly projects = [
    { name: 'Portal web corporativo', owner: 'Ana García', initials: 'AG', progress: 82, progressText: 'En curso', status: 'En progreso', statusTone: 'progressing', updated: 'Hoy, 09:32', tone: 'blue' },
    { name: 'App móvil educativa', owner: 'Luis Torres', initials: 'LT', progress: 100, progressText: 'Completado', status: 'Completado', statusTone: 'completed', updated: 'Ayer, 16:48', tone: 'purple' },
    { name: 'Campaña de lanzamiento', owner: 'Sofía Ríos', initials: 'SR', progress: 46, progressText: 'En revisión', status: 'En revisión', statusTone: 'review', updated: '12 Jun, 14:20', tone: 'orange' },
  ];

  protected readonly channels = [
    { name: 'Búsqueda orgánica', value: 78 },
    { name: 'Redes sociales', value: 61 },
    { name: 'Email marketing', value: 46 },
    { name: 'Referidos', value: 32 },
  ];

  protected readonly projectColumns = [
    { title: 'Por hacer', tag: 'PENDIENTE', date: '18 Jun', initials: 'MC', tone: 'orange', items: ['Optimizar página de inicio', 'Definir contenido del blog'] },
    { title: 'En progreso', tag: 'ACTIVO', date: '20 Jun', initials: 'AG', tone: 'blue', items: ['Portal web corporativo', 'Integración de analítica'] },
    { title: 'Completado', tag: 'LISTO', date: '14 Jun', initials: 'LT', tone: 'purple', items: ['App móvil educativa'] },
  ];

  protected readonly team = [
    { name: 'Ana García', role: 'Diseñadora UX/UI', initials: 'AG', load: 86, status: 'Ocupada', statusTone: 'busy' },
    { name: 'Luis Torres', role: 'Desarrollador frontend', initials: 'LT', load: 64, status: 'Disponible', statusTone: 'available' },
    { name: 'Sofía Ríos', role: 'Product manager', initials: 'SR', load: 72, status: 'En reunión', statusTone: 'meeting' },
    { name: 'Carlos Mendoza', role: 'Desarrollador backend', initials: 'CM', load: 48, status: 'Disponible', statusTone: 'available' },
  ];

  protected readonly reports = [
    { name: 'Reporte de rendimiento mensual', date: '16 Jun 2025', size: '2.4 MB' },
    { name: 'Análisis de usuarios activos', date: '10 Jun 2025', size: '1.8 MB' },
    { name: 'Estado general de proyectos', date: '01 Jun 2025', size: '3.1 MB' },
  ];

  protected selectSection(section: string) {
    this.activeSection.set(section);
  }

  protected sectionDescription() {
    const descriptions: Record<string, string> = {
      Analítica: 'Interpreta tus métricas y descubre oportunidades de crecimiento.',
      Proyectos: 'Organiza las tareas y controla el avance de cada iniciativa.',
      Equipo: 'Conoce la disponibilidad y el rendimiento de cada integrante.',
      Reportes: 'Crea, consulta y descarga informes para tu presentación.',
    };
    return descriptions[this.activeSection()] ?? '';
  }

  protected sectionAction() {
    const actions: Record<string, string> = {
      Analítica: '↗ Exportar datos',
      Proyectos: '＋ Nuevo proyecto',
      Equipo: '＋ Invitar miembro',
      Reportes: '＋ Generar reporte',
    };
    return actions[this.activeSection()] ?? '＋ Nueva acción';
  }

  protected changePeriod(event: Event) {
    this.selectedPeriod.set((event.target as HTMLSelectElement).value);
  }

  protected showToast() {
    this.toastVisible.set(true);
    setTimeout(() => this.toastVisible.set(false), 2500);
  }

  protected login(event: Event) {
    event.preventDefault();
    if (!this.email() || !this.password()) {
      this.loginError.set('Completa tu correo y contraseña para continuar.');
      return;
    }

    if (this.email() !== 'demo@analytica.com' || this.password() !== 'Analytica2025!') {
      this.loginError.set('Usa las credenciales de prueba mostradas debajo del formulario.');
      return;
    }

    this.loginError.set('');
    this.isAuthenticated.set(true);
  }
}
