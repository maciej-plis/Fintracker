import org.gradle.api.JavaVersion.VERSION_17

plugins {
    id("org.springframework.boot") version "2.7.2"
    id("io.spring.dependency-management") version "1.0.11.RELEASE"
    id("org.openapi.generator") version "6.0.1"
    `java-library`
}

group = rootProject.group
version = rootProject.version

java {
    sourceCompatibility = VERSION_17
    targetCompatibility = VERSION_17
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter")
    implementation("org.springframework.boot:spring-boot-starter-web")

    implementation("io.swagger.core.v3:swagger-annotations:2.2.0")
    implementation("io.swagger.parser.v3:swagger-parser:2.0.33")

    implementation("org.openapitools:jackson-databind-nullable:0.2.2")
}

tasks.bootJar {
    enabled = false
}

tasks.compileJava {
    dependsOn(tasks.openApiGenerate)
}

tasks.clean {
    delete.addAll(
        listOf(
            "$projectDir/.openapi-generator",
            "$projectDir/src"
        )
    )
}

openApiValidate {
    inputSpec.set("$rootDir/openApi/schema.yaml")
}

openApiGenerate {
    generatorName.set("spring")
    library.set("spring-boot")
    inputSpec.set("$rootDir/openApi/schema.yaml")
    outputDir.set("$projectDir")
    globalProperties.set(
        mapOf(
            "supportingFiles" to "false",
            "modelDocs" to "false",
            "models" to "",
            "apis" to ""
        )
    )
    configOptions.set(
        mapOf(
            "title" to rootProject.name,
            "artifactId" to rootProject.name,
            "basePackage" to "matthias.expense_tracker.openapi",
            "configPackage" to "matthias.expense_tracker.openapi.config",
            "apiPackage" to "matthias.expense_tracker.openapi.api",
            "modelPackage" to "matthias.expense_tracker.openapi.model",
            "invokerPackage" to "matthias.expense_tracker.openapi.invoker",
            "useOptional" to "true",
            "useBeanValidation" to "false",
            "performBeanValidation" to "false",
            "useTags" to "true",
            "singleContentTypes" to "true",
            "dateLibrary" to "java8",
            "serializableModel" to "true",
            "interfaceOnly" to "true",
            "skipDefaultInterface" to "true"
        )
    )
}