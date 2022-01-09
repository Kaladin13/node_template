import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Article} from "./Article";


@Entity("user")
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 255, unique: true})
    login: string;

    @Column({type: "varchar", length: 255})
    password: string;

    @OneToMany(() => Article, article => article.user)
    articles: Article[];
}