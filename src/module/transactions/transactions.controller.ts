import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from 'src/decorator/customize';
import {
  CREATE_TRANSACTION,
  DELETE_TRANSACTION,
  GET_TRANSACTIONS,
  GET_TRANSACTION_DETAIL,
} from 'src/util/message';
import { TransactionFilterDto } from './dto/filter-transaction.dto';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @ResponseMessage(CREATE_TRANSACTION)
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Get()
  @ResponseMessage(GET_TRANSACTIONS)
  findList(@Query() query: TransactionFilterDto) {
    return this.transactionsService.findList(query);
  }

  @Get(':id')
  @ResponseMessage(GET_TRANSACTION_DETAIL)
  findOne(@Param('id') id: number) {
    return this.transactionsService.findOne(+id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateTransactionDto: UpdateTransactionDto,
  // ) {
  //   return this.transactionsService.update(+id, updateTransactionDto);
  // }

  @Delete(':id')
  @ResponseMessage(DELETE_TRANSACTION)
  remove(@Param('id') id: number) {
    return this.transactionsService.remove(+id);
  }
}
