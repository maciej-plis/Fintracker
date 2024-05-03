package matthias.fintracker.purchase_summary

import matthias.fintracker.MvcIntegrationTestSpecification
import matthias.fintracker.common.jpa.TransactionExecutor
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.test.context.jdbc.Sql

import static org.hamcrest.Matchers.hasSize
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.AFTER_TEST_METHOD
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.BEFORE_TEST_METHOD
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

@Sql(scripts = "/test-sql/purchase-summary/init.sql", executionPhase = BEFORE_TEST_METHOD)
@Sql(scripts = "/test-sql/purchase-summary/cleanup.sql", executionPhase = AFTER_TEST_METHOD)
class PurchaseSummaryIT extends MvcIntegrationTestSpecification {

    @Autowired
    PurchaseSummaryRepository purchaseSummaryRepository

    @Autowired
    TransactionExecutor txExecutor

    def "Should return status 200 (OK) with purchase summaries page"() {
        given:
            def page = "1"
            def pageSize = "2"
            def sort = "createdAt,desc"
            def filter = "shopName=in=('Auchan')"

        when:
            def result = mvc.perform(
                get("/api/purchase-summaries")
                    .param("page", page)
                    .param("pageSize", pageSize)
                    .param("sort", sort)
                    .param("filter", filter)
            ).andDo(print())

        then: "Should return 200 (OK) with purchase summaries page"
            verifyAll(result) {
                andExpect(status().isOk())

                andExpect(jsonPath('$.totalItems',).value(3))
                andExpect(jsonPath('$.totalPages').value(2))
                andExpect(jsonPath('$.content').value(hasSize(1)))

                andExpect(jsonPath('$.content[0].id').value("ce149464-b1a1-4a0b-9494-64b1a17a0b6d"))
                andExpect(jsonPath('$.content[0].shopName').value("Auchan"))
                andExpect(jsonPath('$.content[0].date').value("2020-12-11"))
                andExpect(jsonPath('$.content[0].productsCount').value(2f))
                andExpect(jsonPath('$.content[0].totalPrice').value(3.98f))
                andExpect(jsonPath('$.content[0].createdAt').value("2021-12-12T11:30:31Z"))
            }
    }
}
