import { Store } from './store';

export interface IClientMetricsEnvKey {
    featureName: string;
    appName: string;
    environment: string;
    timestamp: Date;
}

export type ExtraData = {
    executionTime: { totalMs: number; count: number };
    errors?: number;
};

export interface IClientMetricsEnv extends IClientMetricsEnvKey {
    yes: number;
    no: number;
    variants?: Record<string, number>;
    enabledExecutionTime?: number;
    disabledExecutionTime?: number;
    enabledExecutionCount?: number;
    disabledExecutionCount?: number;
    enabledErrorCount?: number;
    disabledErrorCount?: number;
}

export interface IClientMetricsEnvVariant extends IClientMetricsEnvKey {
    variant: string;
    count: number;
}

export interface IClientMetricsStoreV2
    extends Store<IClientMetricsEnv, IClientMetricsEnvKey> {
    batchInsertMetrics(metrics: IClientMetricsEnv[]): Promise<void>;
    getMetricsForFeatureToggle(
        featureName: string,
        hoursBack?: number,
    ): Promise<IClientMetricsEnv[]>;
    getSeenAppsForFeatureToggle(
        featureName: string,
        hoursBack?: number,
    ): Promise<string[]>;
    getSeenTogglesForApp(
        appName: string,
        hoursBack?: number,
    ): Promise<string[]>;
    clearMetrics(hoursAgo: number): Promise<void>;
}
