import { Controller, Post, Body, Patch, Param, Delete, Inject, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { AuthGuard } from 'src/auth/guards';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: ClientProxy,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.send('registerUser', createUserDto)
    .pipe(
      catchError(err => {throw new RpcException(err)})
    );
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.send('updateUser', 
      {id,
       ...updateUserDto
      }).pipe(
        catchError(err => {throw new RpcException(err)})
      );
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.send('removeUser', id)
    .pipe(
      catchError( err => {throw new RpcException(err)})
    );
  }
}
