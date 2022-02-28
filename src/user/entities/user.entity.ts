import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, length: 256 })
  first_name: string;

  @Column({ nullable: false, length: 256 })
  last_name: string;

  @Column({ nullable: false, unique: true, length: 256 })
  email: string;

  @Column({ unique: true, length: 14 })
  phone_number: string;

  @Column({ length: 512 })
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  last_login: Date;

  @BeforeUpdate()
  async hashPassword() {
    return (
      this.password &&
      (await new Promise(async (res, rej) => {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, salt);
        if (hash) return res(hash);
        return rej(hash);
      }))
    );
  }
}
