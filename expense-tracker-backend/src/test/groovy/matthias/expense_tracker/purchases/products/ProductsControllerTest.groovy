package matthias.expense_tracker.purchases.products

import matthias.expense_tracker.configuration.ResponseExceptionHandler
import org.springframework.test.web.servlet.MockMvc
import spock.lang.Specification
import spock.lang.Subject

import static org.hamcrest.Matchers.hasSize
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup

class ProductsControllerTest extends Specification {

    ProductsService productsService = Mock()

    @Subject
    MockMvc productsAPI = standaloneSetup(new ProductsController(productsService))
        .setControllerAdvice(new ResponseExceptionHandler())
        .build()

    def "Should return 200 (OK) and list of product names based on given query"() {
        when:
            def result = productsAPI
                .perform(get("/purchases/products/names")
                    .param("query", "query"))
                .andDo(print())

        then: "Should get product names"
            1 * productsService.getProductNames("query") >> ["product 1", "product 2"]

        and: "Should return 200 (OK) and list of product names"
            with(result) {
                andExpect(status().isOk())
                andExpect(jsonPath('$', hasSize(2)))
                andExpect(jsonPath('$[0]').value("product 1"))
                andExpect(jsonPath('$[1]').value("product 2"))
            }
    }
}
