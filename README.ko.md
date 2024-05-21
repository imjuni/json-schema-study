# json-schema-study

이 json-schema-study는 json-schema를 관리하고 사용하는 방법을 예제로 보여줍니다. json-schema는 정말 편리하고 강력한 데이터 스키마 검증 도구입니다. 하지만 API 서버 요청/응답, DTO 모두 json-schema를 적용하려면 많은 json-schema를 관리하는 방법과 참조를 사용하여 스키마를 결합하는 방법을 학습해야 합니다. json-schema-study는 다수의 json-schema를 관리하는 방법, $ref를 사용하여 기존에 만들어진 스키마를 참조하는 방법에 대한 예제를 모아두었습니다.

## Learn more about json-schema `$id`

json-schema를 AJV에 등록하기 위해서 `$id`가 필요합니다. `$id`를 지정하지 않는 경우 empty string('')으로 `$id`가 지정되며, 고유 값이기 때문에 이 값에 여러 개의 `$id`를 등록할 수 없습니다. json-schema는 URL을 통해 다운로드해서 사용할 수 있게 설계되었습니다. Visual Studio Code를 사용해서 TypeScript를 개발할 때 tsconfig.json 파일이 자동 검증 되는 것을 경험하셨을 것입니다. 이 기능은 schemastore에 등록된 [tsconfig json-schema](https://json.schemastore.org/tsconfig.json)를 사용하는 것으로 추측됩니다.

그래서 `$id`에 사용할 수 있는 문자, 기호는 URL에서 사용할 수 있는 문자, 기호와 동일합니다. AJV를 사용하는 중이라면 `$id`를 여러 개 등록할 수 있는데 이 때 `$id`는 모두 고유한 값이어야 합니다.

## Multiple non-duplicate `$id`

모든 스키마에 중복 없이 `$id`를 부여합니다. AJV는 `$id`를 여러개 등록할 수 있습니다. [example01.ts](https://github.com/imjuni/json-schema-study/blob/d1565d6d095a7def0e330a6cfcf2e07f0407d3ee/src/example01.ts#L1)파일에서 실제 사용예제를 볼 수 있습니다.

이 방법은 매우 직관적입니다. RESTful API request/response, DTO 검증을 위한 json-schema store를 운영하는 경우 대부분의 상황에서 사용가능합니다.

## Multiple non-duplicate `$id` with schema path

[Multiple non-duplicate `$id`](#multiple-non-duplicate-id) 방식과 동일하지만 `$id`에 schema path를 추가합니다. MSA 아키텍처에서 개발할 때 여러 서버의 API와 DB 데이터를 조합하는 경우가 종종 있습니다. 예를들면 사용자 API의 `user/CarDto` 와 모델 API의 `model/CarDto`를 조합하여 사용자가 구매한 차량 모델을 제공하는 경우입니다. 이 때 `CarDto`라는 동일한 이름을 가진 DTO를 사용하게 되는데 [Multiple non-duplicate `$id`](#multiple-non-duplicate-id) 방식으로는 이 상황을 모델링 할 수 없습니다.

그래서 `$id`에 경로를 추가하여 이와 같은 상황을 방지합니다. [example02.ts](https://github.com/imjuni/json-schema-study/blob/d1565d6d095a7def0e330a6cfcf2e07f0407d3ee/src/example02.ts#L1)파일에서 실제 사용예제를 볼 수 있습니다.

## The way to use multiple schemas in a single schema using the `$defs` field

앞서 우리는 schemastore에 [tsconfig json-schema](https://json.schemastore.org/tsconfig.json) 스키마가 등록된 것을 보았습니다. 이와 동일한 방법입니다. MSA 아키텍처에서 RESTful API에 schemastore를 적용할 때 가장 적합한 방법입니다. 먼저 도메인을 상정하고 이 도메인에 sub json-schema를 등록하는 방법입니다. 꼭 도메인일 필요는 없지만 도메인 또는 package name을 사용하는 것을 추천합니다.

이 방법으로 schemastore를 구성하는 경우 `$ref`를 사용하는 방법은 조금 복잡할 수 있습니다. [example03.ts](https://github.com/imjuni/json-schema-study/blob/d1565d6d095a7def0e330a6cfcf2e07f0407d3ee/src/example02.ts#L43)에서 `$ref` 사용예제를 볼 수 있습니다.

## The way to use multiple path-separated schemas in a single schema using the `$defs` field

[The way to use multiple schemas in a single schema using the `$defs` field](#the-way-to-use-multiple-schemas-in-a-single-schema-using-the-defs-field)와 동일하지만 스키마를 경로로 한 번 더 분류하는 방법입니다. 스키마를 다루는 가장 복잡한 방법이지만 동일한 이름을 다룰 수 있고 거의 모든 상황을 모델링할 수 있습니다.

[example04.ts](https://github.com/imjuni/json-schema-study/blob/d1565d6d095a7def0e330a6cfcf2e07f0407d3ee/src/example02.ts#L1)에서 실제 사용예제를 볼 수 있습니다.
