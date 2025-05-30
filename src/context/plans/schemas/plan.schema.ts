import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

import {
  ExperienceLevel,
  InjuryType,
  PlanGoal,
  Tags,
} from "@/src/context/shared/enums/plan.enum";
import { TenantBaseEntity } from "@/src/context/shared/entities/tenant-base.entity";

@Schema({ timestamps: true })
export class Plan extends TenantBaseEntity {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  type!: string;

  @Prop({ required: true, enum: Object.values(PlanGoal) })
  goal!: string;

  @Prop({ required: true, enum: Object.values(ExperienceLevel) })
  experienceLevel!: string;

  @Prop({ required: false, enum: Object.values(InjuryType), default: null })
  injuryType?: string;

  @Prop({ required: false })
  minAge?: number;

  @Prop({ required: false })
  maxAge?: number;

  @Prop({ default: false })
  includesCoach!: boolean;

  @Prop({ type: [String], enum: Object.values(Tags), default: [] })
  tags!: string[];

  @Prop({ type: Types.ObjectId, ref: "Routine", required: true })
  defaultRoutine!: Types.ObjectId;

  @Prop({ required: true })
  days!: number;
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
PlanSchema.index({ organizationId: 1, name: 1 }, { unique: true });
export type PlanDocument = Plan & Document;
