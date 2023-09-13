package matthias.expense_tracker.purchase_summary

import matthias.expense_tracker.common.jpa.BaseEntity
import org.hibernate.annotations.Immutable
import java.time.Instant
import java.time.LocalDate
import java.util.*
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Table

@Entity
@Immutable
@Table(name = "v_purchase_summary")
internal class PurchaseSummaryEntity(
    val date: LocalDate,
    @Column(columnDefinition = "citext")
    val shopName: String,
    val productsCount: Long,
    val totalPrice: Double,
    val createdAt: Instant,
    id: UUID
) : BaseEntity(id)