package matthias.expense_tracker.purchase

import matthias.expense_tracker.common.jpa.AuditEntity
import matthias.expense_tracker.product.ProductEntity
import matthias.expense_tracker.shop.ShopEntity
import java.time.LocalDate
import javax.persistence.*
import javax.persistence.CascadeType.ALL

@Entity
@Table(name = "purchase")
class PurchaseEntity(
    var date: LocalDate,
    @ManyToOne(optional = false)
    var shop: ShopEntity,
    @OneToMany(cascade = [ALL], targetEntity = ProductEntity::class)
    @JoinColumn(name = "purchase_id")
    var products: List<ProductEntity>
) : AuditEntity()