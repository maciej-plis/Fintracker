package matthias.fintracker.shop

import matthias.fintracker.api.models.AddShopRequest
import matthias.fintracker.api.models.ShopDTO
import java.util.*

fun ShopEntity.toDTO() = ShopDTO(
    id = id,
    name = name
)

fun AddShopRequest.toEntity(id: UUID? = null) = ShopEntity(id).also {
    it.name = name
}
