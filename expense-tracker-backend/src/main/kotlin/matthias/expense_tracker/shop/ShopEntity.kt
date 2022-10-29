package matthias.expense_tracker.shop

import matthias.expense_tracker.common.jpa.BaseEntity
import java.util.*
import java.util.UUID.randomUUID
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Table

@Entity
@Table(name = "purchase_shop")
class ShopEntity(
    @Column(columnDefinition = "citext")
    var name: String,
    id: UUID = randomUUID()
) : BaseEntity(id)