package matthias.expense_tracker.shop

import matthias.expense_tracker.common.jpa.BaseRepository
import java.util.*

internal interface ShopRepository : BaseRepository<ShopEntity, UUID> {
    fun existsByName(name: String): Boolean
    fun findAllByOrderByName(): List<ShopEntity>
}
