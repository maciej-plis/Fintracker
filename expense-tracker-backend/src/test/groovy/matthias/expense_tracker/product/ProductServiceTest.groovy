package matthias.expense_tracker.product

import matthias.expense_tracker.common.jpa.TransactionExecutor
import spock.lang.Specification
import spock.lang.Subject

class ProductServiceTest extends Specification {

    ProductRepository productRepository = Mock()
    TransactionExecutor txExecutor = new TransactionExecutor()

    @Subject
    ProductService productService = new ProductService(productRepository, txExecutor)

    def "Should return distinct list of product names for given filter"() {
        given:
            def filter = "brea"

        when:
            def result = productService.getProductNames(filter)

        then: "Should get products for filter"
            1 * productRepository.findProductNamesContainingOrderAsc(filter) >> ["Bread", "Brownie"]

        and: "Should return distinct list of product names"
            result == ["Bread", "Brownie"]
    }
}
