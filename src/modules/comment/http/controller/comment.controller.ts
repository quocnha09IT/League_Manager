import { Body, Controller, Param, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CommentService } from "../../comment.service";
import { CreateCommentDto } from "../../dto/create-comment.dto";

@Controller('comment')
@ApiTags('User Comment')
export class CommnetController{
  constructor( private commentService: CommentService){}
//   @ApiBearerAuth('Bearer')
//   @Roles( Role.MANAGE_LEAGUE)
  @Post()
  @ApiOperation({summary: 'create new comment'})
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        comment:{
          type: 'string',
          example: 'This match is so good',
          description: 'this is the comment of user',
        },

      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'save....'
  })
  @ApiResponse({
    status: 403,
    description: 'Fobiden....'
  })
PostComment(@Body() createComment: CreateCommentDto){
        return this.commentService.PostComment(createComment);
    }
}