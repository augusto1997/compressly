import { IsNotEmpty } from 'class-validator';

export default class ShortenDto {

  @IsNotEmpty({ message: 'is required' })
  public readonly url: string;
  constructor (url: string) {
    this.url = url;
  }

} 
