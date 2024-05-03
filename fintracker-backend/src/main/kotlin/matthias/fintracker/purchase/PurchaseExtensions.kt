package matthias.fintracker.purchase

import matthias.fintracker.api.models.AddProductRequest
import matthias.fintracker.api.models.AddPurchaseRequest
import matthias.fintracker.api.models.PurchaseDTO
import matthias.fintracker.product.toDTO
import matthias.fintracker.product.toEntity
import matthias.fintracker.shop.ShopEntity
import matthias.fintracker.shop.toDTO
import java.util.*

fun PurchaseEntity.toDTO() = PurchaseDTO(
    id = id,
    shop = shop.toDTO(),
    date = date,
    products = products.map { it.toDTO() }
)

fun AddPurchaseRequest.toEntity(id: UUID? = null) = PurchaseEntity(id).also {
    it.shop = ShopEntity(shopId)
    it.date = date
    it.products = products.map(AddProductRequest::toEntity).toMutableList()
}
