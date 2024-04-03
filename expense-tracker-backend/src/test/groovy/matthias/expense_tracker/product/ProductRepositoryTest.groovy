package matthias.expense_tracker.product

import matthias.expense_tracker.JpaTestSpecification
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.test.context.jdbc.Sql
import spock.lang.Subject

import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.AFTER_TEST_METHOD
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.BEFORE_TEST_METHOD

@Sql(scripts = "/test-sql/product/init.sql", executionPhase = BEFORE_TEST_METHOD)
@Sql(scripts = "/test-sql/product/cleanup.sql", executionPhase = AFTER_TEST_METHOD)
class ProductRepositoryTest extends JpaTestSpecification {

    @Subject
    @Autowired
    ProductRepository productRepository

    def "Should find product containing string and order them asc"() {
        expect:
            productRepository.findProductNamesContainingOrderAsc(nameQuery) == expectedResult

        where:
            nameQuery   | expectedResult
            "am"        | ["Ammeter", "Lamp"]
            "ate"       | ["Chocolate"]
            ""          | ["Ammeter", "Bread", "Chocolate", "Drill", "Lamp", "Nuts", "Screws"]
            "blablabla" | []
    }
}
