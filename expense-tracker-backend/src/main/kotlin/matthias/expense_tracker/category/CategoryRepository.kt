package matthias.expense_tracker.category

import org.springframework.data.jpa.repository.JpaRepository
import java.util.*


internal interface CategoryRepository : JpaRepository<CategoryEntity, UUID> {

    fun existsByName(name: String): Boolean
}
