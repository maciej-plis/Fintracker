package matthias.fintracker.shop

import matthias.fintracker.api.models.AddShopRequest
import spock.lang.Specification
import spock.lang.Unroll

import static java.util.UUID.randomUUID

class ShopExtensionsTest extends Specification {

    static def idFixtures = (0..9).collect { randomUUID() }

    @Unroll
    def "Should map AddShopRequest to ShopEntity #testCase"() {
        given:
            def addShopRequest = new AddShopRequest("Auchan")

        when:
            def result = ShopExtensionsKt.toEntity(addShopRequest, shopId)

        then:
            verifyAll(result) {
                verifyIdFunc.call(id)
                name == "Auchan"
            }

        where:
            shopId        | verifyIdFunc              || testCase
            null          | ({ it != null })          || "without id"
            idFixtures[0] | ({ it == idFixtures[0] }) || "with id"
    }

    def "Should map ShopEntity to ShopDTO"() {
        given:
            def shopEntity = new ShopEntity(idFixtures[0]).tap { name = "Auchan" }

        when:
            def result = ShopExtensionsKt.toDTO(shopEntity)

        then:
            verifyAll(result) {
                id == idFixtures[0]
                name == "Auchan"
            }
    }
}
