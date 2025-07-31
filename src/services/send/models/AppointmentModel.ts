export interface Service {
  name: string;
  price: string;
}

export interface AppointmentModel {
  name: string;
  email: string;
  phone: string;
  service: Service;
  date: string;
  time: string;
}


const AppointmentModel  = {
  name: '',
  email: '',
  phone: '',
  service: {
    name: '',
    price: ''
  },
  date: '',
  time: ''
};

export default AppointmentModel ;
