package com.matthias.fintracker.category

import com.matthias.fintracker.MvcIntegrationTestSpecification
import com.matthias.fintracker.common.jpa.TransactionExecutor
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

@Sql(scripts = "/test-sql/category/init.sql", executionPhase = BEFORE_TEST_METHOD)
@Sql(scripts = "/test-sql/category/cleanup.sql", executionPhase = AFTER_TEST_METHOD)
class CategoryIT extends MvcIntegrationTestSpecification {

    @Autowired
    TestCategoryRepository categoryRepository

    @Autowired
    TransactionExecutor txExecutor

    def "Should return 200 (OK) with category"() {
        given:
            def categoryId = "4bbdfc73-d409-4ede-bdfc-73d4091edeb2"

        when:
            def result = mvc.perform(
                get("/api/categories/$categoryId")
            ).andDo(print())

        then: "Should return 200 (OK) with category"
            verifyAll(result) {
                andExpect(status().isOk())

                andExpect(jsonPath('$.id',).value("4bbdfc73-d409-4ede-bdfc-73d4091edeb2"))
                andExpect(jsonPath('$.name').value("Fruits"))
            }
    }

    def "Should return 200 (OK) with categories"() {
        when:
            def result = mvc.perform(
                get("/api/categories")
            ).andDo(print())

        then: "Should return 200 (OK) with categories"
            verifyAll(result) {
                andExpect(status().isOk())
                andExpect(jsonPath('$', hasSize(2)))

                andExpect(jsonPath('$[0].id').value("e385edcf-3028-4548-85ed-cf30282548f2"))
                andExpect(jsonPath('$[0].name').value("Food"))

                andExpect(jsonPath('$[1].id').value("4bbdfc73-d409-4ede-bdfc-73d4091edeb2"))
                andExpect(jsonPath('$[1].name').value("Fruits"))
            }
    }

    def "Should add category and return 200 (OK) with category id"() {
        given:
            def requestBody = newCategoryRequestBody()

        when:
            def result = mvc.perform(
                post("/api/categories")
                    .content(requestBody)
                    .contentType(APPLICATION_JSON)
            ).andDo(print())

        then: "Should save new category"
            CategoryEntity createdCategory = categoryRepository.findByName("Transport")
            verifyAll(createdCategory) {
                id != null
                name == "Transport"
            }

        and: "Should return 200 (OK) with created resource id"
            verifyAll(result) {
                andExpect(status().isOk())
                andExpect(jsonPath('$').value(createdCategory.id.toString()))
            }
    }

    private static String newCategoryRequestBody() {
        return toJson([
            name: "Transport"
        ])
    }
}
