package matthias.expense_tracker.shop

import matthias.expense_tracker.MvcIntegrationTestSpecification
import matthias.expense_tracker.common.jpa.TransactionExecutor
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.test.context.jdbc.Sql

import static groovy.json.JsonOutput.toJson
import static org.hamcrest.Matchers.hasSize
import static org.springframework.http.MediaType.APPLICATION_JSON
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.AFTER_TEST_METHOD
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.BEFORE_TEST_METHOD
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

@Sql(scripts = "/test-sql/shop/init.sql", executionPhase = BEFORE_TEST_METHOD)
@Sql(scripts = "/test-sql/shop/cleanup.sql", executionPhase = AFTER_TEST_METHOD)
class ShopIT extends MvcIntegrationTestSpecification {

    @Autowired
    TestShopRepository shopRepository

    @Autowired
    TransactionExecutor txExecutor

    def "Should return 200 (OK) with shop"() {
        given:
            def shopId = "82328bbd-8a85-4da1-b28b-bd8a858da1d6"

        when:
            def result = mvc.perform(
                get("/api/shops/$shopId")
            ).andDo(print())

        then: "Should return 200 (OK) with shop"
            verifyAll(result) {
                andExpect(status().isOk())

                andExpect(jsonPath('$.id',).value("82328bbd-8a85-4da1-b28b-bd8a858da1d6"))
                andExpect(jsonPath('$.name').value("Leroy Merlin"))
            }
    }

    def "Should return 200 (OK) with shops"() {
        when:
            def result = mvc.perform(
                get("/api/shops")
            ).andDo(print())

        then: "Should return 200 (OK) with shops"
            verifyAll(result) {
                andExpect(status().isOk())
                andExpect(jsonPath('$', hasSize(2)))

                andExpect(jsonPath('$[0].id').value("52b29637-629d-4a10-b296-37629d8a104b"))
                andExpect(jsonPath('$[0].name').value("Auchan"))

                andExpect(jsonPath('$[1].id').value("82328bbd-8a85-4da1-b28b-bd8a858da1d6"))
                andExpect(jsonPath('$[1].name').value("Leroy Merlin"))
            }
    }

    def "Should add shop and return 200 (OK) with shop id"() {
        given:
            def requestBody = createShopRequestBody()

        when:
            def result = mvc.perform(
                post("/api/shops")
                    .content(requestBody)
                    .contentType(APPLICATION_JSON)
            ).andDo(print())

        then: "Should save new shop"
            ShopEntity createdShop = shopRepository.findByName("The Home Depot")
            verifyAll(createdShop) {
                id != null
                name == "The Home Depot"
            }

        and: "Should return 200 (OK) with created resource id"
            verifyAll(result) {
                andExpect(status().isOk())
                andExpect(jsonPath('$').value(createdShop.id.toString()))
            }
    }

    private static String createShopRequestBody() {
        return toJson([
            name: "The Home Depot"
        ])
    }
}
