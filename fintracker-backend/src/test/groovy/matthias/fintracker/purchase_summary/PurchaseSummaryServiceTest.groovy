package matthias.fintracker.purchase_summary

import matthias.fintracker.common.jpa.PaginationRequest
import matthias.fintracker.common.jpa.TransactionExecutor
import org.springframework.data.domain.PageImpl
import spock.lang.Specification
import spock.lang.Subject

import java.time.Instant
import java.time.LocalDate

import static java.util.UUID.randomUUID

class PurchaseSummaryServiceTest extends Specification {

    static def idFixtures = (0..9).collect { randomUUID() }

    PurchaseSummaryRepository purchaseSummaryRepository = Mock()
    TransactionExecutor txExecutor = new TransactionExecutor()

    @Subject
    PurchaseSummaryService purchaseSummaryService = new PurchaseSummaryService(purchaseSummaryRepository, txExecutor)

    def "Should return page of purchase summaries"() {
        given:
            def request = new PaginationRequest(0, 10, "date,asc", "Au")

        when:
            def result = purchaseSummaryService.getPurchaseSummaries(request)

        then: "Should get purchase summaries from repository"
            1 * purchaseSummaryRepository.findAll(request) >> new PageImpl([
                new PurchaseSummaryEntity(idFixtures[0]).tap {
                    date = LocalDate.parse("2020-12-28")
                    shopName = "Auchan"
                    productsCount = 2
                    totalPrice = 28.28
                    createdAt = Instant.parse("2020-12-28T20:53:11Z")
                }
            ])

        and: "Should return purchase summaries"
            result.totalPages == 1
            result.totalItems == 1
            result.content.size() == 1

            verifyAll(result.content[0]) {
                id == idFixtures[0]
                date == LocalDate.parse("2020-12-28")
                shopName == "Auchan"
                productsCount == 2
                totalPrice == 28.28
                createdAt == Instant.parse("2020-12-28T20:53:11Z")
            }
    }
}
