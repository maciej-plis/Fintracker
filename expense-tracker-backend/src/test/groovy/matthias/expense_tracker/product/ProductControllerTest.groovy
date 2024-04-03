package matthias.expense_tracker.product


import org.spockframework.spring.SpringBean
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.test.web.servlet.MockMvc
import spock.lang.Specification

import static org.hamcrest.Matchers.hasSize
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

@WebMvcTest(ProductController)
class ProductControllerTest extends Specification {

    @SpringBean
    ProductService productService = Mock()

    @Autowired
    MockMvc mockMvc

    def "Should return 200 (OK) with product names for given filter"() {
        given:
            def filter = "brea"

        when:
            def result = mockMvc.perform(
                get("/api/products/names")
                    .param("filter", filter)
            ).andDo(print())

        then: "Should obtain product names from service"
            1 * productService.getProductNames("brea") >> ["Bread", "Brownie"]

        and: "Should return 200 (OK) with product names"
            with(result) {
                andExpect(status().isOk())
                andExpect(jsonPath('$', hasSize(2)))
                andExpect(jsonPath('$[0]').value("Bread"))
                andExpect(jsonPath('$[1]').value("Brownie"))
            }
    }
}
