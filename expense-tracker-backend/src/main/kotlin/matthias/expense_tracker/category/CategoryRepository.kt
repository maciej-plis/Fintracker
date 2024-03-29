package matthias.expense_tracker.category

import matthias.expense_tracker.common.jpa.BaseRepository
import org.springframework.stereotype.Repository
import java.util.*


@Repository
internal interface CategoryRepository : BaseRepository<CategoryEntity, UUID> {
    fun existsByName(name: String): Boolean
    fun findAllByOrderByName(): List<CategoryEntity>
}
