import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('bookmarks')
@Controller('bookmarks')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @Post()
  @ApiOperation({ summary: 'Add a rooftop to user\'s bookmarks' })
  @ApiResponse({ status: 201, description: 'The rooftop has been successfully bookmarked.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Rooftop not found.' })
  @ApiResponse({ status: 409, description: 'Rooftop already bookmarked.' })
  create(@Request() req, @Body() createBookmarkDto: CreateBookmarkDto) {
    return this.bookmarksService.create(req.user.id, createBookmarkDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all bookmarked rooftops for the current user' })
  @ApiResponse({ status: 200, description: 'Return all bookmarks for the current user.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findAll(@Request() req) {
    return this.bookmarksService.findAll(req.user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a bookmark by ID' })
  @ApiResponse({ status: 200, description: 'The bookmark has been successfully removed.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Bookmark not found.' })
  remove(@Request() req, @Param('id') id: string) {
    return this.bookmarksService.remove(req.user.id, id);
  }

  @Delete('rooftop/:rooftopId')
  @ApiOperation({ summary: 'Remove a bookmark by rooftop ID' })
  @ApiResponse({ status: 200, description: 'The bookmark has been successfully removed.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Bookmark not found.' })
  removeByRooftopId(@Request() req, @Param('rooftopId') rooftopId: string) {
    return this.bookmarksService.removeByRooftopId(req.user.id, rooftopId);
  }
} 