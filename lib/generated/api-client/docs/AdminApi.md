# AdminApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createAdminPlanAdminPlansPost**](#createadminplanadminplanspost) | **POST** /admin/plans | Create Admin Plan|
|[**getAdminApplicationsAdminApplicationsGet**](#getadminapplicationsadminapplicationsget) | **GET** /admin/applications | Get Admin Applications|
|[**getAdminAuditLogsAdminAuditLogsGet**](#getadminauditlogsadminauditlogsget) | **GET** /admin/audit-logs | Get Admin Audit Logs|
|[**getAdminCandidatesAdminCandidatesGet**](#getadmincandidatesadmincandidatesget) | **GET** /admin/candidates | Get Admin Candidates|
|[**getAdminJobAdminJobsJobIdGet**](#getadminjobadminjobsjobidget) | **GET** /admin/jobs/{job_id} | Get Admin Job|
|[**getAdminJobsAdminJobsGet**](#getadminjobsadminjobsget) | **GET** /admin/jobs | Get Admin Jobs|
|[**getAdminPlansAdminPlansGet**](#getadminplansadminplansget) | **GET** /admin/plans | Get Admin Plans|
|[**getAdminStatsAdminStatsGet**](#getadminstatsadminstatsget) | **GET** /admin/stats | Get Admin Stats|
|[**getPlatformSettingsAdminPlatformSettingsGet**](#getplatformsettingsadminplatformsettingsget) | **GET** /admin/platform-settings | Get Platform Settings|
|[**publishJobAdminJobsPublishPost**](#publishjobadminjobspublishpost) | **POST** /admin/jobs/publish | Publish Job|
|[**updateAdminJobAdminJobsJobIdPatch**](#updateadminjobadminjobsjobidpatch) | **PATCH** /admin/jobs/{job_id} | Update Admin Job|
|[**updateAdminPlanAdminPlansPlanIdPatch**](#updateadminplanadminplansplanidpatch) | **PATCH** /admin/plans/{plan_id} | Update Admin Plan|
|[**updateApplicationStatusAdminApplicationsApplicationIdStatusPatch**](#updateapplicationstatusadminapplicationsapplicationidstatuspatch) | **PATCH** /admin/applications/{application_id}/status | Update Application Status|
|[**updateCandidateCreditsAdminCandidatesCandidateIdCreditsPatch**](#updatecandidatecreditsadmincandidatescandidateidcreditspatch) | **PATCH** /admin/candidates/{candidate_id}/credits | Update Candidate Credits|
|[**updateCandidateStatusAdminCandidatesCandidateIdStatusPatch**](#updatecandidatestatusadmincandidatescandidateidstatuspatch) | **PATCH** /admin/candidates/{candidate_id}/status | Update Candidate Status|
|[**updateJobStatusAdminJobsJobIdStatusPatch**](#updatejobstatusadminjobsjobidstatuspatch) | **PATCH** /admin/jobs/{job_id}/status | Update Job Status|
|[**updatePlatformSettingsAdminPlatformSettingsPut**](#updateplatformsettingsadminplatformsettingsput) | **PUT** /admin/platform-settings | Update Platform Settings|

# **createAdminPlanAdminPlansPost**
> PlanItem createAdminPlanAdminPlansPost(createPlanRequest)


### Example

```typescript
import {
    AdminApi,
    Configuration,
    CreatePlanRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let createPlanRequest: CreatePlanRequest; //

const { status, data } = await apiInstance.createAdminPlanAdminPlansPost(
    createPlanRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createPlanRequest** | **CreatePlanRequest**|  | |


### Return type

**PlanItem**

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

# **getAdminApplicationsAdminApplicationsGet**
> Array<AdminApplicationItem> getAdminApplicationsAdminApplicationsGet()


### Example

```typescript
import {
    AdminApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let limit: number; // (optional) (default to 50)
let offset: number; // (optional) (default to 0)

const { status, data } = await apiInstance.getAdminApplicationsAdminApplicationsGet(
    limit,
    offset
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **limit** | [**number**] |  | (optional) defaults to 50|
| **offset** | [**number**] |  | (optional) defaults to 0|


### Return type

**Array<AdminApplicationItem>**

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

# **getAdminAuditLogsAdminAuditLogsGet**
> Array<AdminAuditLogItem> getAdminAuditLogsAdminAuditLogsGet()


### Example

```typescript
import {
    AdminApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let limit: number; // (optional) (default to 50)
let offset: number; // (optional) (default to 0)

const { status, data } = await apiInstance.getAdminAuditLogsAdminAuditLogsGet(
    limit,
    offset
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **limit** | [**number**] |  | (optional) defaults to 50|
| **offset** | [**number**] |  | (optional) defaults to 0|


### Return type

**Array<AdminAuditLogItem>**

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

# **getAdminCandidatesAdminCandidatesGet**
> Array<AdminCandidateItem> getAdminCandidatesAdminCandidatesGet()


### Example

```typescript
import {
    AdminApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let limit: number; // (optional) (default to 50)
let offset: number; // (optional) (default to 0)

const { status, data } = await apiInstance.getAdminCandidatesAdminCandidatesGet(
    limit,
    offset
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **limit** | [**number**] |  | (optional) defaults to 50|
| **offset** | [**number**] |  | (optional) defaults to 0|


### Return type

**Array<AdminCandidateItem>**

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

# **getAdminJobAdminJobsJobIdGet**
> AdminJobItem getAdminJobAdminJobsJobIdGet()


### Example

```typescript
import {
    AdminApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let jobId: number; // (default to undefined)

const { status, data } = await apiInstance.getAdminJobAdminJobsJobIdGet(
    jobId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **jobId** | [**number**] |  | defaults to undefined|


### Return type

**AdminJobItem**

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

# **getAdminJobsAdminJobsGet**
> Array<AdminJobItem> getAdminJobsAdminJobsGet()


### Example

```typescript
import {
    AdminApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let limit: number; // (optional) (default to 50)
let offset: number; // (optional) (default to 0)

const { status, data } = await apiInstance.getAdminJobsAdminJobsGet(
    limit,
    offset
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **limit** | [**number**] |  | (optional) defaults to 50|
| **offset** | [**number**] |  | (optional) defaults to 0|


### Return type

**Array<AdminJobItem>**

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

# **getAdminPlansAdminPlansGet**
> Array<PlanItem> getAdminPlansAdminPlansGet()


### Example

```typescript
import {
    AdminApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

const { status, data } = await apiInstance.getAdminPlansAdminPlansGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<PlanItem>**

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

# **getAdminStatsAdminStatsGet**
> AdminStatsResponse getAdminStatsAdminStatsGet()


### Example

```typescript
import {
    AdminApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

const { status, data } = await apiInstance.getAdminStatsAdminStatsGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**AdminStatsResponse**

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

# **getPlatformSettingsAdminPlatformSettingsGet**
> PlatformSettingsResponse getPlatformSettingsAdminPlatformSettingsGet()


### Example

```typescript
import {
    AdminApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

const { status, data } = await apiInstance.getPlatformSettingsAdminPlatformSettingsGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**PlatformSettingsResponse**

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

# **publishJobAdminJobsPublishPost**
> PublishJobResponse publishJobAdminJobsPublishPost(publishJobRequest)


### Example

```typescript
import {
    AdminApi,
    Configuration,
    PublishJobRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let publishJobRequest: PublishJobRequest; //

const { status, data } = await apiInstance.publishJobAdminJobsPublishPost(
    publishJobRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **publishJobRequest** | **PublishJobRequest**|  | |


### Return type

**PublishJobResponse**

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

# **updateAdminJobAdminJobsJobIdPatch**
> AdminJobItem updateAdminJobAdminJobsJobIdPatch(updateJobRequest)


### Example

```typescript
import {
    AdminApi,
    Configuration,
    UpdateJobRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let jobId: number; // (default to undefined)
let updateJobRequest: UpdateJobRequest; //

const { status, data } = await apiInstance.updateAdminJobAdminJobsJobIdPatch(
    jobId,
    updateJobRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateJobRequest** | **UpdateJobRequest**|  | |
| **jobId** | [**number**] |  | defaults to undefined|


### Return type

**AdminJobItem**

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

# **updateAdminPlanAdminPlansPlanIdPatch**
> PlanItem updateAdminPlanAdminPlansPlanIdPatch(updatePlanRequest)


### Example

```typescript
import {
    AdminApi,
    Configuration,
    UpdatePlanRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let planId: number; // (default to undefined)
let updatePlanRequest: UpdatePlanRequest; //

const { status, data } = await apiInstance.updateAdminPlanAdminPlansPlanIdPatch(
    planId,
    updatePlanRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updatePlanRequest** | **UpdatePlanRequest**|  | |
| **planId** | [**number**] |  | defaults to undefined|


### Return type

**PlanItem**

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

# **updateApplicationStatusAdminApplicationsApplicationIdStatusPatch**
> { [key: string]: boolean; } updateApplicationStatusAdminApplicationsApplicationIdStatusPatch(updateApplicationStatusRequest)


### Example

```typescript
import {
    AdminApi,
    Configuration,
    UpdateApplicationStatusRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let applicationId: number; // (default to undefined)
let updateApplicationStatusRequest: UpdateApplicationStatusRequest; //

const { status, data } = await apiInstance.updateApplicationStatusAdminApplicationsApplicationIdStatusPatch(
    applicationId,
    updateApplicationStatusRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateApplicationStatusRequest** | **UpdateApplicationStatusRequest**|  | |
| **applicationId** | [**number**] |  | defaults to undefined|


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

# **updateCandidateCreditsAdminCandidatesCandidateIdCreditsPatch**
> { [key: string]: boolean; } updateCandidateCreditsAdminCandidatesCandidateIdCreditsPatch(updateCandidateCreditsRequest)


### Example

```typescript
import {
    AdminApi,
    Configuration,
    UpdateCandidateCreditsRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let candidateId: number; // (default to undefined)
let updateCandidateCreditsRequest: UpdateCandidateCreditsRequest; //

const { status, data } = await apiInstance.updateCandidateCreditsAdminCandidatesCandidateIdCreditsPatch(
    candidateId,
    updateCandidateCreditsRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateCandidateCreditsRequest** | **UpdateCandidateCreditsRequest**|  | |
| **candidateId** | [**number**] |  | defaults to undefined|


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

# **updateCandidateStatusAdminCandidatesCandidateIdStatusPatch**
> { [key: string]: boolean; } updateCandidateStatusAdminCandidatesCandidateIdStatusPatch(updateCandidateStatusRequest)


### Example

```typescript
import {
    AdminApi,
    Configuration,
    UpdateCandidateStatusRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let candidateId: number; // (default to undefined)
let updateCandidateStatusRequest: UpdateCandidateStatusRequest; //

const { status, data } = await apiInstance.updateCandidateStatusAdminCandidatesCandidateIdStatusPatch(
    candidateId,
    updateCandidateStatusRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateCandidateStatusRequest** | **UpdateCandidateStatusRequest**|  | |
| **candidateId** | [**number**] |  | defaults to undefined|


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

# **updateJobStatusAdminJobsJobIdStatusPatch**
> { [key: string]: boolean; } updateJobStatusAdminJobsJobIdStatusPatch(updateJobStatusRequest)


### Example

```typescript
import {
    AdminApi,
    Configuration,
    UpdateJobStatusRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let jobId: number; // (default to undefined)
let updateJobStatusRequest: UpdateJobStatusRequest; //

const { status, data } = await apiInstance.updateJobStatusAdminJobsJobIdStatusPatch(
    jobId,
    updateJobStatusRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateJobStatusRequest** | **UpdateJobStatusRequest**|  | |
| **jobId** | [**number**] |  | defaults to undefined|


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

# **updatePlatformSettingsAdminPlatformSettingsPut**
> PlatformSettingsResponse updatePlatformSettingsAdminPlatformSettingsPut(updatePlatformSettingsRequest)


### Example

```typescript
import {
    AdminApi,
    Configuration,
    UpdatePlatformSettingsRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let updatePlatformSettingsRequest: UpdatePlatformSettingsRequest; //

const { status, data } = await apiInstance.updatePlatformSettingsAdminPlatformSettingsPut(
    updatePlatformSettingsRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updatePlatformSettingsRequest** | **UpdatePlatformSettingsRequest**|  | |


### Return type

**PlatformSettingsResponse**

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

