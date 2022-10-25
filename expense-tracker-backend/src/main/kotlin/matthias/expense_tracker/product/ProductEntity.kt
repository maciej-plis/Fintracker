package matthias.expense_tracker.product

import matthias.expense_tracker.common.BaseEntity
import matthias.expense_tracker.purchase.categories.CategoryEntity
import java.util.*
import java.util.UUID.randomUUID
import javax.persistence.Entity
import javax.persistence.ManyToOne
import javax.persistence.Table


@Entity
@Table(name = "purchase")
class ProductEntity(
    val name: String,
    val description: String,
    val price: Double,
    val amount: Double,
    @ManyToOne(optional = false)
    val category: CategoryEntity,
    id: UUID = randomUUID()
) : BaseEntity(id)