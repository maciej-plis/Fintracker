package matthias.expense_tracker.purchase


import matthias.expense_tracker.JpaTestSpecification
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.test.context.jdbc.Sql
import spock.lang.Subject

import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.AFTER_TEST_METHOD
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.BEFORE_TEST_METHOD

@Sql(scripts = "/test-sql/purchase/init.sql", executionPhase = BEFORE_TEST_METHOD)
@Sql(scripts = "/test-sql/purchase/cleanup.sql", executionPhase = AFTER_TEST_METHOD)
class PurchaseRepositoryTest extends JpaTestSpecification {

    @Subject
    @Autowired
    PurchaseRepository purchaseRepository

    @Autowired
    TestPurchaseRepository testPurchaseRepository

    def "Should return purchase products sorted by ordinal"() {
        given:
            def purchaseId = UUID.fromString("4e172c43-2877-49ef-972c-432877b9ef96")

        when:
            def result = purchaseRepository.findByIdOrThrow(purchaseId)

        then:
            result.products.collect { it.id.toString() } == [
                "c619dedb-78fc-479b-99de-db78fcb79be1",
                "aaf640fa-b488-4907-b640-fab4886907ef",
                "ee826338-8946-4030-8263-3889468030fe"
            ]
    }

    def "When deleting purchase should set flag deleted to true without actually removing anything"() {
        given:
            def purchaseId = UUID.fromString("4e172c43-2877-49ef-972c-432877b9ef96")

        when:
            purchaseRepository.deleteById(purchaseId)

        then:
            def entity = testPurchaseRepository.getDeletedById(purchaseId)
            verifyAll(entity) {
                entity != null
                entity.deleted
                entity.products.size() == 3
            }
    }
}
