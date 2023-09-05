import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CommentRepository } from "./repository/comment.repository";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UserComment } from "./entities/comment.entity";
import { DeepPartial } from "typeorm/browser";


@Injectable()
export class CommentService{
    constructor(
        @InjectRepository(UserComment)
        private commentRepository: CommentRepository,
    ){}

PostComment(createComment:CreateCommentDto,idMatch: number){
        createComment.sheduleMatchId = idMatch;
        return this.commentRepository.save(createComment );
        
    }
}