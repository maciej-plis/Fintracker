plugins {
    id ("java-library")
    id ("com.github.node-gradle.node") version "7.0.1"
}

group = rootProject.group
version = rootProject.version

val apiSchema: String by rootProject.extra

val generateSchema = tasks.register<Exec>("generateSchema") {
    dependsOn(tasks.npmInstall)
    workingDir("$projectDir")
    commandLine("swagger-cli", "bundle", "schema.yaml", "--outfile", apiSchema, "--type", "yaml")
}