import api from './api';

export interface AssetId {
  id: string;
  entityType: string;
}

export interface Asset {
  id: AssetId;
  createdTime: number;
  name: string;
  type: string;
  label?: string;
  tenantId?: AssetId;
  customerId?: AssetId;
  assetProfileId?: AssetId;
  additionalInfo?: Record<string, unknown>;
}

export interface FilteredAsset {
  id: string;
  parentRelationId: string | null;
  name: string;
  profile: string;
  label: string;
  attributes: Record<string, unknown>;
  telemetry: unknown;
  children: unknown;
}

export interface AssetPageData {
  data: Asset[];
  totalPages: number;
  totalElements: number;
  hasNext: boolean;
}

export interface GetAssetsParams {
  pageSize?: number;
  page?: number;
  profileName?: string;
  sortProperty?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export const assetService = {
  async getAssets(
    token: string,
    params: GetAssetsParams = {},
  ): Promise<{
    success: boolean;
    data?: AssetPageData;
    error?: string;
  }> {
    const {
      pageSize = 100,
      page = 0,
      profileName = 'FACILITY',
      sortProperty = 'createdTime',
      sortOrder = 'DESC',
    } = params;

    const queryParams = new URLSearchParams({
      pageSize: pageSize.toString(),
      page: page.toString(),
      profileName,
      sortProperty,
      sortOder: sortOrder,
    }).toString();

    const response = await api.get<AssetPageData>(
      `/api/assets/info?${queryParams}`,
      token,
    );

    if (response.error) {
      return { success: false, error: response.error };
    }

    return { success: true, data: response.data };
  },

  async getAssetById(
    token: string,
    assetId: string,
  ): Promise<{
    success: boolean;
    data?: Asset;
    error?: string;
  }> {
    const response = await api.get<Asset>(`/api/asset/${assetId}`, token);

    if (response.error) {
      return { success: false, error: response.error };
    }

    return { success: true, data: response.data };
  },

  async getFilteredAssets(
    token: string,
    params: {
      rootProfile: string;
      assetId: string;
      profileName: string;
      type?: string;
    },
  ): Promise<{
    success: boolean;
    data?: FilteredAsset[];
    error?: string;
  }> {
    const { rootProfile, assetId, profileName, type = 'ASSET' } = params;

    const queryParams = new URLSearchParams({
      rootProfile,
      assetId,
      profileName,
      type,
    }).toString();

    const response = await api.get<FilteredAsset[]>(
      `/api/assets/filter?${queryParams}`,
      token,
    );

    if (response.error) {
      return { success: false, error: response.error };
    }

    return { success: true, data: response.data };
  },

  async getDetailRelation(
    token: string,
    params: {
      rootProfile: string;
      assetId: string;
    },
  ): Promise<{
    success: boolean;
    data?: FilteredAsset[];
    error?: string;
  }> {
    const { rootProfile, assetId } = params;

    const queryParams = new URLSearchParams({
      rootProfile,
      assetId,
    }).toString();

    const response = await api.get<FilteredAsset[]>(
      `/api/assets/detail-relation?${queryParams}`,
      token,
    );

    if (response.error) {
      return { success: false, error: response.error };
    }

    return { success: true, data: response.data };
  },
};

export default assetService;