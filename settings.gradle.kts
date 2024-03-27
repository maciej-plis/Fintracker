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
    "expense-tracker-backend",
    "expense-tracker-ui",
)
