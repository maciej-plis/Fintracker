package matthias.expense_tracker.purchase

import matthias.expense_tracker.api.models.*
import matthias.expense_tracker.product.toDTO
import matthias.expense_tracker.product.toEntity
import matthias.expense_tracker.shop.ShopEntity
import matthias.expense_tracker.shop.toDTO
import org.springframework.data.domain.Page
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