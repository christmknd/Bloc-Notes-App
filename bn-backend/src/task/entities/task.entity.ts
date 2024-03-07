import {Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({ name: 'Task' })
export class Task {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;
}
