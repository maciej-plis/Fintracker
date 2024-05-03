package matthias.fintracker.shop

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Table
import matthias.fintracker.common.jpa.BaseEntity
import java.util.*

@Entity
@Table(name = "purchase_shop")
class ShopEntity : BaseEntity {

    constructor() : super()
    constructor(id: UUID?) : super(id)

    @Column(columnDefinition = "citext", nullable = false)
    lateinit var name: String
}
