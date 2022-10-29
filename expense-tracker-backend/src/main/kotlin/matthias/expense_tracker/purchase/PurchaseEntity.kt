package matthias.expense_tracker.purchase

import matthias.expense_tracker.common.jpa.AuditEntity
import matthias.expense_tracker.product.ProductEntity
import matthias.expense_tracker.shop.ShopEntity
import org.hibernate.annotations.SQLDelete
import org.hibernate.annotations.Where
import java.time.LocalDate
import java.util.*
import java.util.UUID.randomUUID
import javax.persistence.*

@Entity
@Table(name = "purchase")
@Where(clause = "deleted = false")
@SQLDelete(sql = "UPDATE purchase SET deleted = true where id=?")
class PurchaseEntity(
    var date: LocalDate,
    @ManyToOne(optional = false)
    var shop: ShopEntity,
    @OneToMany
    @JoinColumn(name = "purchase_id", nullable = false)
    var products: List<ProductEntity>,
    var deleted: Boolean = false,
    id: UUID = randomUUID()
) : AuditEntity(id)