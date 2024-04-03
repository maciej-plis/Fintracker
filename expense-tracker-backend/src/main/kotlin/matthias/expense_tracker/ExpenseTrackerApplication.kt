package matthias.expense_tracker

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.PropertySource

@PropertySource("classpath:/liquibase.properties")
@SpringBootApplication
class ExpenseTrackerApplication

fun main(args: Array<String>) {
    runApplication<ExpenseTrackerApplication>(*args)
}
