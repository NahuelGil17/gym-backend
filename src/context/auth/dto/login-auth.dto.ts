import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class LoginAuthDto {
	@ApiProperty({ example: "example-token" })
	@IsString()
	@IsNotEmpty()
	token!: string;

	@ApiProperty({ example: "recaptcha-token", required: false })
	@IsString()
	@IsOptional()
	recaptchaToken?: string;
}
