package matthias.fintracker


import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.DynamicPropertyRegistry
import org.springframework.test.context.DynamicPropertySource
import org.testcontainers.containers.PostgreSQLContainer
import spock.lang.Specification

@ActiveProfiles("it")
@SpringBootTest
class IntegrationTestSpecification extends Specification {

    static def postgreSQLContainer = new PostgreSQLContainer("postgres:latest")
        .withDatabaseName("fintracker-it")
        .withUsername("pgUser")
        .withPassword("pgPassword")
        .tap { start() }


    @DynamicPropertySource
    static void postgreSQLProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgreSQLContainer::getJdbcUrl)
        registry.add("spring.datasource.password", postgreSQLContainer::getPassword)
        registry.add("spring.datasource.username", postgreSQLContainer::getUsername)
    }
}
