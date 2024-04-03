package matthias.expense_tracker.shop

import matthias.expense_tracker.JpaTestSpecification
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.test.context.jdbc.Sql
import spock.lang.Subject

import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.AFTER_TEST_METHOD
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.BEFORE_TEST_METHOD

@Sql(scripts = "/test-sql/shop/init.sql", executionPhase = BEFORE_TEST_METHOD)
@Sql(scripts = "/test-sql/shop/cleanup.sql", executionPhase = AFTER_TEST_METHOD)
class ShopRepositoryTest extends JpaTestSpecification {

    @Subject
    @Autowired
    ShopRepository shopRepository

    def "Should check if shop exists by name ignoring case"() {
        expect:
            shopRepository.existsByNameIgnoreCase(name) == expectedResult

        where:
            name     | expectedResult
            "Auchan" | true
            "auchan" | true
            "aucha"  | false
            ""       | false
    }

    def "Should find all shop and sort them asc by name"() {
        expect:
            shopRepository.findAllByOrderByName().collect { it.id.toString() } == [
                "fa962940-c85f-451f-9629-40c85f151fd1",
                "fdaa5154-cdd9-4ec7-aa51-54cdd9aec7f4",
                "c0973cc8-3f62-40da-973c-c83f6250daa4",
                "df477e32-4f7e-48d8-877e-324f7e08d8b6"
            ]
    }
}
