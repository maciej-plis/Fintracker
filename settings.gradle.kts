pluginManagement {
    repositories {
        gradlePluginPortal()
        mavenCentral()
    }
}

dependencyResolutionManagement {
    repositories {
        mavenCentral()
    }
}

rootProject.name = extra["name"] as String

include(
    "fintracker-backend",
    "fintracker-ui",
)
