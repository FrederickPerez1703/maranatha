import {Appointment}  from '../../utils/types';

export default interface SendInterface {
  sendMessage(AppointmentModel : Appointment ): void;
}