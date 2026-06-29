# AutoApplyProfileWriteRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **string** |  | [default to undefined]
**is_active** | **boolean** |  | [optional] [default to true]
**min_salary** | **number** |  | [default to undefined]
**locations** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**job_types** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**required_skills** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**skill_match_threshold** | **number** |  | [optional] [default to 70]
**job_boards** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**exclude_companies** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**exclude_keywords** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**resume_version** | **string** |  | [optional] [default to undefined]
**daily_apply_limit** | **number** |  | [optional] [default to 50]
**apply_schedule** | **string** |  | [optional] [default to 'daily']

## Example

```typescript
import { AutoApplyProfileWriteRequest } from './api';

const instance: AutoApplyProfileWriteRequest = {
    name,
    is_active,
    min_salary,
    locations,
    job_types,
    required_skills,
    skill_match_threshold,
    job_boards,
    exclude_companies,
    exclude_keywords,
    resume_version,
    daily_apply_limit,
    apply_schedule,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
