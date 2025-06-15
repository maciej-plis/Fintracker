import org.gradle.api.attributes.TestSuiteType.INTEGRATION_TEST
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile
import org.jetbrains.kotlin.gradle.utils.extendsFrom

plugins {
    id("java")
    id("jvm-test-suite")
    id("groovy")
    alias(libs.plugins.kotlin)
    alias(libs.plugins.kotlinJpa)
    alias(libs.plugins.kotlinSpring)
    alias(libs.plugins.springBoot)
    alias(libs.plugins.springDependencyManagement)
    alias(libs.plugins.openApiGenerator)
    alias(libs.plugins.dockerSpring)
    alias(libs.plugins.gitProperties)
}

val generateSchema by rootProject.tasks

val javaVersionNumber: String by project
val openApiSchemaOutput: String by project

kotlin {
    jvmToolchain(javaVersionNumber.toInt())
}

tasks.withType<KotlinCompile> {
    compilerOptions {
        freeCompilerArgs.addAll("-Xjsr305=strict")
    }
}

testing {
    suites {
        val test by getting(JvmTestSuite::class)
        val integrationTest by registering(JvmTestSuite::class) {
            testType = INTEGRATION_TEST
            targets.all {
                testTask.configure {
                    shouldRunAfter(test)
                }
            }
        }
        withType<JvmTestSuite> {
            useSpock(libs.versions.spock)
            dependencies {
                implementation(project())
                implementation(libs.springBoot.test)
                implementation(libs.spock.spring)
                implementation(libs.groovy.all)
                implementation(libs.testContainers.postgresql)
            }
        }
    }
}

configurations.named("integrationTestImplementation")
    .extendsFrom(configurations.implementation)

tasks.withType<Test> {
    environment("LIQUIBASE_DUPLICATE_FILE_MODE", "WARN")
}

dependencies {
    developmentOnly(libs.springBoot.devtools)

    // Spring
    implementation(libs.springBoot.starter)

    // Web
    implementation(libs.springBoot.web)
    implementation(libs.springBoot.validation)
    implementation(libs.springBoot.actuator)

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
    runtimeOnly(project(":fintracker-ui"))

    // OnePassword
    implementation(libs.opConnect)
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
        "src/main/kotlin/com/matthias/fintracker/api"
    )
}

//tasks.compileKotlin { dependsOn(tasks.openApiGenerate) }
//tasks.withType<KaptGenerateStubsTask> { dependsOn(tasks.openApiGenerate) }
//tasks.withType<ProcessResources> { dependsOn(tasks.openApiGenerate) }

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
            "packageName" to "com.matthias.fintracker.api",
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
                "192.168.101.61:5000/${rootProject.name}:${rootProject.version}",
            )
        )
    }
}

tasks.dockerPushImage {
    images.set(
        listOf(
            "192.168.101.61:5000/${rootProject.name}:${rootProject.version}"
        )
    )
    registryCredentials {
        username.set("user")
        password.set("password")
    }
}
