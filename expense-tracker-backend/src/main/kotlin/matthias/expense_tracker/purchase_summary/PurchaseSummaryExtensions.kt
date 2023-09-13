package matthias.expense_tracker.purchase_summary

import matthias.expense_tracker.api.models.PurchaseSummariesPage
import matthias.expense_tracker.api.models.PurchaseSummaryDTO
import org.springframework.data.domain.Page

internal fun Page<PurchaseSummaryEntity>.toDTO() = PurchaseSummariesPage(
    content.map { it.toDTO() },
    totalPages,
    totalElements
)

internal fun PurchaseSummaryEntity.toDTO() = PurchaseSummaryDTO(
    id = id,
    shopName = shopName,
    date = date,
    productsCount = productsCount,
    totalPrice = totalPrice,
    createdAt = createdAt
)