# UpdateResumeBuilderRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**template** | **string** |  | [optional] [default to 'modern-blue']
**sections** | **Array&lt;{ [key: string]: any; }&gt;** |  | [optional] [default to undefined]
**personal_info** | **{ [key: string]: string; }** |  | [optional] [default to undefined]
**summary** | **string** |  | [optional] [default to '']
**experience** | **Array&lt;{ [key: string]: any; }&gt;** |  | [optional] [default to undefined]
**education** | **Array&lt;{ [key: string]: any; }&gt;** |  | [optional] [default to undefined]
**skills** | **{ [key: string]: Array&lt;string&gt;; }** |  | [optional] [default to undefined]
**certifications** | **Array&lt;{ [key: string]: any; }&gt;** |  | [optional] [default to undefined]
**projects** | **Array&lt;{ [key: string]: any; }&gt;** |  | [optional] [default to undefined]

## Example

```typescript
import { UpdateResumeBuilderRequest } from './api';

const instance: UpdateResumeBuilderRequest = {
    template,
    sections,
    personal_info,
    summary,
    experience,
    education,
    skills,
    certifications,
    projects,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
