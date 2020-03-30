export class Perfil {
  constructor(
    private user: string,
    private pass: string,
    private nombre: string,
    private apellidos: string,
    private movil: number,
    private bono: number,
    private facebook: string,
    private instagram: string,
    private twitter: string,
    private mensajes: []
  ){}
}
