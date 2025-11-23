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
}
