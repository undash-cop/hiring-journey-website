# SettingsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**changePasswordUsersMePasswordPost**](#changepasswordusersmepasswordpost) | **POST** /users/me/password | Change Password|
|[**getCreditUsageUsersMeCreditsUsageGet**](#getcreditusageusersmecreditsusageget) | **GET** /users/me/credits/usage | Get Credit Usage|
|[**getUserSettingsUsersMeSettingsGet**](#getusersettingsusersmesettingsget) | **GET** /users/me/settings | Get User Settings|
|[**updateUserSettingsUsersMeSettingsPut**](#updateusersettingsusersmesettingsput) | **PUT** /users/me/settings | Update User Settings|

# **changePasswordUsersMePasswordPost**
> { [key: string]: boolean; } changePasswordUsersMePasswordPost(changePasswordRequest)


### Example

```typescript
import {
    SettingsApi,
    Configuration,
    ChangePasswordRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new SettingsApi(configuration);

let changePasswordRequest: ChangePasswordRequest; //

const { status, data } = await apiInstance.changePasswordUsersMePasswordPost(
    changePasswordRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **changePasswordRequest** | **ChangePasswordRequest**|  | |


### Return type

**{ [key: string]: boolean; }**

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

# **getCreditUsageUsersMeCreditsUsageGet**
> CreditUsageResponse getCreditUsageUsersMeCreditsUsageGet()


### Example

```typescript
import {
    SettingsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SettingsApi(configuration);

const { status, data } = await apiInstance.getCreditUsageUsersMeCreditsUsageGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**CreditUsageResponse**

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

# **getUserSettingsUsersMeSettingsGet**
> UserSettingsResponse getUserSettingsUsersMeSettingsGet()


### Example

```typescript
import {
    SettingsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SettingsApi(configuration);

const { status, data } = await apiInstance.getUserSettingsUsersMeSettingsGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**UserSettingsResponse**

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

# **updateUserSettingsUsersMeSettingsPut**
> UserSettingsResponse updateUserSettingsUsersMeSettingsPut(updateUserSettingsRequest)


### Example

```typescript
import {
    SettingsApi,
    Configuration,
    UpdateUserSettingsRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new SettingsApi(configuration);

let updateUserSettingsRequest: UpdateUserSettingsRequest; //

const { status, data } = await apiInstance.updateUserSettingsUsersMeSettingsPut(
    updateUserSettingsRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateUserSettingsRequest** | **UpdateUserSettingsRequest**|  | |


### Return type

**UserSettingsResponse**

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

