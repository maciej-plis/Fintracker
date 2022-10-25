package matthias.expense_tracker.product

import matthias.expense_tracker.common.jpa.BaseRepository
import java.util.*

internal interface ProductRepository : BaseRepository<ProductEntity, UUID> {

    fun findDistinctByNameContainingIgnoreCase(nameQuery: String): List<ProductEntity>
}