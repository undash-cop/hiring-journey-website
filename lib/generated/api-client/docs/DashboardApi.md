# DashboardApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getCandidateDashboardDashboardCandidateGet**](#getcandidatedashboarddashboardcandidateget) | **GET** /dashboard/candidate | Get Candidate Dashboard|

# **getCandidateDashboardDashboardCandidateGet**
> CandidateDashboardResponse getCandidateDashboardDashboardCandidateGet()


### Example

```typescript
import {
    DashboardApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DashboardApi(configuration);

const { status, data } = await apiInstance.getCandidateDashboardDashboardCandidateGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**CandidateDashboardResponse**

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

