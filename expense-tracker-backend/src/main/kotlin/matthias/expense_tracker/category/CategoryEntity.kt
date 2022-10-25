package matthias.expense_tracker.category

import matthias.expense_tracker.common.jpa.BaseEntity
import javax.persistence.Entity
import javax.persistence.Table

@Entity
@Table(name = "purchase_category")
class CategoryEntity(
    var name: String
) : BaseEntity()
