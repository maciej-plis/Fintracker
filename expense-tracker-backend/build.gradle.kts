import org.gradle.api.JavaVersion.VERSION_17

plugins {
    id("org.springframework.boot") version "2.7.2"
    id("io.spring.dependency-management") version "1.0.11.RELEASE"
    id("com.palantir.docker") version "0.34.0"
    java
    groovy
}

group = rootProject.group
version = rootProject.version

java {
    sourceCompatibility = VERSION_17
    targetCompatibility = VERSION_17
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

    annotationProcessor("org.mapstruct:mapstruct-processor:1.5.1.Final")
    compileOnly("org.mapstruct:mapstruct:1.5.1.Final")

    implementation(project(":expense-tracker-backend-api"))

    implementation("org.springframework.boot:spring-boot-starter")
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-validation")

//    runtimeOnly(project(":expense-tracker-frontend"))

    runtimeOnly("org.liquibase:liquibase-core:4.11.0")
    runtimeOnly("org.postgresql:postgresql:42.3.6")

    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.spockframework:spock-spring:2.1-groovy-3.0")
    testImplementation("org.mapstruct:mapstruct:1.4.2.Final")
    testImplementation("org.codehaus.groovy:groovy-json:3.0.11")

    integrationTestRuntimeOnly("com.h2database:h2:2.1.212")
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