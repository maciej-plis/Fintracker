package matthias.expense_tracker.shop

import matthias.expense_tracker.common.jpa.BaseEntity
import javax.persistence.Entity
import javax.persistence.Table

@Entity
@Table(name = "purchase_shop")
class ShopEntity(
    var name: String
) : BaseEntity()