package matthias.fintracker.purchase

import jakarta.persistence.EntityNotFoundException
import matthias.fintracker.api.models.*
import org.spockframework.spring.SpringBean
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.test.web.servlet.MockMvc
import spock.lang.Specification

import java.time.LocalDate

import static groovy.json.JsonOutput.toJson
import static java.util.UUID.randomUUID
import static org.hamcrest.Matchers.hasSize
import static org.springframework.http.MediaType.APPLICATION_JSON
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

@WebMvcTest(PurchaseController)
class PurchaseControllerTest extends Specification {

    static def idFixtures = (0..9).collect { randomUUID() }

    @SpringBean
    PurchaseService purchaseService = Mock()

    @Autowired
    MockMvc mockMvc

    def "Should return 200 (OK) with purchase"() {
        given:
            def purchaseId = idFixtures[0]

        when:
            def result = mockMvc.perform(
                get("/api/purchases/$purchaseId")
            ).andDo(print())

        then: "Should obtain purchase from service"
            1 * purchaseService.getPurchaseOrThrow(idFixtures[0]) >> new PurchaseDTO(
                idFixtures[0],
                new ShopDTO(idFixtures[0], "Auchan"),
                LocalDate.parse("2020-12-28"),
                [
                    new ProductDTO(idFixtures[0], new CategoryDTO(idFixtures[0], "Food"), "Bread", 1, 1.99, null),
                    new ProductDTO(idFixtures[1], new CategoryDTO(idFixtures[1], "Clothes"), "T-Shirt", 2, 29.99, "Metallica T-Shirts")
                ]
            )

        and: "Should return 200 (OK) with purchase"
            verifyAll(result) {
                andExpect(status().isOk())
                andExpect(jsonPath('$.id').value(idFixtures[0].toString()))
                andExpect(jsonPath('$.shop.id').value(idFixtures[0].toString()))
                andExpect(jsonPath('$.shop.name').value("Auchan"))
                andExpect(jsonPath('$.date').value("2020-12-28"))
                andExpect(jsonPath('$.products', hasSize(2)))

                andExpect(jsonPath('$.products[0].id').value(idFixtures[0].toString()))
                andExpect(jsonPath('$.products[0].name').value("Bread"))
                andExpect(jsonPath('$.products[0].amount').value(1))
                andExpect(jsonPath('$.products[0].price').value(1.99))
                andExpect(jsonPath('$.products[0].description').value(null))
                andExpect(jsonPath('$.products[0].category.id').value(idFixtures[0].toString()))
                andExpect(jsonPath('$.products[0].category.name').value("Food"))

                andExpect(jsonPath('$.products[1].id').value(idFixtures[1].toString()))
                andExpect(jsonPath('$.products[1].name').value("T-Shirt"))
                andExpect(jsonPath('$.products[1].amount').value(2))
                andExpect(jsonPath('$.products[1].price').value(29.99))
                andExpect(jsonPath('$.products[1].description').value("Metallica T-Shirts"))
                andExpect(jsonPath('$.products[1].category.id').value(idFixtures[1].toString()))
                andExpect(jsonPath('$.products[1].category.name').value("Clothes"))
            }
    }

    def "Should return 404 (NOT_FOUND) when purchase doesn't exist"() {
        given:
            def purchaseId = idFixtures[0]

        when:
            def result = mockMvc.perform(
                get("/api/purchases/$purchaseId")
            ).andDo(print())

        then: "Should obtain purchase from service"
            1 * purchaseService.getPurchaseOrThrow(idFixtures[0]) >> {
                throw new EntityNotFoundException("Purchase doesn't exist")
            }

        and: "Should return 404 (NOT_FOUND)"
            verifyAll(result) {
                andExpect(status().isNotFound())
            }
    }

    def "Should return 200 (OK) with purchase id"() {
        given:
            def requestBody = createPurchaseRequestBody()

        when:
            def result = mockMvc.perform(
                post("/api/purchases")
                    .content(requestBody)
                    .contentType(APPLICATION_JSON)
            ).andDo(print())

        then: "Should save category using service"
            1 * purchaseService.addPurchase(_ as AddPurchaseRequest) >> { AddPurchaseRequest request ->
                verifyAll(request) {
                    shopId == idFixtures[0]
                    date == LocalDate.parse("2020-12-20")
                    verifyAll(products[0]) {
                        categoryId == idFixtures[0]
                        name == "Bread"
                        amount == 1d
                        price == 1.99d
                        description == null
                    }
                    verifyAll(products[1]) {
                        categoryId == idFixtures[1]
                        name == "T-Shirt"
                        amount == 2d
                        price == 29.99d
                        description == "Metallica T-Shirts"
                    }
                }
                return idFixtures[0]
            }

        and: "Should return 200 (OK) with purchase id"
            verifyAll(result) {
                andExpect(status().isOk())
                andExpect(jsonPath('$').value(idFixtures[0].toString()))
            }
    }

    def "Should return 204 (NO_CONTENT) when updating purchase"() {
        given:
            def purchaseId = idFixtures[0]
            def requestBody = updatePurchaseRequestBody()

        when:
            def result = mockMvc.perform(
                put("/api/purchases/$purchaseId")
                    .content(requestBody)
                    .contentType(APPLICATION_JSON)
            ).andDo(print())

        then: "Should update purchase using service"
            1 * purchaseService.updatePurchase(idFixtures[0], _ as UpdatePurchaseRequest) >> { _, UpdatePurchaseRequest request ->
                verifyAll(request) {
                    shopId == idFixtures[0]
                    date == LocalDate.parse("2020-12-20")
                    verifyAll(products[0]) {
                        id == idFixtures[0]
                        categoryId == idFixtures[0]
                        name == "Bread"
                        amount == 1d
                        price == 1.99d
                        description == null
                    }
                    verifyAll(products[1]) {
                        categoryId == idFixtures[1]
                        name == "T-Shirt"
                        amount == 2d
                        price == 29.99d
                        description == "Metallica T-Shirts"
                    }
                }
            }

        and: "Should return 204 (NO_CONTENT)"
            verifyAll(result) {
                andExpect(status().isNoContent())
            }
    }

    def "Should return 204 (NO_CONTENT) when deleting purchase"() {
        given:
            def purchaseId = idFixtures[0]

        when:
            def result = mockMvc.perform(
                delete("/api/purchases/$purchaseId")
            ).andDo(print())

        then: "Should delete purchase using service"
            1 * purchaseService.removePurchase(idFixtures[0])

        and: "Should return 204 (NO_CONTENT)"
            verifyAll(result) {
                andExpect(status().isNoContent())
            }
    }

    def "Should return 204 (NO_CONTENT) when deleting purchases"() {
        given:
            def purchaseIds = [idFixtures[0], idFixtures[1]]
            def requestBody = deletePurchasesRequestBody(purchaseIds)

        when:
            def result = mockMvc.perform(
                delete("/api/purchases")
                    .content(requestBody)
                    .contentType(APPLICATION_JSON)
            ).andDo(print())

        then: "Should delete purchases using service"
            1 * purchaseService.removePurchases([idFixtures[0], idFixtures[1]])

        and: "Should return 204 (NO_CONTENT)"
            verifyAll(result) {
                andExpect(status().isNoContent())
            }
    }

    private static String createPurchaseRequestBody() {
        return toJson([
            shopId  : idFixtures[0],
            date    : "2020-12-20",
            products: [
                [
                    name       : "Bread",
                    amount     : 1,
                    price      : 1.99,
                    description: null,
                    categoryId : idFixtures[0]
                ],
                [
                    name       : "T-Shirt",
                    amount     : 2,
                    price      : 29.99,
                    description: "Metallica T-Shirts",
                    categoryId : idFixtures[1]
                ]
            ]
        ])
    }

    private static String updatePurchaseRequestBody() {
        return toJson([
            shopId  : idFixtures[0],
            date    : "2020-12-20",
            products: [
                [
                    id        : idFixtures[0],
                    name       : "Bread",
                    amount     : 1,
                    price      : 1.99,
                    description: null,
                    categoryId: idFixtures[0]
                ],
                [
                    name       : "T-Shirt",
                    amount     : 2,
                    price      : 29.99,
                    description: "Metallica T-Shirts",
                    categoryId: idFixtures[1]
                ]
            ]
        ])
    }

    private static deletePurchasesRequestBody(List<UUID> purchaseIds) {
        return toJson([
            ids: purchaseIds
        ])
    }
}
