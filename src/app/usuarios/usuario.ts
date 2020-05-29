export class Usuario {
  id: number;
  email: string;
  direccion: string;
  pass: string;
  verified: boolean;
  verificationToken: string;
  userAdmin: boolean;
  movil: number;
  fechaRegistro: string;
  nombre: string;
  apellidos: string;
  foto: string;
  codRank: number;
  roles: string[] = [];
}
