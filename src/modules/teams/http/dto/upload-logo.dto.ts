import { ApiProperty } from "@nestjs/swagger";

export class UploadLogoTeam{
    @ApiProperty({ type: 'string', format: 'binary', required: true })
    logoTeam: Express.Multer.File
}