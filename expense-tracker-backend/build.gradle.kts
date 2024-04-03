import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    id("java")
    id("groovy")
    alias(libs.plugins.kotlin)
    alias(libs.plugins.kotlinJpa)
    alias(libs.plugins.kotlinSpring)
    alias(libs.plugins.springBoot)
    alias(libs.plugins.springDependencyManagement)
    alias(libs.plugins.openApiGenerator)
    alias(libs.plugins.dockerSpring)
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
    developmentOnly(libs.springBoot.devtools)

    // Spring
    implementation(libs.springBoot.starter)

    // Web
    implementation(libs.springBoot.web)
    implementation(libs.springBoot.validation)

    // Database
    implementation(libs.springBoot.jpa)
    implementation(libs.springBoot.jpaRsql)
    runtimeOnly(libs.postgresql)
    runtimeOnly(libs.liquibase)

    // Kotlin Support
    implementation(libs.kotlin.stdlib)
    implementation(libs.kotlin.reflection)
    implementation(libs.kotlin.jackson)

    // OpenApi
    implementation(libs.swaggerAnnotations)

    // UI
    runtimeOnly(project(":expense-tracker-ui"))

    // Test
    testImplementation(libs.springBoot.test)
    testImplementation(libs.spock.spring)
    testImplementation(libs.groovy.all)
    testImplementation(libs.testContainers.postgresql)
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

tasks.compileKotlin {
    dependsOn(tasks.openApiGenerate)
}

tasks.withType<ProcessResources> {
    dependsOn(tasks.openApiGenerate)
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
