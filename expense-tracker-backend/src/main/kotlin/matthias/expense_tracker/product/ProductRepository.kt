package matthias.expense_tracker.product

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
internal interface ProductRepository : JpaRepository<ProductEntity, UUID> {

    fun findDistinctByNameContainingIgnoreCase(nameQuery: String): List<ProductEntity>
}