package matthias.expense_tracker.shop

import matthias.expense_tracker.common.jpa.BaseEntity
import java.util.*
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Table

@Entity
@Table(name = "purchase_shop")
class ShopEntity : BaseEntity {

    constructor() : super()
    constructor(id: UUID?) : super(id)

    @Column(columnDefinition = "citext", nullable = false)
    lateinit var name: String
}