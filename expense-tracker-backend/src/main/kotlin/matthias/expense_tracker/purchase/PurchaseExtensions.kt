package matthias.expense_tracker.purchase

import matthias.expense_tracker.openapi.model.AddPurchaseRequest
import matthias.expense_tracker.openapi.model.EditPurchaseRequest
import matthias.expense_tracker.openapi.model.PurchaseDto
import matthias.expense_tracker.product.toDTO
import matthias.expense_tracker.product.toEntity
import matthias.expense_tracker.shop.ShopEntity
import matthias.expense_tracker.shop.toDTO

fun PurchaseEntity.toDTO() = PurchaseDto(
    id = id,
    shop = shop.toDTO(),
    date = date,
    products = products.map { it.toDTO() }
)

fun AddPurchaseRequest.toEntity() = PurchaseEntity(
    shop = ShopEntity(id = shopId, name = ""),
    date = date,
    products = products.map { it.toEntity() }
)

fun EditPurchaseRequest.toEntity() = PurchaseEntity(
    id = id,
    shop = ShopEntity(id = shopId, name = ""),
    date = date,
    products = products.map { it.toEntity() }
)