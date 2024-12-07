import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RooftopsService } from './rooftops.service';
import { CreateRooftopDto } from './dto/create-rooftop.dto';
import { UpdateRooftopDto } from './dto/update-rooftop.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Rooftops')
@Controller('rooftops')
export class RooftopsController {
  constructor(private readonly rooftopsService: RooftopsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new rooftop' })
  @ApiResponse({ status: 201, description: 'Rooftop created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@CurrentUser() user: any, @Body() createRooftopDto: CreateRooftopDto) {
    return this.rooftopsService.create(user.id, createRooftopDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all rooftops' })
  @ApiQuery({ name: 'city', required: false })
  @ApiQuery({ name: 'capacity', required: false })
  @ApiResponse({ status: 200, description: 'Returns list of rooftops' })
  findAll(
    @Query('city') city?: string,
    @Query('capacity') capacity?: number,
  ) {
    return this.rooftopsService.findAll(city, capacity);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a rooftop by ID' })
  @ApiResponse({ status: 200, description: 'Returns the rooftop' })
  @ApiResponse({ status: 404, description: 'Rooftop not found' })
  findOne(@Param('id') id: string) {
    return this.rooftopsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a rooftop' })
  @ApiResponse({ status: 200, description: 'Rooftop updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Rooftop not found' })
  update(
    @Param('id') id: string,
    @CurrentUser() user: any,
    @Body() updateRooftopDto: UpdateRooftopDto,
  ) {
    return this.rooftopsService.update(id, user.id, updateRooftopDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a rooftop' })
  @ApiResponse({ status: 204, description: 'Rooftop deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Rooftop not found' })
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.rooftopsService.remove(id, user.id);
  }
} 