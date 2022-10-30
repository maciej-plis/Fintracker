package matthias.expense_tracker.purchase

import matthias.expense_tracker.common.jpa.AuditEntity
import matthias.expense_tracker.product.ProductEntity
import matthias.expense_tracker.shop.ShopEntity
import org.hibernate.annotations.SQLDelete
import org.hibernate.annotations.Where
import java.time.LocalDate
import java.util.*
import javax.persistence.*
import javax.persistence.CascadeType.ALL

@Entity
@Table(name = "purchase")
@Where(clause = "deleted = false")
@SQLDelete(sql = "UPDATE purchase SET deleted = true where id=?")
class PurchaseEntity : AuditEntity {

    constructor() : super()
    constructor(id: UUID?) : super(id)

    lateinit var date: LocalDate

    @ManyToOne(optional = false)
    lateinit var shop: ShopEntity

    @OneToMany(cascade = [ALL], orphanRemoval = true)
    @JoinColumn(name = "purchase_id", nullable = false)
    lateinit var products: List<ProductEntity>

    var deleted: Boolean = false
}