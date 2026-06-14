# UpdateUserSettingsRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**email_notifications** | **boolean** |  | [default to undefined]
**sms_notifications** | **boolean** |  | [default to undefined]
**marketing_emails** | **boolean** |  | [default to undefined]
**auto_apply_enabled** | **boolean** |  | [default to undefined]
**skill_match_threshold** | **number** |  | [default to undefined]
**preferred_locations** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**preferred_job_types** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**theme** | **string** |  | [optional] [default to 'system']

## Example

```typescript
import { UpdateUserSettingsRequest } from './api';

const instance: UpdateUserSettingsRequest = {
    email_notifications,
    sms_notifications,
    marketing_emails,
    auto_apply_enabled,
    skill_match_threshold,
    preferred_locations,
    preferred_job_types,
    theme,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
