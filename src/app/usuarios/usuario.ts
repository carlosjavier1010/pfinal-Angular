import { Role } from '../models/role';
import { Cita } from '../citas/cita';


export class Usuario {
  id: number;
  email: string;
  direccion: string;
  pass: string;
  verified: boolean;
  movil: number;
  fechaRegistro: string;
  nombre: string;
  apellidos: string;
  foto: string;
  codRank: number;
  cantidad: number;
  citas: Cita[];
  roles: Role;
}
