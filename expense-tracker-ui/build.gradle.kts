plugins {
  id("org.openapi.generator") version "7.3.0"
  id("java-library")
}

val openApiSchemaOutput: String by project
val genOutputDir = "$projectDir/src/app/core/api"

tasks.clean {
  delete += listOf(
    "$projectDir/dist",
    genOutputDir
  )
}

tasks.register<Exec>("buildAngular") {
  description = "Builds angular application"
  group = "build"

  inputs.dir("$projectDir/src")
  outputs.dir("$projectDir/dist")

  workingDir = projectDir
  commandLine("npm", "run", "build")
}

tasks.jar {
  dependsOn("buildAngular")
  from("$projectDir/dist/expense-tracker-ui").into("static")
}

openApiGenerate {
  generatorName.set("typescript-angular")
  inputSpec.set(openApiSchemaOutput)
  outputDir.set(genOutputDir)
  globalProperties.set(
    mapOf(
      "models" to "",
      "apis" to "",
      "supportingFiles" to ""
    )
  )
  configOptions.set(
    mapOf(
      "ngVersion" to "16.2.0",
      "serviceSuffix" to "Api",
      "enumPropertyNamingto" to "UPPERCASE"
    )
  )
}
