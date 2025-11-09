import  SendInterface  from './SendInterface';
import { Appointment} from '../../utils/types';
import {splitFullName , formatDate} from '../../utils/date';

const PHONE_NUMBER = import.meta.env.VITE_WHATSAPP_PHONE;
const URL = import.meta.env.VITE_API_URL;

export default class SendService implements SendInterface {

  /**
   * Envia un mensaje de WhatsApp con los detalles de la cita.
   * @param appointmentModel - Modelo de cita que contiene los detalles del cliente y el servicio.
   */
  sendMessage(Appointment: Appointment ): void {
   const message = `
       ✅*¡Cita Agendada!*
           Hemos recibido tu solicitud de cita para *${Appointment.service.name}* (${Appointment.service.price})
       🗓️ *Fecha:* ${formatDate(Appointment.date, Appointment.time)}
       👤 *Cliente:* ${splitFullName(Appointment.name)}
       📧 *Email:*  ${Appointment.email}
       📞 *Teléfono:* ${Appointment.phone}
       Te contactaremos pronto para confirmar tu cita.`.trim();
   
    const url = `${URL}/send?phone=${PHONE_NUMBER}}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }
}
