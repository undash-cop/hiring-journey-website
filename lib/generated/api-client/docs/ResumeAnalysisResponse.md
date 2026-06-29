# ResumeAnalysisResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**overall_score** | **number** |  | [default to undefined]
**ats_score** | **number** |  | [default to undefined]
**keyword_match** | **number** |  | [default to undefined]
**formatting_score** | **number** |  | [default to undefined]
**content_score** | **number** |  | [default to undefined]
**strengths** | **Array&lt;string&gt;** |  | [default to undefined]
**weaknesses** | **Array&lt;string&gt;** |  | [default to undefined]
**missing_keywords** | **Array&lt;string&gt;** |  | [default to undefined]
**skills_gap** | **Array&lt;string&gt;** |  | [default to undefined]
**recommendations** | [**Array&lt;ResumeRecommendationResponse&gt;**](ResumeRecommendationResponse.md) |  | [default to undefined]
**parsed_data** | **{ [key: string]: any; }** |  | [default to undefined]

## Example

```typescript
import { ResumeAnalysisResponse } from './api';

const instance: ResumeAnalysisResponse = {
    overall_score,
    ats_score,
    keyword_match,
    formatting_score,
    content_score,
    strengths,
    weaknesses,
    missing_keywords,
    skills_gap,
    recommendations,
    parsed_data,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
