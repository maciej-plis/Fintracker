package com.matthias.fintracker.purchase_summary

import com.matthias.fintracker.api.models.PurchaseSummariesPage
import com.matthias.fintracker.api.models.PurchaseSummaryDTO
import com.matthias.fintracker.common.jpa.PaginationRequest
import org.spockframework.spring.SpringBean
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.test.web.servlet.MockMvc
import spock.lang.Specification

import java.time.Instant
import java.time.LocalDate

import static java.util.UUID.randomUUID
import static org.hamcrest.Matchers.hasSize
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

@WebMvcTest(PurchaseSummaryController)
class PurchaseSummaryControllerTest extends Specification {

    static def idFixtures = (0..9).collect { randomUUID() }

    @SpringBean
    PurchaseSummaryService purchaseSummaryService = Mock()

    @Autowired
    MockMvc mockMvc

    def "Should return 200 (OK) with purchase summary page"() {
        given:
            def pageSize = "1"
            def sort = "date,asc"
            def filter = "Au"

        when:
            def result = mockMvc.perform(
                get("/api/purchase-summaries")
                    .param("pageSize", pageSize)
                    .param("sort", sort)
                    .param("filter", filter)
            ).andDo(print())

        then: "Should obtain purchase summary page from service"
            1 * purchaseSummaryService.getPurchaseSummaries(_ as PaginationRequest) >> { PaginationRequest request ->
                verifyAll(request) {
                    it.page == 0
                    it.pageSize == 1
                    it.sort == "date,asc"
                    it.filter == "Au"
                }
                return new PurchaseSummariesPage(
                    [
                        new PurchaseSummaryDTO(
                            idFixtures[0],
                            "Auchan",
                            LocalDate.parse("2020-12-28"),
                            2,
                            28.28,
                            Instant.parse("2020-12-28T20:53:11Z")
                        )
                    ],
                    5,
                    5
                )
            }

        and: "Should return 200 (OK) with purchase summary page"
            verifyAll(result) {
                andExpect(status().isOk())
                andExpect(jsonPath('$.totalPages').value(5))
                andExpect(jsonPath('$.totalItems').value(5))
                andExpect(jsonPath('$.content', hasSize(1)))
                andExpect(jsonPath('$.content[0].id').value(idFixtures[0].toString()))
                andExpect(jsonPath('$.content[0].date').value("2020-12-28"))
                andExpect(jsonPath('$.content[0].shopName').value("Auchan"))
                andExpect(jsonPath('$.content[0].productsCount').value(2))
                andExpect(jsonPath('$.content[0].totalPrice').value(28.28))
                andExpect(jsonPath('$.content[0].createdAt').value("2020-12-28T20:53:11Z"))
            }
    }
}
