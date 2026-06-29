# PublishJobRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**title** | **string** |  | [default to undefined]
**description** | **string** |  | [default to undefined]
**skills** | **Array&lt;string&gt;** |  | [default to undefined]
**location** | **string** |  | [default to undefined]
**salary_range** | **{ [key: string]: number; }** |  | [default to undefined]
**employment_type** | **string** |  | [default to undefined]
**publish_to** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**status** | **string** |  | [optional] [default to StatusEnum_Published]

## Example

```typescript
import { PublishJobRequest } from './api';

const instance: PublishJobRequest = {
    title,
    description,
    skills,
    location,
    salary_range,
    employment_type,
    publish_to,
    status,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
