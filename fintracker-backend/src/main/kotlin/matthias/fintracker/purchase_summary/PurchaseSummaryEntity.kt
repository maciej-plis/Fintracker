package matthias.fintracker.purchase_summary

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Table
import matthias.fintracker.common.jpa.BaseEntity
import org.hibernate.annotations.Immutable
import java.time.Instant
import java.time.LocalDate
import java.util.*

@Entity
@Immutable
@Table(name = "v_purchase_summary")
class PurchaseSummaryEntity(id: UUID) : BaseEntity(id) {

    lateinit var date: LocalDate

    @Column(columnDefinition = "citext")
    lateinit var shopName: String

    var productsCount: Long = 0

    var totalPrice: Double = 0.0

    lateinit var createdAt: Instant
}
