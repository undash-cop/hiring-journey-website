# LegalApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createLegalDocumentMetadataLegalDocumentsMetadataPost**](#createlegaldocumentmetadatalegaldocumentsmetadatapost) | **POST** /legal/documents/metadata | Create Legal Document Metadata|
|[**downloadLegalDocumentLegalDocumentsDocumentIdDownloadGet**](#downloadlegaldocumentlegaldocumentsdocumentiddownloadget) | **GET** /legal/documents/{document_id}/download | Download Legal Document|
|[**listLegalDocumentsLegalDocumentsGet**](#listlegaldocumentslegaldocumentsget) | **GET** /legal/documents | List Legal Documents|
|[**uploadLegalDocumentLegalDocumentsPost**](#uploadlegaldocumentlegaldocumentspost) | **POST** /legal/documents | Upload Legal Document|
|[**validateLegalDocumentLegalDocumentsDocumentIdValidatePost**](#validatelegaldocumentlegaldocumentsdocumentidvalidatepost) | **POST** /legal/documents/{document_id}/validate | Validate Legal Document|

# **createLegalDocumentMetadataLegalDocumentsMetadataPost**
> LegalDocumentItem createLegalDocumentMetadataLegalDocumentsMetadataPost(createLegalDocumentRequest)

Backward-compatible metadata-only create (no file bytes).

### Example

```typescript
import {
    LegalApi,
    Configuration,
    CreateLegalDocumentRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new LegalApi(configuration);

let createLegalDocumentRequest: CreateLegalDocumentRequest; //

const { status, data } = await apiInstance.createLegalDocumentMetadataLegalDocumentsMetadataPost(
    createLegalDocumentRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createLegalDocumentRequest** | **CreateLegalDocumentRequest**|  | |


### Return type

**LegalDocumentItem**

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

# **downloadLegalDocumentLegalDocumentsDocumentIdDownloadGet**
> any downloadLegalDocumentLegalDocumentsDocumentIdDownloadGet()


### Example

```typescript
import {
    LegalApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LegalApi(configuration);

let documentId: number; // (default to undefined)

const { status, data } = await apiInstance.downloadLegalDocumentLegalDocumentsDocumentIdDownloadGet(
    documentId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **documentId** | [**number**] |  | defaults to undefined|


### Return type

**any**

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

# **listLegalDocumentsLegalDocumentsGet**
> LegalDocumentsResponse listLegalDocumentsLegalDocumentsGet()


### Example

```typescript
import {
    LegalApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LegalApi(configuration);

const { status, data } = await apiInstance.listLegalDocumentsLegalDocumentsGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**LegalDocumentsResponse**

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

# **uploadLegalDocumentLegalDocumentsPost**
> LegalDocumentItem uploadLegalDocumentLegalDocumentsPost()


### Example

```typescript
import {
    LegalApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LegalApi(configuration);

let file: string; // (default to undefined)
let type: string; // (default to undefined)

const { status, data } = await apiInstance.uploadLegalDocumentLegalDocumentsPost(
    file,
    type
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **file** | [**string**] |  | defaults to undefined|
| **type** | [**string**] |  | defaults to undefined|


### Return type

**LegalDocumentItem**

### Authorization

[HTTPBearer](../README.md#HTTPBearer)

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **validateLegalDocumentLegalDocumentsDocumentIdValidatePost**
> ValidateLegalDocumentResponse validateLegalDocumentLegalDocumentsDocumentIdValidatePost()


### Example

```typescript
import {
    LegalApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LegalApi(configuration);

let documentId: number; // (default to undefined)

const { status, data } = await apiInstance.validateLegalDocumentLegalDocumentsDocumentIdValidatePost(
    documentId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **documentId** | [**number**] |  | defaults to undefined|


### Return type

**ValidateLegalDocumentResponse**

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

