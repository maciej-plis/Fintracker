package matthias.expense_tracker.purchase

import matthias.expense_tracker.openapi.model.PurchaseDto
import matthias.expense_tracker.product.toDTO
import matthias.expense_tracker.product.toEntity
import matthias.expense_tracker.shop.toDTO
import matthias.expense_tracker.shop.toEntity

fun PurchaseEntity.toDTO() = PurchaseDto(
    id = id,
    shop = shop.toDTO(),
    date = date,
    products = products.map { it.toDTO() }
)

fun PurchaseDto.toEntity() = PurchaseEntity(
    shop = shop.toEntity(),
    date = date,
    products = products.map { it.toEntity() }
)