package matthias.fintracker.category

import jakarta.persistence.EntityExistsException
import jakarta.persistence.EntityNotFoundException
import matthias.fintracker.api.models.AddCategoryRequest
import matthias.fintracker.api.models.CategoryDTO
import org.spockframework.spring.SpringBean
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.test.web.servlet.MockMvc
import spock.lang.Specification

import static groovy.json.JsonOutput.toJson
import static java.util.UUID.randomUUID
import static org.hamcrest.Matchers.hasSize
import static org.springframework.http.MediaType.APPLICATION_JSON
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

@WebMvcTest(CategoryController)
class CategoryControllerTest extends Specification {

    static def idFixtures = (0..9).collect { randomUUID() }

    @SpringBean
    CategoryService categoryService = Mock()

    @Autowired
    MockMvc mockMvc

    def "Should return 200 (OK) with categories"() {
        when:
            def result = mockMvc.perform(
                get("/api/categories")
            ).andDo(print())

        then: "Should obtain categories from service"
            1 * categoryService.getProductCategories() >> [
                new CategoryDTO(idFixtures[0], "Food"),
                new CategoryDTO(idFixtures[1], "Clothes")
            ]

        and: "Should return 200 (OK) with categories"
            verifyAll(result) {
                andExpect(status().isOk())
                andExpect(jsonPath('$', hasSize(2)))
                andExpect(jsonPath('$[0].id').value(idFixtures[0].toString()))
                andExpect(jsonPath('$[0].name').value("Food"))
                andExpect(jsonPath('$[1].id').value(idFixtures[1].toString()))
                andExpect(jsonPath('$[1].name').value("Clothes"))
            }
    }

    def "Should return 200 (OK) with category"() {
        given:
            def categoryId = idFixtures[0]

        when:
            def result = mockMvc.perform(
                get("/api/categories/$categoryId")
            ).andDo(print())

        then: "Should obtain category from service"
            1 * categoryService.getProductCategoryOrThrow(categoryId) >> new CategoryDTO(idFixtures[0], "Food")

        and: "Should return 200 (OK) with category"
            verifyAll(result) {
                andExpect(status().isOk())
                andExpect(jsonPath('$.id').value(idFixtures[0].toString()))
                andExpect(jsonPath('$.name').value("Food"))
            }
    }

    def "Should return 404 (NOT_FOUND) when category with id doesn't exist"() {
        given:
            def categoryId = idFixtures[0]

        when:
            def result = mockMvc.perform(
                get("/api/categories/$categoryId")
            ).andDo(print())

        then: "Should obtain category from service"
            1 * categoryService.getProductCategoryOrThrow(categoryId) >> {
                throw new EntityNotFoundException("Category doesn't exist")
            }

        and: "Should return 404 (NOT_FOUND)"
            verifyAll(result) {
                andExpect(status().isNotFound())
            }
    }

    def "Should return 200 (OK) with category id"() {
        given:
            def requestBody = newCategoryRequestBody()

        when:
            def result = mockMvc.perform(
                post("/api/categories")
                    .content(requestBody)
                    .contentType(APPLICATION_JSON)
            ).andDo(print())

        then: "Should save category using service"
            1 * categoryService.addProductCategory(_ as AddCategoryRequest) >> { AddCategoryRequest request ->
                verifyAll(request) {
                    name == "Food"
                }
                return idFixtures[0]
            }

        and: "Should return 200 (OK) with category id"
            verifyAll(result) {
                andExpect(status().isOk())
                andExpect(jsonPath('$').value(idFixtures[0].toString()))
            }
    }

    def "Should return 409 (CONFLICT) when category already exists"() {
        given:
            def requestBody = newCategoryRequestBody()

        when:
            def result = mockMvc.perform(
                post("/api/categories")
                    .content(requestBody)
                    .contentType(APPLICATION_JSON)
            ).andDo(print())

        then: "Should try to save new category"
            1 * categoryService.addProductCategory(_ as AddCategoryRequest) >> {
                throw new EntityExistsException("Category already exists")
            }

        and: "Should return 409 (CONFLICT)"
            verifyAll(result) {
                andExpect(status().isConflict())
            }
    }

    private static String newCategoryRequestBody() {
        return toJson([
            name: "Food"
        ])
    }
}
