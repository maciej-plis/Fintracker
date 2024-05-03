package matthias.fintracker.purchase

import matthias.fintracker.api.models.AddProductRequest
import matthias.fintracker.api.models.AddPurchaseRequest
import matthias.fintracker.category.CategoryEntity
import matthias.fintracker.product.ProductEntity
import matthias.fintracker.shop.ShopEntity
import spock.lang.Specification
import spock.lang.Unroll

import java.time.LocalDate

import static java.util.UUID.randomUUID
import static matthias.fintracker.purchase.PurchaseExtensionsKt.toDTO
import static matthias.fintracker.purchase.PurchaseExtensionsKt.toEntity

class PurchaseExtensionsTest extends Specification {

    static def idFixtures = (0..9).collect { randomUUID() }

    @Unroll
    def "Should map AddPurchaseRequest to ShopEntity #testCase"() {
        given:
            def addPurchaseRequest = new AddPurchaseRequest(
                idFixtures[0],
                LocalDate.parse("2020-12-28"),
                [
                    new AddProductRequest(idFixtures[0], "Bread", 1, 2.99, null, null),
                    new AddProductRequest(idFixtures[1], "Crowbar", 1, 29.68, idFixtures[0], ""),
                    new AddProductRequest(idFixtures[0], "Meat", 1.468, 15.11, idFixtures[1], "Chicken"),
                ]
            )

        when:
            def result = toEntity(addPurchaseRequest, purchaseId)

        then:
            verifyAll(result) {
                verifyIdFunc.call(id)
                date == LocalDate.parse("2020-12-28")
                shop.id == idFixtures[0]
                verifyAll(products[0]) {
                    id != null
                    category.id == idFixtures[0]
                    name == "Bread"
                    amount == 1d
                    price == 2.99d
                    description == null
                }
                verifyAll(products[1]) {
                    id != idFixtures[0]
                    category.id == idFixtures[1]
                    name == "Crowbar"
                    amount == 1d
                    price == 29.68d
                    description == ""
                }
                verifyAll(products[2]) {
                    id != idFixtures[1]
                    category.id == idFixtures[0]
                    name == "Meat"
                    amount == 1.468d
                    price == 15.11d
                    description == "Chicken"
                }
                deleted == false
            }

        where:
            purchaseId    | verifyIdFunc              || testCase
            null          | ({ it != null })          || "without id"
            idFixtures[0] | ({ it == idFixtures[0] }) || "with id"
    }

    def "Should map ShopEntity to ShopDTO"() {
        given:
            def purchaseEntity = new PurchaseEntity(idFixtures[0]).tap {
                shop = new ShopEntity(idFixtures[0]).tap { name = "Auchan" }
                date = LocalDate.parse("2020-12-28")
                products = [
                    new ProductEntity(idFixtures[0]).tap {
                        category = new CategoryEntity(idFixtures[0]).tap { name = "Food" }
                        name = "Bread"
                        amount = 1
                        price = 2.99
                        description = null
                    },
                    new ProductEntity(idFixtures[1]).tap {
                        category = new CategoryEntity(idFixtures[1]).tap { name = "Hobby" }
                        name = "Screws"
                        amount = 0.097
                        price = 9.99
                        description = "For woodworking project"
                    }
                ]
            }

        when:
            def result = toDTO(purchaseEntity)

        then:
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
                    price == 2.99d
                    description == null
                }
                verifyAll(products[1]) {
                    id == idFixtures[1]
                    category.id == idFixtures[1]
                    category.name == "Hobby"
                    name == "Screws"
                    amount == 0.097d
                    price == 9.99d
                    description == "For woodworking project"
                }
            }
    }
}
