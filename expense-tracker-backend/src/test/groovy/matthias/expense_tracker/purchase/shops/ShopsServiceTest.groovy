package matthias.expense_tracker.purchase.shops

import matthias.expense_tracker.openapi.model.ShopDto
import spock.lang.Specification
import spock.lang.Subject

import javax.persistence.EntityExistsException

import static java.util.UUID.randomUUID
import static org.mapstruct.factory.Mappers.getMapper

class ShopsServiceTest extends Specification {

    static def idSamples = (0..9).collect { randomUUID() }

    def shopDto1 = new ShopDto(id: randomUUID(), "Walmart")

    ShopsRepository shopsRepository = Mock()
    ShopMapper shopsMapper = getMapper(ShopMapper)

    @Subject
    ShopsService shopsService = new ShopsService(shopsRepository, shopsMapper)

    def "Should return list of shops"() {
        when:
            def result = shopsService.getPurchaseShops()

        then: "Should get shops"
            1 * shopsRepository.findAll() >> [
                new ShopEntity(id: idSamples[0], name: "Walmart"),
                new ShopEntity(id: idSamples[1], name: "Lowe's")
            ]

        and:
            with(result.get(0)) {
                id == idSamples[0]
                name == "Walmart"
            }
            with(result.get(1)) {
                id == idSamples[1]
                name == "Lowe's"
            }
    }

    def "Should save new shop and return it"() {
        when:
            def result = shopsService.addPurchaseShop(shopDto1)

        then: "Should check if shop already exists"
            1 * shopsRepository.existsByName(shopDto1.name) >> false

        and: "Should save shop"
            1 * shopsRepository.save(_ as ShopEntity) >> { args ->
                ShopEntity shop = args[0]
                shop.id = idSamples[0]
                return shop
            }

        and: "Should return saved shop"
            with(result) {
                id == idSamples[0]
                name == "Walmart"
            }
    }

    def "Should throw EntityExistsException when shop already exists"() {
        when:
            shopsService.addPurchaseShop(shopDto1)

        then: "Should check if shop already exists"
            1 * shopsRepository.existsByName(shopDto1.name) >> true

        and: "EntityExistsException is thrown"
            thrown(EntityExistsException)
    }
}
