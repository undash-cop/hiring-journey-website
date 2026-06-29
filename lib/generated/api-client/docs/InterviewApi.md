# InterviewApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createInterviewSessionInterviewSessionsPost**](#createinterviewsessioninterviewsessionspost) | **POST** /interview/sessions | Create Interview Session|
|[**getInterviewQuestionsInterviewQuestionsGet**](#getinterviewquestionsinterviewquestionsget) | **GET** /interview/questions | Get Interview Questions|
|[**listInterviewSessionsInterviewSessionsGet**](#listinterviewsessionsinterviewsessionsget) | **GET** /interview/sessions | List Interview Sessions|
|[**submitInterviewFeedbackInterviewFeedbackPost**](#submitinterviewfeedbackinterviewfeedbackpost) | **POST** /interview/feedback | Submit Interview Feedback|

# **createInterviewSessionInterviewSessionsPost**
> InterviewSessionItem createInterviewSessionInterviewSessionsPost(createInterviewSessionRequest)


### Example

```typescript
import {
    InterviewApi,
    Configuration,
    CreateInterviewSessionRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new InterviewApi(configuration);

let createInterviewSessionRequest: CreateInterviewSessionRequest; //

const { status, data } = await apiInstance.createInterviewSessionInterviewSessionsPost(
    createInterviewSessionRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createInterviewSessionRequest** | **CreateInterviewSessionRequest**|  | |


### Return type

**InterviewSessionItem**

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

# **getInterviewQuestionsInterviewQuestionsGet**
> InterviewQuestionsResponse getInterviewQuestionsInterviewQuestionsGet()


### Example

```typescript
import {
    InterviewApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new InterviewApi(configuration);

let type: string; // (default to undefined)

const { status, data } = await apiInstance.getInterviewQuestionsInterviewQuestionsGet(
    type
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **type** | [**string**] |  | defaults to undefined|


### Return type

**InterviewQuestionsResponse**

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

# **listInterviewSessionsInterviewSessionsGet**
> InterviewSessionsResponse listInterviewSessionsInterviewSessionsGet()


### Example

```typescript
import {
    InterviewApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new InterviewApi(configuration);

const { status, data } = await apiInstance.listInterviewSessionsInterviewSessionsGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**InterviewSessionsResponse**

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

# **submitInterviewFeedbackInterviewFeedbackPost**
> InterviewFeedbackResponse submitInterviewFeedbackInterviewFeedbackPost(interviewFeedbackRequest)


### Example

```typescript
import {
    InterviewApi,
    Configuration,
    InterviewFeedbackRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new InterviewApi(configuration);

let interviewFeedbackRequest: InterviewFeedbackRequest; //

const { status, data } = await apiInstance.submitInterviewFeedbackInterviewFeedbackPost(
    interviewFeedbackRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **interviewFeedbackRequest** | **InterviewFeedbackRequest**|  | |


### Return type

**InterviewFeedbackResponse**

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

