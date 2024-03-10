plugins {
    id("java-library")
}

group = rootProject.group
version = rootProject.version

val apiSchema: String by rootProject.extra

val generateSchema = tasks.register<Exec>("generateSchema") {
    workingDir("$projectDir")
    commandLine("npx", "@redocly/cli", "bundle", "schema.yaml", "-o", apiSchema)
}
