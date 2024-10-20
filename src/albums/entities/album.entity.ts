import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Album {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", nullable: false})
    title: string;

    @Column({})
    releaseDate: Date;

    @Column({type:'simple-array'})
    musics: string[];

    @Column({type:'varchar'})
    artistName: string;

    @Column({})
    url: string;
    
    /// @ typeorm join here 

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
