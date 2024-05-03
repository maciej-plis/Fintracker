package matthias.fintracker.purchase_summary

import matthias.fintracker.JpaTestSpecification
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.test.context.jdbc.Sql
import spock.lang.Subject

import java.time.Instant
import java.time.LocalDate

import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.AFTER_TEST_METHOD
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.BEFORE_TEST_METHOD

@Sql(scripts = "/test-sql/purchase-summary/init.sql", executionPhase = BEFORE_TEST_METHOD)
@Sql(scripts = "/test-sql/purchase-summary/cleanup.sql", executionPhase = AFTER_TEST_METHOD)
class PurchaseSummaryRepositoryTest extends JpaTestSpecification {

    @Subject
    @Autowired
    PurchaseSummaryRepository purchaseSummaryRepository

    def "Should aggregate purchase summary"() {
        given:
            def purchaseId = UUID.fromString("4e172c43-2877-49ef-972c-432877b9ef96")

        when:
            def result = purchaseSummaryRepository.findById(purchaseId).get()

        then:
            verifyAll(result) {
                id == UUID.fromString("4e172c43-2877-49ef-972c-432877b9ef96")
                date == LocalDate.parse("2022-12-12")
                shopName == "Leroy Merlin"
                productsCount == 3
                totalPrice == 318.46854d
                createdAt == Instant.parse("2023-01-01T00:00:00Z")
            }
    }

//    def "Should page purchase summaries"() {
//        when:
//            def result = purchaseSummaryRepository.findAll()
//    }
}
