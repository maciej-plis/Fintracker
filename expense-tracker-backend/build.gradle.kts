import org.gradle.jvm.toolchain.JavaLanguageVersion.of

plugins {
    id("org.springframework.boot") version "2.7.5"
    id("io.spring.dependency-management") version "1.1.0"
    id("com.palantir.docker") version "0.34.0"
    java
    groovy
    kotlin("jvm") version "1.7.20"
    kotlin("kapt") version "1.7.20"
    kotlin("plugin.jpa") version "1.7.20"
    kotlin("plugin.spring") version "1.7.20"
}

group = rootProject.group
version = rootProject.version

java {
    toolchain {
        languageVersion.set(of(17))
    }
}

kotlin {
    jvmToolchain {
        languageVersion.set(of(17))
    }
}

kapt {
    keepJavacAnnotationProcessors = true
}

sourceSets {
    create("integrationTest") {
        groovy {
            srcDir("$projectDir/src/integration-test/groovy")
            compileClasspath += sourceSets.main.get().output
            runtimeClasspath += sourceSets.main.get().output
        }
        resources.srcDir("$projectDir/src/integration-test/resources")
    }
}

val integrationTestRuntimeOnly = configurations["integrationTestRuntimeOnly"].extendsFrom(configurations.testRuntimeOnly.get())
val integrationTestImplementation = configurations["integrationTestImplementation"].extendsFrom(configurations.testImplementation.get())

repositories {
    mavenCentral()
}

dependencies {
    developmentOnly("org.springframework.boot:spring-boot-devtools")

    annotationProcessor("org.projectlombok:lombok:1.18.24")
    compileOnly("org.projectlombok:lombok:1.18.24")

    annotationProcessor("org.mapstruct:mapstruct-processor:1.5.3.Final")
    compileOnly("org.mapstruct:mapstruct:1.5.3.Final")

    implementation(project(":expense-tracker-backend-api"))

    implementation("org.springframework.boot:spring-boot-starter")
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-webflux")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.data:spring-data-r2dbc")
    implementation("org.springframework.boot:spring-boot-starter-validation")

    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")

//    runtimeOnly(project(":expense-tracker-frontend"))

    runtimeOnly("org.liquibase:liquibase-core:4.17.0")
    runtimeOnly("org.postgresql:postgresql:42.5.0")

    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.spockframework:spock-spring:2.3-groovy-3.0")
    testImplementation("org.mapstruct:mapstruct:1.5.3.Final")
    testImplementation("org.codehaus.groovy:groovy-json:3.0.13")

    integrationTestRuntimeOnly("com.h2database:h2:2.1.214")
}

tasks.test {
    useJUnitPlatform()
}

val integrationTest = task<Test>("integrationTest") {
    description = "Run integration tests."
    group = "verification"

    useJUnitPlatform()

    testClassesDirs = sourceSets["integrationTest"].output.classesDirs
    classpath = sourceSets["integrationTest"].runtimeClasspath

    shouldRunAfter("test")
}

tasks.check {
    dependsOn(integrationTest)
}

tasks.compileJava {
    options.compilerArgs.addAll(
        listOf(
            "-Amapstruct.defaultComponentModel=spring",
            "-Amapstruct.defaultInjectionStrategy=constructor",
            "-Amapstruct.unmappedTargetPolicy=ERROR"
        )
    )
}

tasks.bootJar {
    manifest.attributes(
        "Implementation-Title" to "Expense Tracker",
        "Implementation-Version" to project.version
    )
}

docker {
    val bootJar = tasks.bootJar.get()
    val imgName = rootProject.name
    val imgVersion = rootProject.version

    setDockerfile(file("$rootDir/docker/Dockerfile"))

    name = "$imgName:$imgVersion"
    tag("latest", "$imgName:latest")

    files(
        bootJar.archiveFile.get()
    )

    buildArgs(
        mapOf(
            "JAR_FILE" to bootJar.archiveFileName.get()
        )
    )
}