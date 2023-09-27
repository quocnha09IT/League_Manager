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
  @ApiResponse({
    status: 201,
    description: 'save....'
  })
  @ApiResponse({
    status: 403,
    description: 'Fobiden....'
  })
PostComment(@Body() createComment: CreateCommentDto, @Param('id') idMatch: number):Promise<CreateCommentDto>{
        return this.commentService.PostComment(createComment,idMatch);
    }
}