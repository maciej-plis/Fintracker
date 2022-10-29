package matthias.expense_tracker.shop

import matthias.expense_tracker.openapi.model.AddShopRequest
import matthias.expense_tracker.openapi.model.ShopDto

fun ShopEntity.toDTO() = ShopDto(
    id = id,
    name = name
)

fun AddShopRequest.toEntity() = ShopEntity(
    name = name
)