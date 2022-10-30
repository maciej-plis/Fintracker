package matthias.expense_tracker.category

import matthias.expense_tracker.common.jpa.BaseEntity
import java.util.*
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Table

@Entity
@Table(name = "product_category")
class CategoryEntity : BaseEntity {

    constructor() : super()
    constructor(id: UUID?) : super(id)

    @Column(columnDefinition = "citext")
    lateinit var name: String
}
