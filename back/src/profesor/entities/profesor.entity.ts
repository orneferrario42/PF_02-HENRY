import { Role } from 'src/enum/roles.enum';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
@Entity({ name: 'profesor' })
export class Profesor {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', length: 50, nullable: false })
  nombre: string;

  @Column({ type: 'varchar' })
  edad: string;

  @Column({ type: 'varchar' })
  dia: string[];

  @Column({ type: 'varchar' })
  horario: string[];

  @Column({ type: 'varchar', length: 60, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 72, nullable: true })
  password: string;

  @Column({ default: Role.Profesor })
  role: Role;

  @Column({ type: 'boolean', default: true })
  estado: boolean;

  @OneToOne(() => User, (user) => user.rutina)
  rutina: User;

  @OneToMany(() => User, (user) => user.profesor)
  @JoinColumn({ name: 'id_users' })
  users: User[];
}
