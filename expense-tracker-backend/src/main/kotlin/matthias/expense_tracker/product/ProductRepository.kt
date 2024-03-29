package matthias.expense_tracker.product

import matthias.expense_tracker.common.jpa.BaseRepository
import org.springframework.data.jpa.repository.Query
import java.util.*

internal interface ProductRepository : BaseRepository<ProductEntity, UUID> {

    @Query("SELECT DISTINCT p.name FROM ProductEntity p WHERE p.name LIKE %:nameQuery% ORDER BY p.name ASC")
    fun findProductNamesContainingOrderAsc(nameQuery: String): List<String>
}
