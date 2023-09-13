package matthias.expense_tracker.shop

import matthias.expense_tracker.api.models.AddShopRequest
import matthias.expense_tracker.api.models.ShopDTO
import java.util.*

fun ShopEntity.toDTO() = ShopDTO(
    id = id,
    name = name
)

fun AddShopRequest.toEntity(id: UUID? = null) = ShopEntity(id).also {
    it.name = name
}