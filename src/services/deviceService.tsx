import api from './api';

export interface EntityId {
  entityType: string;
  id: string;
}

export interface DeviceData {
  configuration: {
    type: string;
  };
  transportConfiguration: {
    type: string;
  };
}

export interface Device {
  id: EntityId;
  createdTime: number;
  tenantId: EntityId;
  customerId: EntityId;
  name: string;
  type: string;
  label: string | null;
  deviceProfileId: EntityId;
  firmwareId: EntityId | null;
  softwareId: EntityId | null;
  attributes: Record<string, unknown> | null;
  telemetry: unknown | null;
  externalId: string | null;
  version: number;
  deviceData: DeviceData;
  additionalInfo: Record<string, unknown> | null;
}

export interface DevicePageData {
  data: Device[];
  totalPages: number;
  totalElements: number;
  hasNext: boolean;
}

export interface GetDevicesParams {
  pageSize?: number;
  page?: number;
  sortProperty?: string;
  sortOrder?: 'ASC' | 'DESC';
  buildingId?: string;
}

export const deviceService = {
  async getDevices(
    token: string,
    params: GetDevicesParams = {},
  ): Promise<{
    success: boolean;
    data?: DevicePageData;
    error?: string;
  }> {
    const {
      pageSize = 100,
      page = 0,
      sortProperty,
      sortOrder,
      buildingId,
    } = params;

    const queryParams = new URLSearchParams({
      pageSize: pageSize.toString(),
      page: page.toString(),
    });

    if (sortProperty) {
      queryParams.append('sortProperty', sortProperty);
    }

    if (sortOrder) {
      queryParams.append('sortOrder', sortOrder);
    }

    if (buildingId) {
      queryParams.append('buildingId', buildingId);
    }

    const response = await api.get<DevicePageData>(
      `/api/tenant/devices?${queryParams.toString()}`,
      token,
    );

    if (response.error) {
      return { success: false, error: response.error };
    }

    return { success: true, data: response.data };
  },

  async getDeviceById(
    token: string,
    deviceId: string,
  ): Promise<{
    success: boolean;
    data?: Device;
    error?: string;
  }> {
    const response = await api.get<Device>(`/api/device/${deviceId}`, token);

    if (response.error) {
      return { success: false, error: response.error };
    }

    return { success: true, data: response.data };
  },
};

export default deviceService;