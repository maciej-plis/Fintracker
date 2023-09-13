package matthias.expense_tracker.product

import org.springframework.stereotype.Service

@Service
internal class ProductService(
    private val productsRepository: ProductRepository
) {

    fun getProductNames(filter: String): List<String> {
        return productsRepository.getProductNamesContaining(filter)
    }
}
