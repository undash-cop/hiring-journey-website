# ResumeApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**analyzeResumeResumeAnalysisGet**](#analyzeresumeresumeanalysisget) | **GET** /resume/analysis | Analyze Resume|
|[**createResumeVersionResumeVersionsPost**](#createresumeversionresumeversionspost) | **POST** /resume/versions | Create Resume Version|
|[**exportResumeVersionResumeVersionsVersionIdExportPost**](#exportresumeversionresumeversionsversionidexportpost) | **POST** /resume/versions/{version_id}/export | Export Resume Version|
|[**getResumeBuilderResumeVersionsVersionIdBuilderGet**](#getresumebuilderresumeversionsversionidbuilderget) | **GET** /resume/versions/{version_id}/builder | Get Resume Builder|
|[**getResumeSuggestionsResumeSuggestionsGet**](#getresumesuggestionsresumesuggestionsget) | **GET** /resume/suggestions | Get Resume Suggestions|
|[**getResumeSummaryResumeGet**](#getresumesummaryresumeget) | **GET** /resume | Get Resume Summary|
|[**getResumeTemplatesResumeTemplatesGet**](#getresumetemplatesresumetemplatesget) | **GET** /resume/templates | Get Resume Templates|
|[**getResumeVersionsResumeVersionsGet**](#getresumeversionsresumeversionsget) | **GET** /resume/versions | Get Resume Versions|
|[**improveResumeResumeImprovePost**](#improveresumeresumeimprovepost) | **POST** /resume/improve | Improve Resume|
|[**optimizeResumeForRoleResumeOptimizeRolePost**](#optimizeresumeforroleresumeoptimizerolepost) | **POST** /resume/optimize-role | Optimize Resume For Role|
|[**parseResumeUploadResumeParsePost**](#parseresumeuploadresumeparsepost) | **POST** /resume/parse | Parse Resume Upload|
|[**saveResumeBuilderResumeVersionsVersionIdBuilderPut**](#saveresumebuilderresumeversionsversionidbuilderput) | **PUT** /resume/versions/{version_id}/builder | Save Resume Builder|

# **analyzeResumeResumeAnalysisGet**
> ResumeAnalysisResponse analyzeResumeResumeAnalysisGet()


### Example

```typescript
import {
    ResumeApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ResumeApi(configuration);

let targetRole: string; // (optional) (default to '')
let versionId: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.analyzeResumeResumeAnalysisGet(
    targetRole,
    versionId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **targetRole** | [**string**] |  | (optional) defaults to ''|
| **versionId** | [**number**] |  | (optional) defaults to undefined|


### Return type

**ResumeAnalysisResponse**

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

# **createResumeVersionResumeVersionsPost**
> ResumeVersionResponse createResumeVersionResumeVersionsPost(createResumeVersionRequest)


### Example

```typescript
import {
    ResumeApi,
    Configuration,
    CreateResumeVersionRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ResumeApi(configuration);

let createResumeVersionRequest: CreateResumeVersionRequest; //

const { status, data } = await apiInstance.createResumeVersionResumeVersionsPost(
    createResumeVersionRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createResumeVersionRequest** | **CreateResumeVersionRequest**|  | |


### Return type

**ResumeVersionResponse**

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

# **exportResumeVersionResumeVersionsVersionIdExportPost**
> ExportResumeResponse exportResumeVersionResumeVersionsVersionIdExportPost(exportResumeRequest)


### Example

```typescript
import {
    ResumeApi,
    Configuration,
    ExportResumeRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ResumeApi(configuration);

let versionId: number; // (default to undefined)
let exportResumeRequest: ExportResumeRequest; //

const { status, data } = await apiInstance.exportResumeVersionResumeVersionsVersionIdExportPost(
    versionId,
    exportResumeRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **exportResumeRequest** | **ExportResumeRequest**|  | |
| **versionId** | [**number**] |  | defaults to undefined|


### Return type

**ExportResumeResponse**

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

# **getResumeBuilderResumeVersionsVersionIdBuilderGet**
> ResumeBuilderResponse getResumeBuilderResumeVersionsVersionIdBuilderGet()


### Example

```typescript
import {
    ResumeApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ResumeApi(configuration);

let versionId: number; // (default to undefined)

const { status, data } = await apiInstance.getResumeBuilderResumeVersionsVersionIdBuilderGet(
    versionId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **versionId** | [**number**] |  | defaults to undefined|


### Return type

**ResumeBuilderResponse**

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

# **getResumeSuggestionsResumeSuggestionsGet**
> ResumeSuggestionsResponse getResumeSuggestionsResumeSuggestionsGet()


### Example

```typescript
import {
    ResumeApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ResumeApi(configuration);

let section: string; // (default to undefined)
let targetRole: string; // (optional) (default to '')

const { status, data } = await apiInstance.getResumeSuggestionsResumeSuggestionsGet(
    section,
    targetRole
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **section** | [**string**] |  | defaults to undefined|
| **targetRole** | [**string**] |  | (optional) defaults to ''|


### Return type

**ResumeSuggestionsResponse**

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

# **getResumeSummaryResumeGet**
> ResumeSummaryResponse getResumeSummaryResumeGet()


### Example

```typescript
import {
    ResumeApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ResumeApi(configuration);

const { status, data } = await apiInstance.getResumeSummaryResumeGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ResumeSummaryResponse**

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

# **getResumeTemplatesResumeTemplatesGet**
> ResumeTemplatesListResponse getResumeTemplatesResumeTemplatesGet()


### Example

```typescript
import {
    ResumeApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ResumeApi(configuration);

const { status, data } = await apiInstance.getResumeTemplatesResumeTemplatesGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ResumeTemplatesListResponse**

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

# **getResumeVersionsResumeVersionsGet**
> ResumeVersionsListResponse getResumeVersionsResumeVersionsGet()


### Example

```typescript
import {
    ResumeApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ResumeApi(configuration);

const { status, data } = await apiInstance.getResumeVersionsResumeVersionsGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ResumeVersionsListResponse**

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

# **improveResumeResumeImprovePost**
> ImproveResumeResponse improveResumeResumeImprovePost()


### Example

```typescript
import {
    ResumeApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ResumeApi(configuration);

const { status, data } = await apiInstance.improveResumeResumeImprovePost();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ImproveResumeResponse**

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

# **optimizeResumeForRoleResumeOptimizeRolePost**
> OptimizeResumeRoleResponse optimizeResumeForRoleResumeOptimizeRolePost(optimizeResumeRoleRequest)


### Example

```typescript
import {
    ResumeApi,
    Configuration,
    OptimizeResumeRoleRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ResumeApi(configuration);

let optimizeResumeRoleRequest: OptimizeResumeRoleRequest; //

const { status, data } = await apiInstance.optimizeResumeForRoleResumeOptimizeRolePost(
    optimizeResumeRoleRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **optimizeResumeRoleRequest** | **OptimizeResumeRoleRequest**|  | |


### Return type

**OptimizeResumeRoleResponse**

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

# **parseResumeUploadResumeParsePost**
> ParseResumeResponse parseResumeUploadResumeParsePost()


### Example

```typescript
import {
    ResumeApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ResumeApi(configuration);

let file: string; // (default to undefined)

const { status, data } = await apiInstance.parseResumeUploadResumeParsePost(
    file
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **file** | [**string**] |  | defaults to undefined|


### Return type

**ParseResumeResponse**

### Authorization

[HTTPBearer](../README.md#HTTPBearer)

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **saveResumeBuilderResumeVersionsVersionIdBuilderPut**
> ResumeBuilderResponse saveResumeBuilderResumeVersionsVersionIdBuilderPut(updateResumeBuilderRequest)


### Example

```typescript
import {
    ResumeApi,
    Configuration,
    UpdateResumeBuilderRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ResumeApi(configuration);

let versionId: number; // (default to undefined)
let updateResumeBuilderRequest: UpdateResumeBuilderRequest; //

const { status, data } = await apiInstance.saveResumeBuilderResumeVersionsVersionIdBuilderPut(
    versionId,
    updateResumeBuilderRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateResumeBuilderRequest** | **UpdateResumeBuilderRequest**|  | |
| **versionId** | [**number**] |  | defaults to undefined|


### Return type

**ResumeBuilderResponse**

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

