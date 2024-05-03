package matthias.fintracker

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.PropertySource

@PropertySource("classpath:/liquibase.properties")
@SpringBootApplication
class FinTrackerApplication

fun main(args: Array<String>) {
    runApplication<FinTrackerApplication>(*args)
}
