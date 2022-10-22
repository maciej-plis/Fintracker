package matthias.expense_tracker.purchase

import matthias.expense_tracker.common.AuditEntity
import matthias.expense_tracker.purchase.products.ProductEntity
import matthias.expense_tracker.purchase.shops.ShopEntity
import java.time.LocalDate
import javax.persistence.*
import javax.persistence.CascadeType.ALL

@Entity
@Table(name = "purchase_group")
class PurchaseEntity(
    var date: LocalDate,
    @ManyToOne(optional = false)
    var shop: ShopEntity,
    @OneToMany(cascade = [ALL], targetEntity = ProductEntity::class)
    @JoinColumn(name = "group_id")
    var products: List<ProductEntity>
) : AuditEntity()