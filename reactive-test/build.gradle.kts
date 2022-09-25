import org.gradle.api.JavaVersion.VERSION_17

plugins {
    id("org.springframework.boot") version "2.7.2"
    id("io.spring.dependency-management") version "1.0.11.RELEASE"
    java
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
    developmentOnly("org.springframework.boot:spring-boot-devtools")

    annotationProcessor("org.projectlombok:lombok")
    compileOnly("org.projectlombok:lombok")

    annotationProcessor("org.mapstruct:mapstruct-processor:1.5.1.Final")
    compileOnly("org.mapstruct:mapstruct:1.5.1.Final")

    implementation(project(":expense-tracker-backend-api"))

    implementation("org.springframework.boot:spring-boot-starter-webflux")
    implementation("org.springframework.data:spring-data-r2dbc")

    runtimeOnly("org.liquibase:liquibase-core:4.11.0")
    runtimeOnly("org.postgresql:postgresql:42.3.6")
    runtimeOnly("io.r2dbc:r2dbc-postgresql:0.8.12.RELEASE")

}

tasks.compileJava {
    options.compilerArgs.addAll(
        listOf(
            "-Amapstruct.defaultComponentModel=spring",
            "-Amapstruct.unmappedTargetPolicy=ERROR"
        )
    )
}