import { Module, ValidationPipe } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentService } from "./comment.service";
import { CommnetController } from "./http/controller/comment.controller";
import { UserComment } from "./entities/comment.entity";
import { APP_PIPE } from "@nestjs/core";



@Module({
    imports:[ConfigModule,
    TypeOrmModule.forFeature([UserComment])],
    providers: [CommentService,
       
    ],
    controllers:[CommnetController]
})
export class CommentModule{}