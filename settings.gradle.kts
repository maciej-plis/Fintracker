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

rootProject.name = "expense-tracker"

include(
    "expense-tracker-backend",
    "expense-tracker-frontend",
    "expense-tracker-ui",
    "openApi"
)