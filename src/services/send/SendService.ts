import  SendInterface  from './SendInterface';
import { AppointmentModel  } from './models/AppointmentModel';
import {splitFullName, formatDate} from '../../utils';

export default class SendService implements SendInterface {

  /**
   * Envia un mensaje de WhatsApp con los detalles de la cita.
   * @param appointmentModel - Modelo de cita que contiene los detalles del cliente y el servicio.
   */
  sendMessage(appointmentModel: AppointmentModel ): void {
    const customer = splitFullName(appointmentModel.name);
    const message = `
      ✅ *¡Cita Agendada!*
      Hemos recibido tu solicitud de cita para *${appointmentModel.service.name}* (${appointmentModel.service.price}).

      🗓️ *Fecha:* ${formatDate(appointmentModel.date, appointmentModel.time)}
      👤 *Cliente:* ${customer.firstName} ${customer.lastName}
      📧 *Email:* ${appointmentModel.email}
      📞 *Teléfono:* ${appointmentModel.phone}

      Te contactaremos pronto para confirmar tu cita.
    `.trim();
    const whatsappUrl = `https://api.whatsapp.com/send?phone=2645832914&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }
}
