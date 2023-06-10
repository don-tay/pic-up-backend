import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class ImageMetadata {
  height: number;
  width: number;
  compressed: boolean;
}

@Entity()
export class Image {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
  })
  id: number;

  @Column()
  url: string;

  @Column()
  name: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata: ImageMetadata | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;
}
