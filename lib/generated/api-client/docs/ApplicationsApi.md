# ApplicationsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createApplicationApplicationsPost**](#createapplicationapplicationspost) | **POST** /applications | Create Application|
|[**getApplicationApplicationsApplicationIdGet**](#getapplicationapplicationsapplicationidget) | **GET** /applications/{application_id} | Get Application|
|[**listApplicationsApplicationsGet**](#listapplicationsapplicationsget) | **GET** /applications | List Applications|
|[**updateApplicationApplicationsApplicationIdPatch**](#updateapplicationapplicationsapplicationidpatch) | **PATCH** /applications/{application_id} | Update Application|

# **createApplicationApplicationsPost**
> ApplicationItem createApplicationApplicationsPost(createApplicationRequest)


### Example

```typescript
import {
    ApplicationsApi,
    Configuration,
    CreateApplicationRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ApplicationsApi(configuration);

let createApplicationRequest: CreateApplicationRequest; //

const { status, data } = await apiInstance.createApplicationApplicationsPost(
    createApplicationRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createApplicationRequest** | **CreateApplicationRequest**|  | |


### Return type

**ApplicationItem**

### Authorization

[HTTPBearer](../README.md#HTTPBearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getApplicationApplicationsApplicationIdGet**
> ApplicationItem getApplicationApplicationsApplicationIdGet()


### Example

```typescript
import {
    ApplicationsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ApplicationsApi(configuration);

let applicationId: number; // (default to undefined)

const { status, data } = await apiInstance.getApplicationApplicationsApplicationIdGet(
    applicationId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **applicationId** | [**number**] |  | defaults to undefined|


### Return type

**ApplicationItem**

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

# **listApplicationsApplicationsGet**
> ListApplicationsResponse listApplicationsApplicationsGet()


### Example

```typescript
import {
    ApplicationsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ApplicationsApi(configuration);

const { status, data } = await apiInstance.listApplicationsApplicationsGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ListApplicationsResponse**

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

# **updateApplicationApplicationsApplicationIdPatch**
> ApplicationItem updateApplicationApplicationsApplicationIdPatch(updateApplicationRequest)


### Example

```typescript
import {
    ApplicationsApi,
    Configuration,
    UpdateApplicationRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ApplicationsApi(configuration);

let applicationId: number; // (default to undefined)
let updateApplicationRequest: UpdateApplicationRequest; //

const { status, data } = await apiInstance.updateApplicationApplicationsApplicationIdPatch(
    applicationId,
    updateApplicationRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateApplicationRequest** | **UpdateApplicationRequest**|  | |
| **applicationId** | [**number**] |  | defaults to undefined|


### Return type

**ApplicationItem**

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

