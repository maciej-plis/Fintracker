package matthias.expense_tracker.purchase_summary


import org.springframework.data.domain.PageImpl
import spock.lang.Specification

import java.time.Instant
import java.time.LocalDate

import static java.util.UUID.randomUUID
import static matthias.expense_tracker.purchase_summary.PurchaseSummaryExtensionsKt.toDTO

class PurchaseSummaryExtensionsTest extends Specification {

    static def idFixtures = (0..9).collect { randomUUID() }

    def "Should map page of PurchaseSummaryEntity to PurchaseSummaryDTO"() {
        given:
            def purchaseSummaryEntityPage = new PageImpl([
                new PurchaseSummaryEntity(idFixtures[0]).tap {
                    date = LocalDate.parse("2020-12-28")
                    shopName = "Auchan"
                    productsCount = 2
                    totalPrice = 28.28
                    createdAt = Instant.parse("2020-12-28T20:53:11Z")
                }
            ])

        when:
            def result = toDTO(purchaseSummaryEntityPage)

        then:
            verifyAll(result) {
                totalPages == 1
                totalItems == 1
                content.size() == 1
                verifyAll(content[0]) {
                    id == idFixtures[0]
                    date == LocalDate.parse("2020-12-28")
                    shopName == "Auchan"
                    productsCount == 2
                    totalPrice == 28.28d
                    createdAt == Instant.parse("2020-12-28T20:53:11Z")
                }
            }
    }


    def "Should map PurchaseSummaryEntity to PurchaseSummaryDTO"() {
        given:
            def purchaseSummaryEntity = new PurchaseSummaryEntity(idFixtures[0]).tap {
                date = LocalDate.parse("2020-12-28")
                shopName = "Auchan"
                productsCount = 2
                totalPrice = 28.28
                createdAt = Instant.parse("2020-12-28T20:53:11Z")
            }

        when:
            def result = toDTO(purchaseSummaryEntity)

        then:
            verifyAll(result) {
                id == idFixtures[0]
                date == LocalDate.parse("2020-12-28")
                shopName == "Auchan"
                productsCount == 2
                totalPrice == 28.28d
                createdAt == Instant.parse("2020-12-28T20:53:11Z")
            }
    }
}
