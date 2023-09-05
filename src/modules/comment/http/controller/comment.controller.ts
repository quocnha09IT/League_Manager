import { Body, Controller, Param, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CommentService } from "../../comment.service";
import { CreateCommentDto } from "../../dto/create-comment.dto";

@Controller('comment')
@ApiTags('User Comment')
export class CommnetController{
  constructor( private commentService: CommentService){}
//   @ApiBearerAuth('Bearer')
//   @Roles( Role.MANAGE_LEAGUE)
  @Post(':id')
  @ApiOperation({summary: 'create new comment'})
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'enter unique id of Shedule Match',
    required: true
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        comment:{
          type: 'string',
          example: 'This match is so good',
          description: 'this is the comment of user',
        },
        sheduleMatchId:{
          type: 'integer',
          example: 2,
          description: 'this is the id shedule match',
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
PostComment(@Body() createComment: CreateCommentDto, @Param('id') idMatch: number){
        return this.commentService.PostComment(createComment,idMatch);
    }
}