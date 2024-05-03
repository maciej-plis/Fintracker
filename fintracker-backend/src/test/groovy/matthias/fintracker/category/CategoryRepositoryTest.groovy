package matthias.fintracker.category

import matthias.fintracker.JpaTestSpecification
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.test.context.jdbc.Sql
import spock.lang.Subject

import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.AFTER_TEST_METHOD
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.BEFORE_TEST_METHOD

@Sql(scripts = "/test-sql/category/init.sql", executionPhase = BEFORE_TEST_METHOD)
@Sql(scripts = "/test-sql/category/cleanup.sql", executionPhase = AFTER_TEST_METHOD)
class CategoryRepositoryTest extends JpaTestSpecification {

    @Subject
    @Autowired
    CategoryRepository categoryRepository

    def "Should check if category exists by name ignoring case"() {
        expect:
            categoryRepository.existsByNameIgnoreCase(name) == expectedResult

        where:
            name   | expectedResult
            "Food" | true
            "food" | true
            "Foo"  | false
            ""     | false
    }

    def "Should find all categories and sort them asc by name"() {
        expect:
            categoryRepository.findAllByOrderByName().collect { it.id.toString() } == [
                "fdaa5154-cdd9-4ec7-aa51-54cdd9aec7f4",
                "c0973cc8-3f62-40da-973c-c83f6250daa4",
                "df477e32-4f7e-48d8-877e-324f7e08d8b6",
                "fa962940-c85f-451f-9629-40c85f151fd1"
            ]

    }
}
