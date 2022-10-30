package matthias.expense_tracker.shop

import matthias.expense_tracker.openapi.model.AddShopRequest
import matthias.expense_tracker.openapi.model.ShopDto
import java.util.*

fun ShopEntity.toDTO() = ShopDto(
    id = id,
    name = name
)

fun AddShopRequest.toEntity(id: UUID? = null) = ShopEntity(id).also {
    it.name = name
}