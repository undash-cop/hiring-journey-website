# AutoApplyApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createAutoApplyProfileAutoApplyProfilesPost**](#createautoapplyprofileautoapplyprofilespost) | **POST** /auto-apply/profiles | Create Auto Apply Profile|
|[**deleteAutoApplyProfileAutoApplyProfilesProfileIdDelete**](#deleteautoapplyprofileautoapplyprofilesprofileiddelete) | **DELETE** /auto-apply/profiles/{profile_id} | Delete Auto Apply Profile|
|[**listAutoApplyProfilesAutoApplyProfilesGet**](#listautoapplyprofilesautoapplyprofilesget) | **GET** /auto-apply/profiles | List Auto Apply Profiles|
|[**updateAutoApplyProfileAutoApplyProfilesProfileIdPatch**](#updateautoapplyprofileautoapplyprofilesprofileidpatch) | **PATCH** /auto-apply/profiles/{profile_id} | Update Auto Apply Profile|

# **createAutoApplyProfileAutoApplyProfilesPost**
> AutoApplyProfileItem createAutoApplyProfileAutoApplyProfilesPost(autoApplyProfileWriteRequest)


### Example

```typescript
import {
    AutoApplyApi,
    Configuration,
    AutoApplyProfileWriteRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AutoApplyApi(configuration);

let autoApplyProfileWriteRequest: AutoApplyProfileWriteRequest; //

const { status, data } = await apiInstance.createAutoApplyProfileAutoApplyProfilesPost(
    autoApplyProfileWriteRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **autoApplyProfileWriteRequest** | **AutoApplyProfileWriteRequest**|  | |


### Return type

**AutoApplyProfileItem**

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

# **deleteAutoApplyProfileAutoApplyProfilesProfileIdDelete**
> deleteAutoApplyProfileAutoApplyProfilesProfileIdDelete()


### Example

```typescript
import {
    AutoApplyApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AutoApplyApi(configuration);

let profileId: number; // (default to undefined)

const { status, data } = await apiInstance.deleteAutoApplyProfileAutoApplyProfilesProfileIdDelete(
    profileId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **profileId** | [**number**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[HTTPBearer](../README.md#HTTPBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**204** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **listAutoApplyProfilesAutoApplyProfilesGet**
> AutoApplyProfilesResponse listAutoApplyProfilesAutoApplyProfilesGet()


### Example

```typescript
import {
    AutoApplyApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AutoApplyApi(configuration);

const { status, data } = await apiInstance.listAutoApplyProfilesAutoApplyProfilesGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**AutoApplyProfilesResponse**

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

# **updateAutoApplyProfileAutoApplyProfilesProfileIdPatch**
> AutoApplyProfileItem updateAutoApplyProfileAutoApplyProfilesProfileIdPatch(autoApplyProfilePatchRequest)


### Example

```typescript
import {
    AutoApplyApi,
    Configuration,
    AutoApplyProfilePatchRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AutoApplyApi(configuration);

let profileId: number; // (default to undefined)
let autoApplyProfilePatchRequest: AutoApplyProfilePatchRequest; //

const { status, data } = await apiInstance.updateAutoApplyProfileAutoApplyProfilesProfileIdPatch(
    profileId,
    autoApplyProfilePatchRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **autoApplyProfilePatchRequest** | **AutoApplyProfilePatchRequest**|  | |
| **profileId** | [**number**] |  | defaults to undefined|


### Return type

**AutoApplyProfileItem**

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

