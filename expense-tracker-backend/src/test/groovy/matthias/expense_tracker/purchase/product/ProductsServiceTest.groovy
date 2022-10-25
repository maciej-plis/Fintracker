package matthias.expense_tracker.purchase.product


import spock.lang.Specification
import spock.lang.Subject
import spock.lang.Unroll

class ProductsServiceTest extends Specification {

    ProductsRepository productsRepository = Mock()

    @Subject
    ProductsService productsService = new ProductsService(productsRepository)

    @Unroll
    def "Should return distinct list of product names based on given query"() {
        given:
            def productEntities = [
                new ProductEntity(name: "product 1"),
                new ProductEntity(name: "product 2"),
                new ProductEntity(name: "product 2")
            ]

        when:
            def result = productsService.getProductNames(query)

        then: "Should return matching products"
            1 * productsRepository.findAllByNameContainingIgnoreCase(query) >> productEntities.findAll { it.name.containsIgnoreCase(query) }

        and: "Should return distinct list of product names"
            result == expectedNames

        where:
            query        | expectedNames
            "product"    | ["product 1", "product 2"]
            "oDUc"       | ["product 1", "product 2"]
            "product 1"  | ["product 1"]
            "product 99" | []
    }
}
