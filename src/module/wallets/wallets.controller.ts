import { Controller, Get, Body, Param, Put, Query } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { ApiTags } from '@nestjs/swagger';
import { WalletFilterDto } from './dto/filter-wallet.dto';
import { ResponseMessage } from 'src/decorator/customize';
import { GET_WALLET_DETAIL, UPDATE_WALLET } from 'src/util/message';

@ApiTags('wallets')
@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  // @Post()
  // create(@Body() createWalletDto: CreateWalletDto) {
  //   return this.walletsService.create(createWalletDto);
  // }

  // @Get()
  // findList() {
  //   return this.walletsService.findList();
  // }

  @Get()
  @ResponseMessage(GET_WALLET_DETAIL)
  findOne(@Query() query: WalletFilterDto) {
    return this.walletsService.findOne(query);
  }

  // @Put(':id')
  // @ResponseMessage(UPDATE_WALLET)
  // update(@Param('id') id: number, @Body() updateWalletDto: UpdateWalletDto) {
  //   return this.walletsService.update(+id, updateWalletDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.walletsService.remove(+id);
  // }
}
