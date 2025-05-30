import { InjectModel } from "@nestjs/mongoose";
import { Model, UpdateWriteOpResult } from "mongoose";

import { CreateScheduleDto } from "@/src/context/schedules/dto/create-schedule.dto";
import { TenantContextService } from "@/src/context/shared/services/tenant-context.service";

import { Schedule, ScheduleDocument } from "../schemas/schedule.schema";
import { ScheduleRepository } from "./schedule.repository";
export const SCHEDULE_REPOSITORY = "ScheduleRepository";

export class MongoScheduleRepository implements ScheduleRepository {
  constructor(
    @InjectModel(Schedule.name) private scheduleModel: Model<ScheduleDocument>,
    private readonly tenantContext: TenantContextService,
  ) {}

  private addTenantFilter<K>(filter: any = {}): any {
    return {
      ...filter,
      organizationId: this.tenantContext.getOrganizationId(),
    };
  }

  async findById(id: string): Promise<Schedule | null> {
    return this.scheduleModel.findOne(this.addTenantFilter({ _id: id })).exec();
  }

  async updateSchedule(id: string, updateData: any): Promise<Schedule | null> {
    return this.scheduleModel
      .findOneAndUpdate(this.addTenantFilter({ _id: id }), updateData, {
        new: true,
      })
      .exec();
  }

  async createSchedule(schedule: CreateScheduleDto): Promise<Schedule> {
    const tenantData = {
      ...schedule,
      organizationId: this.tenantContext.getOrganizationId(),
    };
    const newSchedule = new this.scheduleModel(tenantData);
    return newSchedule.save();
  }

  async deleteSchedule(id: string): Promise<void> {
    await this.scheduleModel
      .deleteOne(this.addTenantFilter({ _id: id }))
      .exec();
  }

  async getSchedules(): Promise<Schedule[]> {
    return await this.scheduleModel.find(this.addTenantFilter()).exec();
  }

  async countSchedules(filters: any): Promise<number> {
    return await this.scheduleModel
      .countDocuments(this.addTenantFilter(filters))
      .exec();
  }

  async deleteAllClientSchedules(
    clientId: string,
  ): Promise<UpdateWriteOpResult> {
    return await this.scheduleModel
      .updateMany(this.addTenantFilter({ clients: clientId }), {
        $pull: { clients: clientId },
      })
      .exec();
  }

  async assignClientToSchedule(
    scheduleId: string,
    clientId: { clients: string[] },
  ) {
    return this.scheduleModel
      .findOneAndUpdate(
        this.addTenantFilter({ _id: scheduleId }),
        { $push: { clients: { $each: clientId.clients } } },
        { new: true },
      )
      .exec();
  }
  deleteClientFromSchedule(scheduleId: string, clientId: string): Promise<any> {
    return this.scheduleModel
      .findOneAndUpdate(
        this.addTenantFilter({ _id: scheduleId }),
        { $pull: { clients: clientId } },
        { new: true },
      )
      .exec();
  }

  updateScheduleConfig(schedule: string): Promise<any> {
    return this.scheduleModel
      .findOneAndUpdate(this.addTenantFilter({ _id: schedule }), {
        $set: { config: schedule },
      })
      .exec();
  }

  async getSchedulesByUserId(userId: string): Promise<Schedule[]> {
    return this.scheduleModel
      .find(this.addTenantFilter({ clients: userId }))
      .exec();
  }
}
