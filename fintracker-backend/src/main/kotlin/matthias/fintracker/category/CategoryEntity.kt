package matthias.fintracker.category

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Table
import matthias.fintracker.common.jpa.BaseEntity
import java.util.*

@Entity
@Table(name = "product_category")
class CategoryEntity : BaseEntity {

    constructor() : super()
    constructor(id: UUID?) : super(id)

    @Column(columnDefinition = "citext")
    lateinit var name: String
}
