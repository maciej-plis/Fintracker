package matthias.expense_tracker.purchase

import matthias.expense_tracker.common.jpa.AuditEntity
import matthias.expense_tracker.product.ProductEntity
import matthias.expense_tracker.shop.ShopEntity
import org.hibernate.annotations.Fetch
import org.hibernate.annotations.FetchMode.SUBSELECT
import org.hibernate.annotations.SQLDelete
import org.hibernate.annotations.Where
import java.time.LocalDate
import java.util.*
import javax.persistence.*
import javax.persistence.CascadeType.ALL
import javax.persistence.FetchType.EAGER

@Entity
@Table(name = "purchase")
@Where(clause = "deleted = false")
@SQLDelete(sql = "UPDATE purchase SET deleted = true where id=?")
class PurchaseEntity : AuditEntity {

    constructor() : super()
    constructor(id: UUID?) : super(id)

    @Column(nullable = false)
    lateinit var date: LocalDate

    @ManyToOne(optional = false, fetch = EAGER)
    lateinit var shop: ShopEntity

    @Fetch(SUBSELECT)
    @OneToMany(cascade = [ALL], orphanRemoval = true)
    @JoinColumn(name = "purchase_id", nullable = false, updatable = false)
    @OrderColumn(columnDefinition = "int2", name = "ordinal", nullable = false)
    lateinit var products: MutableList<ProductEntity>

    @Column(nullable = false)
    var deleted: Boolean = false
}
