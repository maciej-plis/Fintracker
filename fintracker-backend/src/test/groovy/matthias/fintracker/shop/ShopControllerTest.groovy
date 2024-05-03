package matthias.fintracker.shop

import jakarta.persistence.EntityExistsException
import jakarta.persistence.EntityNotFoundException
import matthias.fintracker.api.models.AddShopRequest
import matthias.fintracker.api.models.ShopDTO
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

@WebMvcTest(ShopController)
class ShopControllerTest extends Specification {

    static def idFixtures = (0..9).collect { randomUUID() }

    @SpringBean
    ShopService shopService = Mock()

    @Autowired
    MockMvc mockMvc

    def "Should return 200 (OK) with shops"() {
        when:
            def result = mockMvc.perform(
                get("/api/shops")
            ).andDo(print())

        then: "Should obtain shops from service"
            1 * shopService.getPurchaseShops() >> [
                new ShopDTO(idFixtures[0], "Auchan"),
                new ShopDTO(idFixtures[1], "The Home Depot")
            ]

        and: "Should return 200 (OK) with shops"
            verifyAll(result) {
                andExpect(status().isOk())
                andExpect(jsonPath('$', hasSize(2)))
                andExpect(jsonPath('$[0].id').value(idFixtures[0].toString()))
                andExpect(jsonPath('$[0].name').value("Auchan"))
                andExpect(jsonPath('$[1].id').value(idFixtures[1].toString()))
                andExpect(jsonPath('$[1].name').value("The Home Depot"))
            }
    }

    def "Should return 200 (OK) with shop"() {
        given:
            def shopId = idFixtures[0]

        when:
            def result = mockMvc.perform(
                get("/api/shops/$shopId")
            ).andDo(print())

        then: "Should obtain shop from service"
            1 * shopService.getPurchaseShopOrThrow(shopId) >> new ShopDTO(idFixtures[0], "Auchan")

        and: "Should return 200 (OK) with shop"
            verifyAll(result) {
                andExpect(status().isOk())
                andExpect(jsonPath('$.id').value(idFixtures[0].toString()))
                andExpect(jsonPath('$.name').value("Auchan"))
            }
    }

    def "Should return 404 (NOT_FOUND) when shop with id doesn't exist"() {
        given:
            def shopId = idFixtures[0]

        when:
            def result = mockMvc.perform(
                get("/api/shops/$shopId")
            ).andDo(print())

        then: "Should obtain shop from service"
            1 * shopService.getPurchaseShopOrThrow(shopId) >> {
                throw new EntityNotFoundException("Shop doesn't exist")
            }

        and: "Should return 404 (NOT_FOUND)"
            verifyAll(result) {
                andExpect(status().isNotFound())
            }
    }

    def "Should return 200 (OK) with shop id"() {
        given:
            def requestBody = newShopRequestBody()

        when:
            def result = mockMvc.perform(
                post("/api/shops")
                    .content(requestBody)
                    .contentType(APPLICATION_JSON)
            ).andDo(print())

        then: "Should save shop using service"
            1 * shopService.addPurchaseShop(_ as AddShopRequest) >> { AddShopRequest request ->
                verifyAll(request) {
                    name == "Auchan"
                }
                return idFixtures[0]
            }

        and: "Should return 200 (OK) with shop id"
            verifyAll(result) {
                andExpect(status().isOk())
                andExpect(jsonPath('$').value(idFixtures[0].toString()))
            }
    }

    def "Should return 409 (CONFLICT) when shop already exists"() {
        given:
            def requestBody = newShopRequestBody()

        when:
            def result = mockMvc.perform(
                post("/api/shops")
                    .content(requestBody)
                    .contentType(APPLICATION_JSON)
            ).andDo(print())

        then: "Should try to save new shop"
            1 * shopService.addPurchaseShop(_ as AddShopRequest) >> {
                throw new EntityExistsException("Shop already exists")
            }

        and: "Should return 409 (CONFLICT)"
            verifyAll(result) {
                andExpect(status().isConflict())
            }
    }

    private static String newShopRequestBody() {
        return toJson([
            name: "Auchan"
        ])
    }
}
