package matthias.expense_tracker.purchase

import matthias.expense_tracker.api.models.AddProductRequest
import matthias.expense_tracker.api.models.AddPurchaseRequest
import matthias.expense_tracker.api.models.UpdateProductRequest
import matthias.expense_tracker.api.models.UpdatePurchaseRequest
import matthias.expense_tracker.category.CategoryEntity
import matthias.expense_tracker.common.jpa.TransactionExecutor
import matthias.expense_tracker.product.ProductEntity
import matthias.expense_tracker.shop.ShopEntity
import spock.lang.Specification
import spock.lang.Subject

import java.time.LocalDate

import static java.util.UUID.randomUUID

class PurchaseServiceTest extends Specification {

    static def idFixtures = (0..9).collect { randomUUID() }

    PurchaseRepository purchaseRepository = Mock()
    TransactionExecutor txExecutor = new TransactionExecutor()

    @Subject
    PurchaseService purchaseService = new PurchaseService(purchaseRepository, txExecutor)

    def "Should return purchase for id"() {
        given:
            def purchaseId = idFixtures[0]

        when:
            def result = purchaseService.getPurchaseOrThrow(purchaseId)

        then: "Should get purchase from repository"
            1 * purchaseRepository.findByIdOrThrow(idFixtures[0]) >> purchaseEntityFixture()

        and: "Should return purchase"
            verifyAll(result) {
                id == idFixtures[0]
                shop.id == idFixtures[0]
                shop.name == "Auchan"
                date == LocalDate.parse("2020-12-28")
                verifyAll(products[0]) {
                    id == idFixtures[0]
                    category.id == idFixtures[0]
                    category.name == "Food"
                    name == "Bread"
                    amount == 1d
                    price == 1.99d
                    description == null
                }
                verifyAll(products[1]) {
                    id == idFixtures[1]
                    category.id == idFixtures[1]
                    category.name == "Clothes"
                    name == "T-Shirt"
                    amount == 2d
                    price == 29.99d
                    description == "Metallica T-Shirts"
                }
            }

    }

    def "Should save new purchase and return its id"() {
        given:
            def request = new AddPurchaseRequest(
                idFixtures[0],
                LocalDate.parse("2020-12-28"),
                [
                    new AddProductRequest(idFixtures[0], "Bread", 1, 1.99, null, null),
                    new AddProductRequest(idFixtures[1], "T-Shirt", 2, 29.99, null, "Metallica T-Shirts")
                ]
            )

        and:
            PurchaseEntity savedPurchase = null

        when:
            def result = purchaseService.addPurchase(request)

        then: "Should save purchase"
            1 * purchaseRepository.save(_ as PurchaseEntity) >> { PurchaseEntity purchase ->
                verifyAll(purchase) {
                    id != null
                    shop.id == idFixtures[0]
                    date == LocalDate.parse("2020-12-28")
                    verifyAll(products[0]) {
                        id != null
                        category.id == idFixtures[0]
                        name == "Bread"
                        amount == 1d
                        price == 1.99d
                        description == null
                    }
                    verifyAll(products[1]) {
                        id != null
                        category.id == idFixtures[1]
                        name == "T-Shirt"
                        amount == 2d
                        price == 29.99d
                        description == "Metallica T-Shirts"
                    }
                }
                return savedPurchase = purchase
            }

        and: "Should return saved purchase id"
            result == savedPurchase?.id
    }

    def "Should update purchase"() {
        given:
            def purchaseId = idFixtures[0]
            def request = new UpdatePurchaseRequest(
                idFixtures[9],
                LocalDate.parse("2022-01-01"),
                [
                    new UpdateProductRequest(idFixtures[0], "Potatoes", 0.365, 0.99, idFixtures[0], "For dinner"),
                    new UpdateProductRequest(idFixtures[9], "Wrench", 1, 15.99, null, null)
                ]
            )

        and:
            def purchaseEntity = purchaseEntityFixture()

        when:
            purchaseService.updatePurchase(purchaseId, request)

        then: "Should get purchase from repository"
            1 * purchaseRepository.getReferenceById(idFixtures[0]) >> purchaseEntity

        and: "Should update purchase"
            verifyAll(purchaseEntity) {
                id == idFixtures[0]
                shop.id == idFixtures[9]
                date == LocalDate.parse("2022-01-01")
                verifyAll(products[0]) {
                    id == idFixtures[0]
                    category.id == idFixtures[0]
                    name == "Potatoes"
                    amount == 0.365d
                    price == 0.99d
                    description == "For dinner"
                }
                verifyAll(products[1]) {
                    id != null
                    category.id == idFixtures[9]
                    name == "Wrench"
                    amount == 1d
                    price == 15.99d
                    description == null
                }
            }
    }

    def "Should remove purchase"() {
        given:
            def purchaseId = idFixtures[0]

        when:
            purchaseService.removePurchase(purchaseId)

        then: "Should delete purchase from repository"
            1 * purchaseRepository.deleteById(idFixtures[0])
    }

    def "Should remove purchases"() {
        given:
            def purchaseIds = [idFixtures[0], idFixtures[1]]

        when:
            purchaseService.removePurchases(purchaseIds)

        then: "Should delete purchases from repository"
            1 * purchaseRepository.deleteAllById([idFixtures[0], idFixtures[1]])
    }

    private static PurchaseEntity purchaseEntityFixture() {
        return new PurchaseEntity(idFixtures[0]).tap {
            shop = new ShopEntity(idFixtures[0]).tap { name = "Auchan" }
            date = LocalDate.parse("2020-12-28")
            products = [
                new ProductEntity(idFixtures[0]).tap {
                    category = new CategoryEntity(idFixtures[0]).tap { name = "Food" }
                    name = "Bread"
                    amount = 1
                    price = 1.99
                    description = null
                },
                new ProductEntity(idFixtures[1]).tap {
                    category = new CategoryEntity(idFixtures[1]).tap { name = "Clothes" }
                    name = "T-Shirt"
                    amount = 2
                    price = 29.99
                    description = "Metallica T-Shirts"
                },
            ]
        }
    }
}
