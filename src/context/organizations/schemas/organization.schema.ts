import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Permission } from "@/src/context/shared/enums/permissions.enum";

@Schema({ timestamps: true })
export class Organization extends Document {
  @Prop({ required: true, unique: true })
  name!: string;

  @Prop({ required: true, unique: true })
  slug!: string;

  @Prop()
  description?: string;

  @Prop()
  address?: string;

  @Prop()
  phone?: string;

  @Prop()
  email?: string;

  @Prop()
  logoUrl?: string;

  @Prop()
  primaryColor?: string;

  @Prop()
  secondaryColor?: string;

  @Prop({ default: true })
  isActive!: boolean;

  @Prop({ type: Number, default: 50 })
  maxClients?: number;

  @Prop()
  subscriptionPlan?: string;

  @Prop({ type: Date })
  subscriptionExpiresAt?: Date;

  @Prop({
    type: {
      maxClients: { type: Number, default: 100 },
      maxAdmins: { type: Number, default: 5 },
      features: [String],
    },
  })
  limits?: {
    maxClients: number;
    maxAdmins: number;
    features: string[];
  };

  @Prop({
    type: [String],
    enum: Object.values(Permission),
    default: Object.values(Permission),
  })
  permissions!: Permission[];
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
export type OrganizationDocument = Organization & Document;
