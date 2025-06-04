import { Plan } from "@/src/context/plans/schemas/plan.schema";
import { Client } from "../../clients/schemas/client.schema";
import { Schedule } from "../../schedules/schemas/schedule.schema";

import { CreatePlanDto } from "../dto/create-plan.dto";
import { UpdatePlanDto } from "../dto/update-plan.dto";

export const PLAN_REPOSITORY = "PlanRepository";

export interface PlanRepository {
  createPlan(plan: CreatePlanDto): Promise<Plan>;
  getPlans(
    offset: number,
    limit: number,
    filters: { name?: string; type?: string },
  ): Promise<Plan[]>;
  countPlans(filters: { name?: string; type?: string }): Promise<number>;
  findOne(id: string): Promise<Plan | null>;
  update(id: string, plan: UpdatePlanDto): Promise<Plan | null>;
  remove(id: string): Promise<boolean>;
  getClientsWithPlansAndSchedules(
    offset: number,
    limit: number,
  ): Promise<Plan[]>;
  findAssignableClientsBasedOnPlan(planId: string): Promise<Plan[]>;

  // Métodos para eliminar dependencias circulares
  findClientsByPlanId(planId: string): Promise<Client[]>;
  assignPlanToClient(clientId: string, planId: string): Promise<Client | null>;
  findAllClients(
    page?: number,
    limit?: number,
    filters?: any,
  ): Promise<{ data: Client[]; total: number; page: number; limit: number }>;
  getAllSchedules(): Promise<Schedule[]>;
  findClientById(clientId: string): Promise<Client | null>;
  updateClientRoutine(
    clientId: string,
    routineId: string,
  ): Promise<Client | null>;
  
  // Método seguro para SuperAdmin: obtiene planes por organizationId directamente
  getPlansByOrganizationId(organizationId: string): Promise<Plan[]>;
}
