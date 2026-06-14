# JobItem


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** |  | [default to undefined]
**title** | **string** |  | [default to undefined]
**description** | **string** |  | [optional] [default to '']
**location** | **string** |  | [default to undefined]
**remote** | **boolean** |  | [default to undefined]
**skills** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**salary_range** | **{ [key: string]: number; }** |  | [optional] [default to undefined]
**employment_type** | **string** |  | [default to undefined]
**status** | **string** |  | [default to undefined]
**source** | **string** |  | [default to undefined]
**created_at** | **string** |  | [default to undefined]

## Example

```typescript
import { JobItem } from './api';

const instance: JobItem = {
    id,
    title,
    description,
    location,
    remote,
    skills,
    salary_range,
    employment_type,
    status,
    source,
    created_at,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
