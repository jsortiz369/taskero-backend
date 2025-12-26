import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ROUTES } from 'src/app/http/routes';

@Controller(ROUTES.USERS)
export class UsersController {
  constructor() {}

  @Get()
  async findAll() {
    // Logic to find all users
  }

  @Get(':id')
  async findOne() {
    // Logic to find one user
  }

  @Get('exist/email')
  async existsByEmail() {
    // Logic to find one user
  }

  @Get('exist/phone')
  async existsByPhone() {
    // Logic to find one user
  }

  @Post()
  async create() {
    // Logic to create a new user
  }

  @Patch(':id')
  async update() {
    // Logic to update a user
  }

  @Delete(':id')
  async remove() {
    // Logic to delete a user
  }
}
