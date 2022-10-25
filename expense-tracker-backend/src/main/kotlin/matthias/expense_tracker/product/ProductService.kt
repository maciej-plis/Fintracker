package matthias.expense_tracker.product

import org.springframework.stereotype.Service

@Service
internal class ProductService(private val productsRepository: ProductRepository) {

    fun getProductNames(nameQuery: String): List<String> {
        return productsRepository.findDistinctByNameContainingIgnoreCase(nameQuery).map { it.name }
    }
}
