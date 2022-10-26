package matthias.expense_tracker.product

import matthias.expense_tracker.category.CategoryEntity
import matthias.expense_tracker.common.jpa.BaseEntity
import javax.persistence.Entity
import javax.persistence.ManyToOne
import javax.persistence.Table


@Entity
@Table(name = "purchase")
class ProductEntity(
    var name: String,
    var price: Double,
    var amount: Double,
    @ManyToOne(optional = false)
    var category: CategoryEntity,
    var description: String?
) : BaseEntity()