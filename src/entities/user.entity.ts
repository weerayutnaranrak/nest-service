import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  test: string;
}
export default UserEntity;
