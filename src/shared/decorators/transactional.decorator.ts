import { DataSource, EntityManager, Repository } from 'typeorm';

export function Transactional() {
  return function (
    _target: any,
    _propertyKey: string,
    descriptor: TypedPropertyDescriptor<(...args: any[]) => Promise<any>>,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const dataSource: DataSource = Object.values(this).find(
        (prop) => prop instanceof Repository,
      )?.manager.connection;

      if (!dataSource) throw new Error('DataSource not found');

      return dataSource.transaction(async (entityManager: EntityManager) => {
        Object.keys(this).forEach((key) => {
          if (this[key] instanceof Repository) {
            this[key] = entityManager.getRepository(this[key].target);
          }
        });

        return originalMethod!.apply(this, args);
      });
    };

    return descriptor;
  };
}
