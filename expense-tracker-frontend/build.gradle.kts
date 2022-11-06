plugins {
  `java-library`
}

group = rootProject.group
version = rootProject.version

tasks.register<Exec>("buildAngular") {
  description = "Builds angular application"
  group = "build"

  inputs.dir("$projectDir/src")
  outputs.dir("$projectDir/dist")

  workingDir = projectDir
  commandLine("npm", "run", "build")
}

tasks.register<Exec>("startApplicationForLocalBackend") {
  description = "Starts frontend application with local profile"
  group = "build"

  workingDir = projectDir
  commandLine("npm", "run", "startWithLocal")
}

tasks.register<Exec>("startApplicationForMockBackend") {
  description = "Starts frontend application with mock profile"
  group = "build"

  workingDir = projectDir
  commandLine("npm", "run", "startWithMock")
}

tasks.register<Exec>("startMockServer") {
  description = "Starts mocked api server"
  group = "build"

  commandLine("npm", "run", "startMockServer")
}

tasks.jar {
  dependsOn("buildAngular")

  from("$projectDir/dist/expense-tracker").into("static")
}

tasks.clean {
  delete("$projectDir/dist")
}
