import { Body, Controller, Param, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CommentService } from "../../comment.service";
import { CreateCommentDto } from "../../dto/create-comment.dto";
import { Roles } from "src/decorator/roles.decorator";

@Controller('comments')
@ApiTags('User Comment')
export class CommnetController{
  constructor( private commentService: CommentService){}

  
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
  async PostComment(@Body() createComment: CreateCommentDto, @Param('id') idMatch: number):Promise<CreateCommentDto>{
        return await this.commentService.PostComment(createComment,idMatch);
    }
}