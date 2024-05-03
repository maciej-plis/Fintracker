package matthias.fintracker.category

import matthias.fintracker.common.jpa.BaseRepository
import org.springframework.stereotype.Repository
import java.util.*


@Repository
internal interface CategoryRepository : BaseRepository<CategoryEntity, UUID> {
    fun existsByNameIgnoreCase(name: String): Boolean
    fun findAllByOrderByName(): List<CategoryEntity>
}
