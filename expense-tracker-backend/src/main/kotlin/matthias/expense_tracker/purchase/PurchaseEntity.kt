package matthias.expense_tracker.purchase

import matthias.expense_tracker.common.AuditEntity
import matthias.expense_tracker.product.ProductEntity
import matthias.expense_tracker.purchase.shops.ShopEntity
import java.time.LocalDate
import java.util.*
import java.util.UUID.randomUUID
import javax.persistence.*
import javax.persistence.CascadeType.ALL

@Entity
@Table(name = "purchase_group")
class PurchaseEntity(
    val date: LocalDate,
    @ManyToOne(optional = false)
    val shop: ShopEntity,
    @OneToMany(cascade = [ALL], targetEntity = ProductEntity::class)
    @JoinColumn(name = "group_id")
    val products: List<ProductEntity>,
    id: UUID = randomUUID()
) : AuditEntity(id)