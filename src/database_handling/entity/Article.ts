import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";


@Entity("article")
export class Article {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 255})
    title: string;

    @Column({type: "text", nullable: true})
    description: string;

    @Column({type: "text"})
    content: string;

    @ManyToOne(() => User, user => user.articles)
    @JoinColumn({name: "user_id"})
    user: User;
}