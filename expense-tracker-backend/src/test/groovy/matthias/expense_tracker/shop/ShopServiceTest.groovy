package matthias.expense_tracker.shop

import jakarta.persistence.EntityExistsException
import matthias.expense_tracker.api.models.AddShopRequest
import matthias.expense_tracker.common.jpa.TransactionExecutor
import spock.lang.Specification
import spock.lang.Subject

import static java.util.UUID.randomUUID

class ShopServiceTest extends Specification {

    static def idFixtures = (0..9).collect { randomUUID() }

    ShopRepository shopRepository = Mock()
    TransactionExecutor txExecutor = new TransactionExecutor()

    @Subject
    ShopService shopsService = new ShopService(shopRepository, txExecutor)

    def "Should return list of shops"() {
        when:
            def result = shopsService.getPurchaseShops()

        then: "Should get shops from repository"
            1 * shopRepository.findAllByOrderByName() >> shopEntityFixtures()

        and: "Should return shops"
            result.size() == 2
            verifyAll(result.get(0)) {
                id == idFixtures[0]
                name == "Auchan"
            }
            verifyAll(result.get(1)) {
                id == idFixtures[1]
                name == "The Home Depot"
            }
    }

    def "Should return shop for id"() {
        given:
            def shopId = idFixtures[0]

        when:
            def result = shopsService.getPurchaseShopOrThrow(shopId)

        then: "Should get shop from repository"
            1 * shopRepository.findByIdOrThrow(idFixtures[0]) >> shopEntityFixtures()[0]

        and: "Should return shop"
            verifyAll(result) {
                id == idFixtures[0]
                name == "Auchan"
            }
    }

    def "Should save new shop and return its id"() {
        given:
            def request = new AddShopRequest("Leroy Merlin")

        and:
            ShopEntity savedShop = null

        when:
            def result = shopsService.addPurchaseShop(request)

        then: "Should check if shop name already exists"
            1 * shopRepository.existsByNameIgnoreCase("Leroy Merlin") >> false

        and: "Should save shop"
            1 * shopRepository.save(_ as ShopEntity) >> { ShopEntity shop ->
                shop.id != null
                shop.name == "Leroy Merlin"
                return savedShop = shop
            }

        and: "Should return saved shop id"
            result == savedShop?.id
    }

    def "Should throw EntityExistsException when shop name already exists"() {
        given:
            def request = new AddShopRequest("Leroy Merlin")

        when:
            shopsService.addPurchaseShop(request)

        then: "Should check if shop name already exists"
            1 * shopRepository.existsByNameIgnoreCase("Leroy Merlin") >> true

        and: "Should throw EntityExistsException"
            thrown(EntityExistsException)
    }

    private static List<ShopEntity> shopEntityFixtures() {
        return [
            new ShopEntity(idFixtures[0]).tap { name = "Auchan" },
            new ShopEntity(idFixtures[1]).tap { name = "The Home Depot" }
        ]
    }
}
