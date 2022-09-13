import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('todos')
class TodoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  test: string;
}
export default TodoEntity;
