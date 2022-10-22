package matthias.expense_tracker.purchase

import matthias.expense_tracker.configuration.ResponseExceptionHandler
import matthias.expense_tracker.openapi.model.PurchaseDto
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

class PurchaseControllerTest extends Specification {

    static def idSamples = (0..9).collect { randomUUID() }

    PurchaseService purchaseService = Mock()

    @Subject
    MockMvc purchasesAPI = standaloneSetup(new PurchaseController(purchaseService))
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
            purchaseService.addPurchases(_ as PurchaseDto) >> { args ->
                PurchaseDto purchaseDto = args[0]
                purchaseDto.id = idSamples[0]
                purchaseDto.products[0].id = idSamples[1]
                purchaseDto.products[1].id = idSamples[2]
                purchaseDto.shop.name = "Walmart"
                purchaseDto.products[0].category.name = "Food"
                purchaseDto.products[1].category.name = "Clothes"

                return purchaseDto
            }

        and: "Should return 200 (OK) with newly created purchase"
            with(result) {
                andExpect(status().isOk())
                andExpect(jsonPath('$.id').value(idSamples[0].toString()))
//                andExpect(jsonPath('$.date').value("2020-12-20")) // TODO Date formatting
                andExpect(jsonPath('$.shop.id').value(idSamples[3].toString()))
                andExpect(jsonPath('$.shop.name').value("Walmart"))
                andExpect(jsonPath('$.products', hasSize(2)))

                andExpect(jsonPath('$.products[0].id').value(idSamples[1].toString()))
                andExpect(jsonPath('$.products[0].name').value("Bread"))
                andExpect(jsonPath('$.products[0].amount').value(1))
                andExpect(jsonPath('$.products[0].price').value(1.99))
                andExpect(jsonPath('$.products[0].description').value(null))
                andExpect(jsonPath('$.products[0].category.id').value(idSamples[4].toString()))
                andExpect(jsonPath('$.products[0].category.name').value("Food"))

                andExpect(jsonPath('$.products[1].id').value(idSamples[2].toString()))
                andExpect(jsonPath('$.products[1].name').value("T-Shirt"))
                andExpect(jsonPath('$.products[1].amount').value(2))
                andExpect(jsonPath('$.products[1].price').value(29.99))
                andExpect(jsonPath('$.products[1].description').value("Metallica T-Shirts"))
                andExpect(jsonPath('$.products[1].category.id').value(idSamples[5].toString()))
                andExpect(jsonPath('$.products[1].category.name').value("Clothes"))
            }
    }


    private static String newPurchaseRequestBody() {
        return toJson([
            shop    : [id: idSamples[3]],
            date    : "2020-12-20",
            products: [
                [
                    name       : "Bread",
                    amount     : 1,
                    price      : 1.99,
                    description: null,
                    category   : [id: idSamples[4]]
                ],
                [
                    name       : "T-Shirt",
                    amount     : 2,
                    price      : 29.99,
                    description: "Metallica T-Shirts",
                    category   : [id: idSamples[5]]
                ]
            ]
        ])
    }
}
