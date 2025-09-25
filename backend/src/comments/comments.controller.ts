import { Controller, Post, Get, Body, Param, Req } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post(':recipeId')
  async addComment(
    @Param('recipeId') recipeId: string,
    @Req() req: any,
    @Body() body: { text: string },
  ) {
    return this.commentsService.addComment(recipeId, req.userId, body.text);
  }

  @Get(':recipeId')
  async getComments(@Param('recipeId') recipeId: string) {
    return this.commentsService.getComments(recipeId);
  }
}