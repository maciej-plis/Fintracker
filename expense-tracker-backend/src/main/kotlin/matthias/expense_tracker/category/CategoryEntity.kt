package matthias.expense_tracker.category

import matthias.expense_tracker.common.jpa.BaseEntity
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Table

@Entity
@Table(name = "product_category")
class CategoryEntity(
    @Column(columnDefinition = "citext")
    var name: String
) : BaseEntity()
