package com.matthias.fintracker.purchase_summary

import com.matthias.fintracker.api.models.PurchaseSummariesPage
import com.matthias.fintracker.api.models.PurchaseSummaryDTO
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
