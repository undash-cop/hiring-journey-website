# CheckoutResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**checkout_session_id** | **number** |  | [default to undefined]
**invoice_id** | **number** |  | [default to undefined]
**order_id** | **string** |  | [optional] [default to undefined]
**amount** | **number** |  | [default to undefined]
**currency** | **string** |  | [default to undefined]
**plan_id** | **number** |  | [default to undefined]
**plan_name** | **string** |  | [optional] [default to undefined]
**billing_cycle** | **string** |  | [default to undefined]
**key_id** | **string** |  | [optional] [default to undefined]
**mock** | **boolean** |  | [optional] [default to false]
**free** | **boolean** |  | [optional] [default to false]
**subscription** | **{ [key: string]: any; }** |  | [optional] [default to undefined]

## Example

```typescript
import { CheckoutResponse } from './api';

const instance: CheckoutResponse = {
    checkout_session_id,
    invoice_id,
    order_id,
    amount,
    currency,
    plan_id,
    plan_name,
    billing_cycle,
    key_id,
    mock,
    free,
    subscription,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
