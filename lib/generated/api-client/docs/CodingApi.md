# CodingApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getCodingChallengeCodingChallengesChallengeIdGet**](#getcodingchallengecodingchallengeschallengeidget) | **GET** /coding/challenges/{challenge_id} | Get Coding Challenge|
|[**listCodingChallengesCodingChallengesGet**](#listcodingchallengescodingchallengesget) | **GET** /coding/challenges | List Coding Challenges|
|[**recordCodingAttemptCodingChallengesChallengeIdAttemptsPost**](#recordcodingattemptcodingchallengeschallengeidattemptspost) | **POST** /coding/challenges/{challenge_id}/attempts | Record Coding Attempt|
|[**submitCodingSolutionCodingChallengesChallengeIdSubmitPost**](#submitcodingsolutioncodingchallengeschallengeidsubmitpost) | **POST** /coding/challenges/{challenge_id}/submit | Submit Coding Solution|

# **getCodingChallengeCodingChallengesChallengeIdGet**
> CodingChallengeDetail getCodingChallengeCodingChallengesChallengeIdGet()


### Example

```typescript
import {
    CodingApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CodingApi(configuration);

let challengeId: number; // (default to undefined)

const { status, data } = await apiInstance.getCodingChallengeCodingChallengesChallengeIdGet(
    challengeId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **challengeId** | [**number**] |  | defaults to undefined|


### Return type

**CodingChallengeDetail**

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

# **listCodingChallengesCodingChallengesGet**
> CodingChallengesResponse listCodingChallengesCodingChallengesGet()


### Example

```typescript
import {
    CodingApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CodingApi(configuration);

const { status, data } = await apiInstance.listCodingChallengesCodingChallengesGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**CodingChallengesResponse**

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

# **recordCodingAttemptCodingChallengesChallengeIdAttemptsPost**
> RecordAttemptResponse recordCodingAttemptCodingChallengesChallengeIdAttemptsPost(recordAttemptRequest)


### Example

```typescript
import {
    CodingApi,
    Configuration,
    RecordAttemptRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new CodingApi(configuration);

let challengeId: number; // (default to undefined)
let recordAttemptRequest: RecordAttemptRequest; //

const { status, data } = await apiInstance.recordCodingAttemptCodingChallengesChallengeIdAttemptsPost(
    challengeId,
    recordAttemptRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **recordAttemptRequest** | **RecordAttemptRequest**|  | |
| **challengeId** | [**number**] |  | defaults to undefined|


### Return type

**RecordAttemptResponse**

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

# **submitCodingSolutionCodingChallengesChallengeIdSubmitPost**
> SubmitSolutionResponse submitCodingSolutionCodingChallengesChallengeIdSubmitPost(submitSolutionRequest)


### Example

```typescript
import {
    CodingApi,
    Configuration,
    SubmitSolutionRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new CodingApi(configuration);

let challengeId: number; // (default to undefined)
let submitSolutionRequest: SubmitSolutionRequest; //

const { status, data } = await apiInstance.submitCodingSolutionCodingChallengesChallengeIdSubmitPost(
    challengeId,
    submitSolutionRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **submitSolutionRequest** | **SubmitSolutionRequest**|  | |
| **challengeId** | [**number**] |  | defaults to undefined|


### Return type

**SubmitSolutionResponse**

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

