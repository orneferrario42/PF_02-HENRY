import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { Profesor } from './entities/profesor.entity';
import { User } from 'src/users/entities/user.entity';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/enum/roles.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { PutProfesorDto } from './dto/put-profesor.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuards } from 'src/auth/guards/roles.guards';
@ApiTags('PROFESOR')
@ApiBearerAuth()
@Controller('profesor')
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}

  /**
   * Este metodo le permite al administrador ver todos los profesores que tiene.
   */

  @Get('profesores')
  async getAllProfesores(): Promise<Profesor[]> {
    return await this.profesorService.getProfesores();
  }
  /**
   * Este metodo permite contar cuantos cupos disponibles hay por clase de cada profesor
   */
  @Get('cupos')
  async getCupoProfesores(@Query('id') id: string) {
    const datosJSON = [];
    const datoRecibidos = await this.profesorService.getCupoProfesores(id);
    console.log(datoRecibidos);
    for (let i = 0; i < datoRecibidos.length; i += 2) {
      const franjaHoraria = datoRecibidos[i];
      const cupo = datoRecibidos[i + 1];
      const objetoJSON = {
        horario: franjaHoraria,
        cupos: cupo,
      };
      datosJSON.push(objetoJSON);
    }
    const json = JSON.stringify(datosJSON);
    return json;
  }

  /**
   * Este metodo le permite al profesor ver los usuarios del gimnasio que estan inscriptos en su clase.
   */
  @Get('users')
  async getUsers(): Promise<User[]> {
    return await this.profesorService.getUsers();
  }
  /**
   * Este metodo permite al admin activar o desactivar profesores
   */
  @Get(':id')
  updateStatus(@Param('id') id: string) {
    return this.profesorService.updateState(id);
  }

  /**
   *  Este metodo permite al usuario  profesor ver a un usuario del gimnasio.
   */
  @Get('users/:id')
  getUsersById(@Param('id') id: string) {
    return this.profesorService.getUsersById(id);
  }

  /**
   * Este metodo le permie al administrador crear un usuario profesor.
   */
  @Post('create')
  async createProfesor(@Body() createProfesorDto: CreateProfesorDto) {
    const createdProfesor =
      await this.profesorService.create(createProfesorDto);
    return {
      message: `Se ha agregado al profesor/a ${createdProfesor.nombre} correctamente`,
      data: createdProfesor,
    };
  }

  /**
   *Este metodo le permite al usuario profesor modifica su informacion personal.
   */
  @Put(':id')
  async updateProfesor(
    id: string,
    updateProfesorDto: PutProfesorDto,
  ): Promise<Profesor> {
    return this.profesorService.updateProfesor(id, updateProfesorDto);
  }
}
