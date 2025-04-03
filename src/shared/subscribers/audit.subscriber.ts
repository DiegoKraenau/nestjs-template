import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { AuthenticatedRequest } from 'src/domain';
import { BaseEntity } from '../entitites';

@EventSubscriber()
export class AuditSubscriber implements EntitySubscriberInterface<BaseEntity> {
  constructor(
    @Inject(REQUEST) private readonly request: AuthenticatedRequest,
  ) {}

  private getCurrentUser(): string {
    return this.request?.user?.username || 'system-user';
  }

  beforeInsert(event: InsertEvent<BaseEntity>) {
    event.entity.createdBy = this.getCurrentUser();
  }

  beforeUpdate(event: UpdateEvent<BaseEntity>) {
    event.entity.updatedBy = this.getCurrentUser();
  }
}
