# json-schema-study

This json-schema-study repo. provides an example of how to manage and use [json-schema](https://json-schema.org/). json-schema is a really useful and powerful data schema validation tool. However, to apply json-schema, whether for API server requests/responses or DTOs, you need to learn how to manage many json-schemas and how to combine schemas using `$ref`. json-schema-study shows examples of how to manage multiple json-schemas, and how to use `$ref` to refer to an already existing schema.

## Learn more about json-schema `$id`

The `$id` is required to register the json-schema with the [`ajv`](https://ajv.js.org/). If you do not specify an `$id`, the `ajv` will assign an empty string ('') as the `$id`. The empty string `$id` is treated as a unique value and if you add another schema, the old one will be deleted.

The json-schema is designed to be downloaded and used via a URL. When developing TypeScript with Visual Studio Code, you may have noticed that the tsconfig.json file is automatically validated; this feature probably uses the [tsconfig json-schema](https://json.schemastore.org/tsconfig.json) registered in the schemastore.

The characters, symbols that can be used in `$id` are the same as the characters, symbols that can be used in the URL. If you're using an `ajv`, you can register multiple `$id`s. In this case, each `$id` must be a unique value.

## Multiple non-duplicate `$id`

Give every schema an `$id` without duplicates. An `ajv` can register multiple `$id`s. You can see an example of this in action in the file [example01.ts](https://github.com/imjuni/json-schema-study/blob/d1565d6d095a7def0e330a6cfcf2e07f0407d3ee/src/example01.ts#L1).

## Multiple non-duplicate `$id` with schema path

Same as [Multiple non-duplicate `$id`](#multiple-non-duplicate-id), but adds the schema path to `$id`. When developing in an MSA architecture, it is often necessary to combine APIs and DB data from multiple servers. For example, combining `user/CarDto` from the user API and `model/CarDto` from the model API to provide the car model that a user has purchased. In this case, you would use a DTO with the same name `CarDto`, which cannot be modelled with [Multiple non-duplicate `$id`](#multiple-non-duplicate-id).

Adding a path to `$id` allows you to use both schemas. You can see an example of this in action in the file [example02.ts](https://github.com/imjuni/json-schema-study/blob/d1565d6d095a7def0e330a6cfcf2e07f0407d3ee/src/example02.ts#L1).

## The way to use multiple schemas in a single schema using the `$defs` field

Above you saw [tsconfig json-schema](https://json.schemastore.org/tsconfig.json) registered in the schemastore, this is the same approach. This is the recommended approach when applying schemastore to RESTful APIs in MSA architecture.  The approach is to register sub json-schema on a domain, which doesn't have to be a domain, but we recommend using a domain or package name.

Using `$ref` can be a little bit complicated when configuring a schemastore with this approach. You can see an example of using `$ref` in [example03.ts](https://github.com/imjuni/json-schema-study/blob/d1565d6d095a7def0e330a6cfcf2e07f0407d3ee/src/example02.ts#L43).

## The way to use multiple path-separated schemas in a single schema using the `$defs` field

This is the same approach as [The way to use multiple schemas in a single schema using the `$defs` field](#the-way-to-use-multiple-schemas-in-a-single-schema-using-the-defs-field), but breaks down schemas into paths one more time. This is the most complex approach to dealing with schemas, but it can deal with the same names and can model almost any situation.

You can see an example of this in action in [example04.ts](https://github.com/imjuni/json-schema-study/blob/d1565d6d095a7def0e330a6cfcf2e07f0407d3ee/src/example02.ts#L1).

Translated with <www.DeepL.com/Translator> (free version)
