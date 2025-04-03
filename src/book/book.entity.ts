import { BaseEntity } from 'src/shared/entitites';
import { Entity, Column } from 'typeorm';

@Entity('books')
export class Book extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;
}
