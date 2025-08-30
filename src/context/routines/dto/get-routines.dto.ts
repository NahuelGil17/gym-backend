import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform, Type } from "class-transformer";
import { IsBoolean, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class GetRoutinesDto {
	@ApiProperty({ description: "Número de página", example: 1 })
	@Type(() => Number)
	@IsNumber()
	@Min(1)
	page = 1;

	@ApiProperty({ description: "Cantidad de rutinas por página", example: 5 })
	@Type(() => Number)
	@IsNumber()
	@Min(1)
	limit = 5;

	@Expose()
	@ApiProperty({ description: "Name filter", example: "Routine 1" })
	@IsString()
	@IsOptional()
	name?: string;

	@Expose()
	@ApiProperty({ description: "Type filter", example: "Sala" })
	@IsString()
	@IsOptional()
	type?: string;

	@Expose()
	@Transform(({ value }) => {
		if (value === 'true') return true;
		if (value === 'false') return false;
		return value;
	})
	@IsOptional()
	@IsBoolean()
	@ApiProperty({ description: "Es general", example: false })
	isGeneral?: boolean;

	@Expose()
	@Transform(({ value }) => {
		if (value === 'true') return true;
		if (value === 'false') return false;
		return value;
	})
	@IsOptional()
	@IsBoolean()
	@ApiProperty({ description: "Mostrar en pantalla", example: false })
	showOnScreen?: boolean;

	@Expose()
	@ApiProperty({ description: "Mode filter", example: "Cardio" })
	@IsString()
	@IsOptional()
	mode?: string;
}
