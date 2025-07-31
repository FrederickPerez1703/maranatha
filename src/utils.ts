export function splitFullName (fullName: string): {firstName: string, lastName: string }  {
  const parts = fullName.trim().split(' ');
  const firstName = parts[0];
  const lastName = parts.slice(1).join(' ') || ''; // Soporta nombres compuestos o sin apellido
  return { firstName, lastName };
}

export function formatDate(dateStr: string, timeStr: string): string {
  const date = new Date(dateStr);
  const formattedDate = date.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = new Date(`1970-01-01T${timeStr}`).toLocaleTimeString('es-ES', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return `${formattedDate} a las ${formattedTime}`;
}