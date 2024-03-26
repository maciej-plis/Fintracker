plugins {
    id("java-library")
}

val javaVersion by extra { JavaLanguageVersion.of(21) }

val openApiSchemaName = "schema.yaml"
val openApiSchemaRootInput by extra { "$rootDir/openApi/$openApiSchemaName" }
val openApiSchemaOutput by extra { "$rootDir/build/$openApiSchemaName" }
val openApiSchemaComponents by extra { listOf("$rootDir/openApi/paths", "$rootDir/openApi/components") }

tasks.register<Exec>("generateSchema") {
    group = "openapi"
    description = "Generate complete openapi schema"
    inputs.file(openApiSchemaRootInput)
    openApiSchemaComponents.forEach { inputs.dir(it) }
    outputs.file(openApiSchemaOutput)

    workingDir(projectDir)
    println("${project.layout.buildDirectory.asFile.get()}")
    commandLine("npx", "@redocly/cli", "bundle", openApiSchemaRootInput, "-o", openApiSchemaOutput)
}

allprojects {
    group = rootProject.group
    version = rootProject.version
}
