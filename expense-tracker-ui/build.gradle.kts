import com.github.gradle.node.npm.task.NpmTask

plugins {
  id("java-library")
  alias(libs.plugins.openApiGenerator)
  alias(libs.plugins.node)
}

val generateSchema by rootProject.tasks

val openApiSchemaOutput: String by project
val openApiGenerationOutput = "$projectDir/src/app/core/api"

val angularInputDir = "src/"
val angularInputFiles = listOf("angular.json", "package.json", "package-lock.json", "tsconfig.json", "tsconfig.app.json", "tsconfig.spec.json")
val angularOutputDir = "${project.buildDir}/expense-tracker-ui/"

val angularBuild by tasks.registering(NpmTask::class) {
  description = "Builds angular application"
  group = "angular"
  dependsOn(tasks.npmInstall, tasks.openApiGenerate)
  inputs.dir(angularInputDir)
  inputs.files(angularInputFiles)
  outputs.dir(project.buildDir)

  workingDir = projectDir
  args = listOf("run", "build")
}

val angularTest by tasks.registering(NpmTask::class) {
  description = "Test angular application"
  group = "angular"
  dependsOn(tasks.npmInstall, tasks.openApiGenerate)
  inputs.dir(angularInputDir)
  angularInputFiles.forEach { inputs.file(it) }
  outputs.upToDateWhen { true }

  workingDir = projectDir
  args = listOf("run", "test")
}

tasks.clean {
  delete += listOf(openApiGenerationOutput, ".angular/")
}

tasks.check {
  dependsOn(angularTest)
}

tasks.jar {
  dependsOn(angularBuild)
  from(angularOutputDir).into("static")
}

tasks.openApiGenerate {
  dependsOn(generateSchema)

  generatorName.set("typescript-angular")
  inputSpec.set(openApiSchemaOutput)
  outputDir.set(openApiGenerationOutput)
  globalProperties.set(
    mapOf(
      "models" to "",
      "apis" to "",
      "supportingFiles" to ""
    )
  )
  configOptions.set(
    mapOf(
      "serviceSuffix" to "Api",
      "enumPropertyNaming" to "UPPERCASE"
    )
  )
}
