import { PickType } from '@nestjs/swagger';

export class CreateProfesorDto {
  nombre: string;
  edad: string;
  dia: string[];
  horario: string[];
  email: string;
  password: string;
  // estado?: boolean;
}
