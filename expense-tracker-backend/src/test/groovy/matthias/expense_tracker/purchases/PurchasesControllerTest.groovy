package matthias.expense_tracker.purchases

import matthias.expense_tracker.openapi.model.PurchaseDto
import matthias.expense_tracker.configuration.ResponseExceptionHandler
import org.springframework.test.web.servlet.MockMvc
import spock.lang.Specification
import spock.lang.Subject

import static groovy.json.JsonOutput.toJson
import static java.util.UUID.randomUUID
import static org.hamcrest.Matchers.hasSize
import static org.springframework.http.MediaType.APPLICATION_JSON
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup

class PurchasesControllerTest extends Specification {

    static def idSamples = (0..9).collect { randomUUID() }

    PurchasesService purchasesService = Mock()

    @Subject
    MockMvc purchasesAPI = standaloneSetup(new PurchasesController(purchasesService))
        .setControllerAdvice(new ResponseExceptionHandler())
        .build()

    def "Should return 200 (OK) and saved purchase"() {
        when:
            def result = purchasesAPI
                .perform(post("/purchases")
                    .content(newPurchaseRequestBody())
                    .contentType(APPLICATION_JSON))
                .andDo(print())

        then: "Should save new purchase"
            purchasesService.addPurchases(_ as PurchaseDto) >> { args ->
                PurchaseDto purchaseDto = args[0]
                purchaseDto.id = idSamples[0]
                purchaseDto.products[0].id = idSamples[1]
                purchaseDto.products[1].id = idSamples[2]
                purchaseDto.shop.name = "shop 1"
                purchaseDto.products[0].category.name = "category 1"
                purchaseDto.products[1].category.name = "category 2"

                return purchaseDto
            }

        and: "Should return 200 (OK) with newly created purchase"
            with(result) {
                andExpect(status().isOk())
                andExpect(jsonPath('$.id').value(idSamples[0].toString()))
//                andExpect(jsonPath('$.date').value("2020-12-20")) // TODO Date formatting
                andExpect(jsonPath('$.shop.id').value(idSamples[3].toString()))
                andExpect(jsonPath('$.shop.name').value("shop 1"))
                andExpect(jsonPath('$.products', hasSize(2)))

                andExpect(jsonPath('$.products[0].id').value(idSamples[1].toString()))
                andExpect(jsonPath('$.products[0].name').value("product 1"))
                andExpect(jsonPath('$.products[0].amount').value(1))
                andExpect(jsonPath('$.products[0].price').value(1.99))
                andExpect(jsonPath('$.products[0].description').value("product 1 description"))
                andExpect(jsonPath('$.products[0].category.id').value(idSamples[4].toString()))
                andExpect(jsonPath('$.products[0].category.name').value("category 1"))

                andExpect(jsonPath('$.products[1].id').value(idSamples[2].toString()))
                andExpect(jsonPath('$.products[1].name').value("product 2"))
                andExpect(jsonPath('$.products[1].amount').value(0.234))
                andExpect(jsonPath('$.products[1].price').value(29.99))
                andExpect(jsonPath('$.products[1].description').value("product 2 description"))
                andExpect(jsonPath('$.products[1].category.id').value(idSamples[5].toString()))
                andExpect(jsonPath('$.products[1].category.name').value("category 2"))
            }
    }


    private static String newPurchaseRequestBody() {
        return toJson([
            shop    : [id: idSamples[3]],
            date    : "2020-12-20",
            products: [
                [
                    name       : "product 1",
                    amount     : 1,
                    price      : 1.99,
                    description: "product 1 description",
                    category   : [id: idSamples[4]]
                ],
                [
                    name       : "product 2",
                    amount     : 0.234,
                    price      : 29.99,
                    description: "product 2 description",
                    category   : [id: idSamples[5]]
                ]
            ]
        ])
    }
}
