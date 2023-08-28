import { Repository } from "typeorm";
import { UserComment } from "../entities/comment.entity";

export class CommentRepository extends Repository<UserComment>{}