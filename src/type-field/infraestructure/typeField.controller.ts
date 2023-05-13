import { Controller, Get} from '@nestjs/common';
import { TypeFieldService } from './typeField.service';

@Controller('/typeField')
export class TypeFieldController {
  constructor(private readonly typeFieldService: TypeFieldService) {}

  @Get()
  async getTypesFields(): Promise <any> {
    return await this.typeFieldService.getTypesFields();
  }
}