import SendInterface from './SendInterface';
import { Appointment } from '../../utils/types';
import { formatDate } from '../../utils/date';

const PHONE_NUMBER = import.meta.env.VITE_WHATSAPP_PHONE;
const URL = import.meta.env.VITE_API_URL;

export default class SendService implements SendInterface {

  /**
   * Envia un mensaje de WhatsApp con los detalles de la cita.
   * @param appointmentModel - Modelo de cita que contiene los detalles del cliente y el servicio.
   */
  sendMessage(Appointment: Appointment): void {
    const message = `
       ✅*¡Cita Agendada!*
           Hemos recibido tu solicitud de cita para *${Appointment.service.name}* (${Appointment.service.price})
       🗓️ *Fecha:* ${formatDate(Appointment.date, Appointment.time)}
       👤 *Cliente:* ${Appointment.name}
       📧 *Email:*  ${Appointment.email}
       📞 *Teléfono:* ${Appointment.phone}
       Te contactaremos pronto para confirmar tu cita.`.trim();

    // Limpiar el número de teléfono (quitar espacios, guiones, paréntesis, +)
    const cleanPhone = PHONE_NUMBER.replace(/[\s\-\(\)\+]/g, '');

    // Detectar si es un dispositivo móvil
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Construir la URL correcta según el dispositivo
    let url;
    if (isMobile) {
      // Para móviles: wa.me/NUMERO?text=MENSAJE (sin /send)
      url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    } else {
      // Para escritorio: api.whatsapp.com/send?phone=NUMERO&text=MENSAJE
      const baseUrl = URL || 'https://api.whatsapp.com';
      url = `${baseUrl}/send?phone=${cleanPhone}&text=${encodeURIComponent(message)}`;
    }

    window.open(url, '_blank');
  }

  /**
   * Envia una notificación de solicitud de eliminación.
   * - En móviles: Usa SMS nativo.
   * - En escritorio: Usa WhatsApp Web (ya que SMS no suele funcionar).
   */
  sendDeletionRequestMessage(request: {
    invoiceId: string;
    requestedBy: string;
    reason: string;
    amount: number;
    clientName: string;
  }): void {
    const message = `
⚠️ Solicitud de Eliminación de Factura
🆔 Factura: ${request.invoiceId}
👤 Cliente: ${request.clientName}
💰 Monto: $${request.amount.toFixed(2)}
👤 Solicitado por: ${request.requestedBy}
📝 Motivo: ${request.reason}
📅 Fecha: ${new Date().toLocaleString('es-ES')}

Por favor, revisa el panel de administración.`.trim();

    const targetPhone = '8093919890';

    // Detectar si es un dispositivo móvil
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
      // En móvil usamos SMS nativo
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const separator = isIOS ? '&' : '?';
      window.location.href = `sms:${targetPhone}${separator}body=${encodeURIComponent(message)}`;
    } else {
      // En escritorio usamos WhatsApp porque SMS no funciona sin configuración especial
      // Usamos api.whatsapp.com que redirige inteligentemente
      const url = `https://api.whatsapp.com/send?phone=${targetPhone}&text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
    }
  }
}
