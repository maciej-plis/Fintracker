package matthias.expense_tracker.purchase


import matthias.expense_tracker.MvcIntegrationTestSpecification
import matthias.expense_tracker.common.jpa.TransactionExecutor
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.test.context.jdbc.Sql

import static groovy.json.JsonOutput.toJson
import static java.time.LocalDate.parse
import static org.hamcrest.Matchers.hasSize
import static org.springframework.http.MediaType.APPLICATION_JSON
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.AFTER_TEST_METHOD
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.BEFORE_TEST_METHOD
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

@Sql(scripts = "/test-sql/purchase/init.sql", executionPhase = BEFORE_TEST_METHOD)
@Sql(scripts = "/test-sql/purchase/cleanup.sql", executionPhase = AFTER_TEST_METHOD)
class PurchaseIT extends MvcIntegrationTestSpecification {

    @Autowired
    TestPurchaseRepository purchaseRepository

    @Autowired
    TransactionExecutor txExecutor

    def "Should return status 200 (OK) with purchase"() {
        given:
            String purchaseId = "b0d87032-5c1e-4500-9870-325c1ed50005"

        when:
            def result = mvc.perform(
                get("/api/purchases/$purchaseId")
            ).andDo(print())


        then: "Should return 200 (OK) with purchase"
            verifyAll(result) {
                andExpect(status().isOk())

                andExpect(jsonPath('$.id').value("b0d87032-5c1e-4500-9870-325c1ed50005"))
                andExpect(jsonPath('$.date').value("2021-01-01"))
                andExpect(jsonPath('$.shop.id').value("52b29637-629d-4a10-b296-37629d8a104b"))
                andExpect(jsonPath('$.shop.name').value("Auchan"))
                andExpect(jsonPath('$.products', hasSize(2)))

                andExpect(jsonPath('$.products[0].id').value("eb1e3c4e-8640-4e83-9e3c-4e8640be834a"))
                andExpect(jsonPath('$.products[0].name').value("Bread"))
                andExpect(jsonPath('$.products[0].amount').value(1))
                andExpect(jsonPath('$.products[0].price').value(1.99))
                andExpect(jsonPath('$.products[0].description').value(""))
                andExpect(jsonPath('$.products[0].category.id').value("e385edcf-3028-4548-85ed-cf30282548f2"))
                andExpect(jsonPath('$.products[0].category.name').value("Food"))

                andExpect(jsonPath('$.products[1].id').value("7d1eac4e-39da-409c-9eac-4e39da009c13"))
                andExpect(jsonPath('$.products[1].name').value("Bananas"))
                andExpect(jsonPath('$.products[1].amount').value(0.234))
                andExpect(jsonPath('$.products[1].price').value(29.99))
                andExpect(jsonPath('$.products[1].description').value("Eco"))
                andExpect(jsonPath('$.products[1].category.id').value("4bbdfc73-d409-4ede-bdfc-73d4091edeb2"))
                andExpect(jsonPath('$.products[1].category.name').value("Fruits"))
            }
    }

    def "Should save new purchase and return status 200 (OK) with purchase id"() {
        given:
            String requestBody = createPurchaseRequestBody()

        when:
            def result = mvc.perform(
                post("/api/purchases")
                    .content(requestBody)
                    .contentType(APPLICATION_JSON)
            ).andDo(print())

        then: "Should save new purchase"
            PurchaseEntity createdPurchase
            txExecutor.readTx {
                createdPurchase = purchaseRepository.findLatest()
                verifyAll(createdPurchase) {
                    id != null
                    date == parse("2020-12-20")
                    shop.id == UUID.fromString("52b29637-629d-4a10-b296-37629d8a104b")
                    shop.name == "Auchan"
                    products.size() == 2
                    verifyAll(products[0]) {
                        id != null
                        name == "Bread"
                        amount == 1d
                        price == 1.99d
                        description == ""
                        category.id == UUID.fromString("e385edcf-3028-4548-85ed-cf30282548f2")
                        category.name == "Food"
                    }
                    verifyAll(products[1]) {
                        id != null
                        name == "Candies"
                        amount == 0.234d
                        price == 29.99d
                        description == "My favourite"
                        category.id == UUID.fromString("e945a735-5dcc-45f6-85a7-355dcca5f68c")
                        category.name == "Sweets"
                    }
                }
                return true
            }

        and: "Should return 200 (OK) with created resource id"
            verifyAll(result) {
                andExpect(status().isOk())
                andExpect(jsonPath('$').value(createdPurchase.id.toString()))
            }
    }

    def "Should update purchase and return status 204 (NO_CONTENT)"() {
        given:
            String purchaseId = "b0d87032-5c1e-4500-9870-325c1ed50005"
            String requestBody = updatePurchaseRequestBody()

        when:
            def result = mvc.perform(
                put("/api/purchases/$purchaseId")
                    .content(requestBody)
                    .contentType(APPLICATION_JSON)
            ).andDo(print())

        then: "Should update existing purchase"
            txExecutor.readTx {
                def updatedPurchase = purchaseRepository.findById(UUID.fromString(purchaseId)).get()
                verifyAll(updatedPurchase) {
                    id != null
                    date == parse("2010-07-07")
                    shop.id == UUID.fromString("52b29637-629d-4a10-b296-37629d8a104b")
                    shop.name == "Auchan"
                    products.size() == 3
                    verifyAll(products[0]) {
                        id == UUID.fromString("eb1e3c4e-8640-4e83-9e3c-4e8640be834a")
                        name == "Bread"
                        amount == 2d
                        price == 2.99d
                        description == "For my parents"
                        category.id == UUID.fromString("e385edcf-3028-4548-85ed-cf30282548f2")
                        category.name == "Food"
                    }
                    verifyAll(products[1]) {
                        id == UUID.fromString("4b6d2d28-0438-4612-ad2d-28043866123b")
                        name == "Potatoes"
                        amount == 1.43d
                        price == 0.99d
                        description == ""
                        category.id == UUID.fromString("e385edcf-3028-4548-85ed-cf30282548f2")
                        category.name == "Food"
                    }
                    verifyAll(products[2]) {
                        id != null
                        name == "Welder"
                        amount == 1d
                        price == 399.99d
                        description == "Because I can"
                        category.id == UUID.fromString("7c0ab0ca-8c5e-4373-8ab0-ca8c5ec373b6")
                        category.name == "Tools"
                    }
                }
                return true
            }

        and: "Should return 204 (NO_CONTENT)"
            verifyAll(result) {
                andExpect(status().isNoContent())
            }
    }

    def "Should delete purchase and return status 204 (NO_CONTENT)"() {
        given:
            String purchaseId = "b0d87032-5c1e-4500-9870-325c1ed50005"

        when:
            def result = mvc.perform(
                delete("/api/purchases/$purchaseId")
            ).andDo(print())

        then: "Should delete purchase"
            purchaseRepository.getDeletedPurchases()
                .collect { it.id.toString() }
                .contains(purchaseId)

        and: "Should return 204 (NO_CONTENT)"
            verifyAll(result) {
                andExpect(status().isNoContent())
            }
    }

    def "Should delete purchases and return status 204 (NO_CONTENT)"() {
        given:
            List<String> purchaseIds = ["b0d87032-5c1e-4500-9870-325c1ed50005", "4e172c43-2877-49ef-972c-432877b9ef96"]
            String requestBody = deletePurchasesRequestBody(purchaseIds)

        when:
            def result = mvc.perform(
                delete("/api/purchases")
                    .content(requestBody)
                    .contentType(APPLICATION_JSON)
            ).andDo(print())

        then: "Should delete purchases"
            purchaseRepository.getDeletedPurchases()
                .collect { it.id.toString() }
                .containsAll(purchaseIds)

        and: "Should return 204 (NO_CONTENT)"
            verifyAll(result) {
                andExpect(status().isNoContent())
            }
    }

    private static String createPurchaseRequestBody() {
        return toJson([
            shopId  : "52b29637-629d-4a10-b296-37629d8a104b",
            date    : "2020-12-20",
            products: [
                [
                    name       : "Bread",
                    amount     : 1,
                    price      : 1.99,
                    description: "",
                    categoryId : "e385edcf-3028-4548-85ed-cf30282548f2"
                ],
                [
                    name       : "Candies",
                    amount     : 0.234,
                    price      : 29.99,
                    description: "My favourite",
                    categoryId : "e945a735-5dcc-45f6-85a7-355dcca5f68c"
                ]
            ]
        ])
    }

    private static String updatePurchaseRequestBody() {
        return toJson([
            shopId  : "52b29637-629d-4a10-b296-37629d8a104b",
            date    : "2010-07-07",
            products: [
                [
                    id         : "eb1e3c4e-8640-4e83-9e3c-4e8640be834a",
                    name       : "Bread",
                    amount     : 2,
                    price      : 2.99,
                    description: "For my parents",
                    categoryId : "e385edcf-3028-4548-85ed-cf30282548f2"
                ],
                [
                    id         : "4b6d2d28-0438-4612-ad2d-28043866123b",
                    name       : "Potatoes",
                    amount     : 1.43,
                    price      : 0.99,
                    description: "",
                    categoryId : "e385edcf-3028-4548-85ed-cf30282548f2"
                ],
                [
                    name       : "Welder",
                    amount     : 1,
                    price      : 399.99,
                    description: "Because I can",
                    categoryId : "7c0ab0ca-8c5e-4373-8ab0-ca8c5ec373b6"
                ]
            ]
        ])
    }

    private static deletePurchasesRequestBody(List<String> purchaseIds) {
        return toJson([
            ids: purchaseIds
        ])
    }
}
