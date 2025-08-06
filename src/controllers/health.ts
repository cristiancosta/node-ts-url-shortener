import { DataSource } from 'typeorm';
import { Request, Response } from 'express';

// Types.
import { HealthController, GetHealthInfoResponse } from '../types/health';

export const healthController = (dataSource: DataSource): HealthController => {
  const getHealthInfo = async (req: Request, res: Response): Promise<void> => {
    const result: GetHealthInfoResponse = {
      status: 'healthy',
      dependencies: {
        database: {
          status: 'connected'
        }
      }
    };
    try {
      await dataSource.query('select version()');
    } catch (error) {
      result.dependencies = {
        database: {
          status: 'not-connected',
          reason: JSON.stringify(error)
        }
      };
    }
    res.send(result);
  };

  return {
    getHealthInfo
  };
};
