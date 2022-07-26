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

val start = task<Exec>("start") {
  description = "Starts frontend application"
  group = "build"

  workingDir = projectDir
  commandLine("npm", "run", "start")

  dependsOn(build)
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
