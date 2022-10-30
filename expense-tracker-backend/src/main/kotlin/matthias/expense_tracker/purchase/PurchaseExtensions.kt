package matthias.expense_tracker.purchase

import matthias.expense_tracker.openapi.model.AddEditProductRequest
import matthias.expense_tracker.openapi.model.AddEditPurchaseRequest
import matthias.expense_tracker.openapi.model.PurchaseDto
import matthias.expense_tracker.product.toDTO
import matthias.expense_tracker.product.toEntity
import matthias.expense_tracker.shop.ShopEntity
import matthias.expense_tracker.shop.toDTO
import java.util.*

fun PurchaseEntity.toDTO() = PurchaseDto(
    id = id,
    shop = shop.toDTO(),
    date = date,
    products = products.map { it.toDTO() }
)

fun AddEditPurchaseRequest.toEntity(id: UUID? = null) = PurchaseEntity(id).also {
    it.shop = ShopEntity(shopId)
    it.date = date
    it.products = products.map(AddEditProductRequest::toEntity)
}