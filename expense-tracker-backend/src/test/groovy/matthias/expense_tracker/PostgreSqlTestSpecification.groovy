package matthias.expense_tracker

import org.springframework.test.context.DynamicPropertyRegistry
import org.springframework.test.context.DynamicPropertySource
import org.testcontainers.containers.PostgreSQLContainer
import spock.lang.Execution
import spock.lang.Specification

import static org.spockframework.runtime.model.parallel.ExecutionMode.SAME_THREAD

@Execution(SAME_THREAD)
class PostgreSqlTestSpecification extends Specification {

    static def postgreSqlContainer = new PostgreSQLContainer("postgres:latest")
        .withDatabaseName("expense-tracker-test")
        .withUsername("pgUser")
        .withPassword("pgPassword")
        .tap { start() }

    @DynamicPropertySource
    static void propertiesOverride(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgreSqlContainer::getJdbcUrl)
        registry.add("spring.datasource.password", postgreSqlContainer::getPassword)
        registry.add("spring.datasource.username", postgreSqlContainer::getUsername)
    }
}
