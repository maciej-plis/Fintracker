package matthias.expense_tracker.purchase_summary

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Table
import matthias.expense_tracker.common.jpa.BaseEntity
import org.hibernate.annotations.Immutable
import java.time.Instant
import java.time.LocalDate
import java.util.*

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
