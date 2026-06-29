# UpdateJobRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**title** | **string** |  | [default to undefined]
**description** | **string** |  | [default to undefined]
**skills** | **Array&lt;string&gt;** |  | [default to undefined]
**location** | **string** |  | [default to undefined]
**salary_range** | **{ [key: string]: number; }** |  | [default to undefined]
**employment_type** | **string** |  | [default to undefined]
**status** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { UpdateJobRequest } from './api';

const instance: UpdateJobRequest = {
    title,
    description,
    skills,
    location,
    salary_range,
    employment_type,
    status,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
