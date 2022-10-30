package matthias.expense_tracker.product

import matthias.expense_tracker.category.CategoryEntity
import matthias.expense_tracker.common.jpa.BaseEntity
import java.util.*
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType.EAGER
import javax.persistence.ManyToOne
import javax.persistence.Table


@Entity
@Table(name = "product")
class ProductEntity : BaseEntity {

    constructor() : super()
    constructor(id: UUID?) : super(id)

    @Column(columnDefinition = "citext", nullable = false)
    lateinit var name: String

    @Column(nullable = false)
    var price: Double = 0.0

    @Column(nullable = false)
    var amount: Double = 0.0

    @ManyToOne(optional = false, fetch = EAGER)
    lateinit var category: CategoryEntity

    @Column(nullable = true)
    var description: String? = null
}