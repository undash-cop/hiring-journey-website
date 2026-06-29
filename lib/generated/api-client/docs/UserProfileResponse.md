# UserProfileResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**keycloak_sub** | **string** |  | [default to undefined]
**email** | **string** |  | [optional] [default to undefined]
**username** | **string** |  | [optional] [default to undefined]
**full_name** | **string** |  | [optional] [default to undefined]
**headline** | **string** |  | [optional] [default to undefined]
**updated_at** | **string** |  | [default to undefined]
**applications_count** | **number** |  | [optional] [default to 0]
**interviews_count** | **number** |  | [optional] [default to 0]
**credits_remaining** | **number** |  | [optional] [default to 0]

## Example

```typescript
import { UserProfileResponse } from './api';

const instance: UserProfileResponse = {
    keycloak_sub,
    email,
    username,
    full_name,
    headline,
    updated_at,
    applications_count,
    interviews_count,
    credits_remaining,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
