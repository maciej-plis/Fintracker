group = rootProject.group
version = rootProject.version

val build = task<Exec>("build") {
  description = "Builds fronted application"
  group = "build"

  inputs.dir("$projectDir/src")
  outputs.dir("$projectDir/dist")

  workingDir = projectDir
  commandLine("npm", "run", "build")
}

val startApplicationForLocalBackend = task<Exec>("startApplicationForLocalBackend") {
  description = "Starts frontend application with local profile"
  group = "build"

  workingDir = projectDir
  commandLine("npm", "run", "startWithLocal")
}

val startApplicationForMockBackend = task<Exec>("startApplicationForMockBackend") {
  description = "Starts frontend application with mock profile"
  group = "build"

  workingDir = projectDir
  commandLine("npm", "run", "startWithMock")
}

val startMockServer = task<Exec>("startMockServer") {
  description = "Starts mocked api server"
  group = "build"

  commandLine("npm", "run", "startMockServer")
}

val jar = task<Jar>("jar") {
  description = "Builds jar with application"
  group = "build"

  inputs.dir("$projectDir/build")
  outputs.file("$projectDir/build/libs/${project.name}-${project.version}.jar")

  destinationDirectory.set(file("$projectDir/build/libs"))
  archiveBaseName.set("${project.name}-${project.version}")

  from("$projectDir/dist/expense-tracker").into("static")

  dependsOn(build)
}

val clean = task<Delete>("clean") {
  description = "Cleans up build files"
  group = "build"

  delete(
    "$projectDir/build",
    "$projectDir/dist"
  )
}
