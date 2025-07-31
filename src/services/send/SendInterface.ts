import {AppointmentModel}  from './models/AppointmentModel';

export default interface SendInterface {
  sendMessage(AppointmentModel : AppointmentModel ): void;
}