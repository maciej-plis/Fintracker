import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    id("java")
    id("groovy")
    id("org.springframework.boot") version "3.2.3"
    id("io.spring.dependency-management") version "1.1.4"
    id("org.openapi.generator") version "7.3.0"
    id("com.bmuschko.docker-spring-boot-application") version "9.4.0"
    kotlin("jvm") version "1.9.23"
    kotlin("plugin.jpa") version "1.9.23"
    kotlin("plugin.spring") version "1.9.23"
}

val generateSchema by rootProject.tasks

val javaVersionNumber: String by project
val javaVersion: JavaLanguageVersion by project
val openApiSchemaOutput: String by project

tasks.withType<KotlinCompile> {
    kotlinOptions.freeCompilerArgs += "-Xjsr305=strict"
}

kotlin {
    jvmToolchain {
        languageVersion.set(javaVersion)
    }
}

sourceSets.create("integrationTest") {
    groovy {
        groovy.srcDir("$projectDir/src/integration-test/groovy")
        resources.srcDir("$projectDir/src/integration-test/resources")
        compileClasspath += sourceSets.main.get().output
        runtimeClasspath += sourceSets.main.get().output
    }
}

val integrationTestImplementation: Configuration by configurations.getting {
    extendsFrom(configurations.testImplementation.get())
}

val integrationTestRuntimeOnly: Configuration by configurations.getting {
    extendsFrom(configurations.testRuntimeOnly.get())
}

dependencies {
    developmentOnly("org.springframework.boot:spring-boot-devtools")

    // Spring
    implementation("org.springframework.boot:spring-boot-starter")

    // Web
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-validation")

    // Database
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("io.github.perplexhub:rsql-jpa-spring-boot-starter:6.0.20")
    runtimeOnly("org.postgresql:postgresql:42.7.2")
    runtimeOnly("org.liquibase:liquibase-core:4.26.0")

    // Kotlin Support
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")

    // Openapi
    implementation("io.swagger.core.v3:swagger-annotations:2.2.20")

    // UI
    runtimeOnly(project(":expense-tracker-ui"))

    // Test
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.spockframework:spock-spring:2.4-M2-groovy-4.0")
    testImplementation("org.apache.groovy:groovy-json:4.0.19")

    // Integration Test
    integrationTestRuntimeOnly("com.h2database:h2:2.1.214")
}

tasks.compileKotlin {
    dependsOn(tasks.openApiGenerate)
}

tasks.processResources {
    dependsOn(tasks.openApiGenerate)
}

tasks.test {
    useJUnitPlatform()
}

val integrationTest by tasks.registering(Test::class) {
    description = "Run integration tests"
    group = "verification"

    testClassesDirs = sourceSets["integrationTest"].output.classesDirs
    classpath = sourceSets["integrationTest"].runtimeClasspath

    shouldRunAfter("test")
    useJUnitPlatform()
}

tasks.check {
    dependsOn(integrationTest)
}

tasks.bootJar {
    manifest.attributes(
        "Implementation-Title" to rootProject.name,
        "Implementation-Version" to rootProject.version
    )
}

tasks.clean {
    delete += listOf(
        ".openapi-generator",
        "src/main/kotlin/matthias/expense_tracker/api"
    )
}

tasks.openApiGenerate {
    dependsOn(generateSchema)

    generatorName.set("kotlin-spring")
    library.set("spring-boot")
    inputSpec.set(openApiSchemaOutput)
    outputDir.set(projectDir.path)
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
            "packageName" to "matthias.expense_tracker.api",
            "useBeanValidation" to "false",
            "useTags" to "true",
            "dateLibrary" to "java8",
            "serializableModel" to "true",
            "interfaceOnly" to "true",
            "skipDefaultInterface" to "true",
            "useSpringBoot3" to "true"
        )
    )
    typeMappings.set(
        mapOf(
            "DateTime" to "java.time.Instant"
        )
    )
}

docker {
    springBootApplication {
        baseImage.set("openjdk:$javaVersionNumber-oracle")
        ports.set(listOf(8080))
        jvmArgs.set(listOf("-Xms256m", "-Xmx512m"))
        images.set(
            listOf(
                "${rootProject.name}:latest",
                "${rootProject.name}:${rootProject.version}",
                "registry.minikube.com/${rootProject.name}:${rootProject.version}",
            )
        )
    }
}

tasks.dockerPushImage {
    images.set(
        listOf(
            "registry.minikube.com/${rootProject.name}:${rootProject.version}"
        )
    )
}
