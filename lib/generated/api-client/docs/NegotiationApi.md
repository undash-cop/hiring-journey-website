# NegotiationApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getMarketInsightsNegotiationMarketInsightsGet**](#getmarketinsightsnegotiationmarketinsightsget) | **GET** /negotiation/market-insights | Get Market Insights|
|[**getNegotiationFrameworksNegotiationFrameworksGet**](#getnegotiationframeworksnegotiationframeworksget) | **GET** /negotiation/frameworks | Get Negotiation Frameworks|

# **getMarketInsightsNegotiationMarketInsightsGet**
> MarketInsightsResponse getMarketInsightsNegotiationMarketInsightsGet()


### Example

```typescript
import {
    NegotiationApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new NegotiationApi(configuration);

const { status, data } = await apiInstance.getMarketInsightsNegotiationMarketInsightsGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**MarketInsightsResponse**

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

# **getNegotiationFrameworksNegotiationFrameworksGet**
> NegotiationFrameworksResponse getNegotiationFrameworksNegotiationFrameworksGet()


### Example

```typescript
import {
    NegotiationApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new NegotiationApi(configuration);

const { status, data } = await apiInstance.getNegotiationFrameworksNegotiationFrameworksGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**NegotiationFrameworksResponse**

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

