# AdminStatsResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**total_candidates** | **number** |  | [default to undefined]
**active_jobs** | **number** |  | [default to undefined]
**applications** | **number** |  | [default to undefined]
**credit_usage** | **number** |  | [default to undefined]
**funnel** | **{ [key: string]: number; }** |  | [default to undefined]
**job_performance** | [**Array&lt;JobPerformanceItem&gt;**](JobPerformanceItem.md) |  | [default to undefined]

## Example

```typescript
import { AdminStatsResponse } from './api';

const instance: AdminStatsResponse = {
    total_candidates,
    active_jobs,
    applications,
    credit_usage,
    funnel,
    job_performance,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
