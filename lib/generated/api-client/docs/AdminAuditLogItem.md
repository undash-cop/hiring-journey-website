# AdminAuditLogItem


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** |  | [default to undefined]
**actor_sub** | **string** |  | [default to undefined]
**action** | **string** |  | [default to undefined]
**resource_type** | **string** |  | [default to undefined]
**resource_id** | **string** |  | [default to undefined]
**old_value** | **string** |  | [optional] [default to undefined]
**new_value** | **string** |  | [optional] [default to undefined]
**created_at** | **string** |  | [default to undefined]

## Example

```typescript
import { AdminAuditLogItem } from './api';

const instance: AdminAuditLogItem = {
    id,
    actor_sub,
    action,
    resource_type,
    resource_id,
    old_value,
    new_value,
    created_at,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
