export class Usuario {
  id: number;
  email: string;
  pass: string;
  verified: boolean;
  verification_token: string;
  movil: number;
  fecha_registro: string;
  nombre: string;
  apellidos: string;
  foto: string;
  cod_rank: number;
  roles: string[] = [];
}
