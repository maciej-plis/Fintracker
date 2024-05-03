package matthias.fintracker.product

import matthias.fintracker.common.jpa.TransactionExecutor
import org.springframework.stereotype.Service

@Service
internal class ProductService(
    private val productsRepository: ProductRepository,
    private val txExecutor: TransactionExecutor
) {

    fun getProductNames(filter: String): List<String> = txExecutor.readTx {
        return@readTx productsRepository.findProductNamesContainingOrderAsc(filter)
    }
}
