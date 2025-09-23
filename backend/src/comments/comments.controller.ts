import { Controller, Post, Get, Body, Param, UseGuards, Req } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('recipes/:recipeId/comments')
export class CommentsController {
  constructor(private svc: CommentsService) {}

  @UseGuards(AuthGuard)
  @Post()
  addComment(@Req() req, @Param('recipeId') recipeId: string, @Body() body: { text: string }) {
    return this.svc.addComment(recipeId, req.userId, body.text);
  }

  @Get()
  getComments(@Param('recipeId') recipeId: string) {
    return this.svc.getComments(recipeId);
  }
}
