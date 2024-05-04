package com.matthias.fintracker.product

import com.matthias.fintracker.MvcIntegrationTestSpecification
import com.matthias.fintracker.common.jpa.TransactionExecutor
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.test.context.jdbc.Sql

import static org.hamcrest.Matchers.hasSize
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.AFTER_TEST_METHOD
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.BEFORE_TEST_METHOD
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

@Sql(scripts = "/test-sql/product/init.sql", executionPhase = BEFORE_TEST_METHOD)
@Sql(scripts = "/test-sql/product/cleanup.sql", executionPhase = AFTER_TEST_METHOD)
class ProductIT extends MvcIntegrationTestSpecification {

    @Autowired
    ProductRepository productRepository

    @Autowired
    TransactionExecutor txExecutor

    def "Should return 200 (OK) with product names"() {
        given:
            def filter = "am"

        when:
            def result = mvc.perform(
                get("/api/products/names")
                    .param("filter", filter)
            ).andDo(print())

        then: "Should return 200 (OK) with product names"
            verifyAll(result) {
                andExpect(status().isOk())

                andExpect(jsonPath('$', hasSize(2)))
                andExpect(jsonPath('$[0]').value("Ammeter"))
                andExpect(jsonPath('$[1]').value("Lamp"))
            }

    }
}
