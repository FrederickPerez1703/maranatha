import { Appointment } from '../../utils/types';

export default interface SendInterface {
  sendMessage(AppointmentModel: Appointment): void;
  sendDeletionRequestMessage(request: {
    invoiceId: string;
    requestedBy: string;
    reason: string;
    amount: number;
    clientName: string;
  }): void;
}