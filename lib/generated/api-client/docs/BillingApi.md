# BillingApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**confirmCheckoutSessionBillingCheckoutConfirmPost**](#confirmcheckoutsessionbillingcheckoutconfirmpost) | **POST** /billing/checkout/confirm | Confirm Checkout Session|
|[**getBillingPlansBillingPlansGet**](#getbillingplansbillingplansget) | **GET** /billing/plans | Get Billing Plans|
|[**getSubscriptionBillingSubscriptionGet**](#getsubscriptionbillingsubscriptionget) | **GET** /billing/subscription | Get Subscription|
|[**listInvoicesBillingInvoicesGet**](#listinvoicesbillinginvoicesget) | **GET** /billing/invoices | List Invoices|
|[**patchSubscriptionBillingSubscriptionPatch**](#patchsubscriptionbillingsubscriptionpatch) | **PATCH** /billing/subscription | Patch Subscription|
|[**razorpayWebhookBillingWebhookPost**](#razorpaywebhookbillingwebhookpost) | **POST** /billing/webhook | Razorpay Webhook|
|[**retryPaymentBillingRetryPaymentPost**](#retrypaymentbillingretrypaymentpost) | **POST** /billing/retry-payment | Retry Payment|
|[**startCheckoutBillingCheckoutPost**](#startcheckoutbillingcheckoutpost) | **POST** /billing/checkout | Start Checkout|

# **confirmCheckoutSessionBillingCheckoutConfirmPost**
> { [key: string]: any; } confirmCheckoutSessionBillingCheckoutConfirmPost(confirmCheckoutRequest)


### Example

```typescript
import {
    BillingApi,
    Configuration,
    ConfirmCheckoutRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new BillingApi(configuration);

let confirmCheckoutRequest: ConfirmCheckoutRequest; //

const { status, data } = await apiInstance.confirmCheckoutSessionBillingCheckoutConfirmPost(
    confirmCheckoutRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **confirmCheckoutRequest** | **ConfirmCheckoutRequest**|  | |


### Return type

**{ [key: string]: any; }**

### Authorization

[HTTPBearer](../README.md#HTTPBearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getBillingPlansBillingPlansGet**
> Array<BillingPlanItem> getBillingPlansBillingPlansGet()


### Example

```typescript
import {
    BillingApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new BillingApi(configuration);

const { status, data } = await apiInstance.getBillingPlansBillingPlansGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<BillingPlanItem>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getSubscriptionBillingSubscriptionGet**
> { [key: string]: any; } getSubscriptionBillingSubscriptionGet()


### Example

```typescript
import {
    BillingApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new BillingApi(configuration);

const { status, data } = await apiInstance.getSubscriptionBillingSubscriptionGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**{ [key: string]: any; }**

### Authorization

[HTTPBearer](../README.md#HTTPBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **listInvoicesBillingInvoicesGet**
> Array<BillingInvoiceItem> listInvoicesBillingInvoicesGet()


### Example

```typescript
import {
    BillingApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new BillingApi(configuration);

let limit: number; // (optional) (default to 20)

const { status, data } = await apiInstance.listInvoicesBillingInvoicesGet(
    limit
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **limit** | [**number**] |  | (optional) defaults to 20|


### Return type

**Array<BillingInvoiceItem>**

### Authorization

[HTTPBearer](../README.md#HTTPBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **patchSubscriptionBillingSubscriptionPatch**
> { [key: string]: any; } patchSubscriptionBillingSubscriptionPatch(subscriptionUpdateRequest)


### Example

```typescript
import {
    BillingApi,
    Configuration,
    SubscriptionUpdateRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new BillingApi(configuration);

let subscriptionUpdateRequest: SubscriptionUpdateRequest; //

const { status, data } = await apiInstance.patchSubscriptionBillingSubscriptionPatch(
    subscriptionUpdateRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **subscriptionUpdateRequest** | **SubscriptionUpdateRequest**|  | |


### Return type

**{ [key: string]: any; }**

### Authorization

[HTTPBearer](../README.md#HTTPBearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **razorpayWebhookBillingWebhookPost**
> { [key: string]: boolean; } razorpayWebhookBillingWebhookPost()


### Example

```typescript
import {
    BillingApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new BillingApi(configuration);

const { status, data } = await apiInstance.razorpayWebhookBillingWebhookPost();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**{ [key: string]: boolean; }**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **retryPaymentBillingRetryPaymentPost**
> CheckoutResponse retryPaymentBillingRetryPaymentPost()


### Example

```typescript
import {
    BillingApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new BillingApi(configuration);

const { status, data } = await apiInstance.retryPaymentBillingRetryPaymentPost();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**CheckoutResponse**

### Authorization

[HTTPBearer](../README.md#HTTPBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **startCheckoutBillingCheckoutPost**
> CheckoutResponse startCheckoutBillingCheckoutPost(checkoutRequest)


### Example

```typescript
import {
    BillingApi,
    Configuration,
    CheckoutRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new BillingApi(configuration);

let checkoutRequest: CheckoutRequest; //

const { status, data } = await apiInstance.startCheckoutBillingCheckoutPost(
    checkoutRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **checkoutRequest** | **CheckoutRequest**|  | |


### Return type

**CheckoutResponse**

### Authorization

[HTTPBearer](../README.md#HTTPBearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

