package matthias.expense_tracker.product

import matthias.expense_tracker.category.toDTO
import matthias.expense_tracker.category.toEntity
import matthias.expense_tracker.openapi.model.ProductDto

fun ProductEntity.toDTO() = ProductDto(
    id = id,
    category = category.toDTO(),
    name = name,
    amount = amount,
    price = price,
    description = description
)

fun ProductDto.toEntity() = ProductEntity(
    category = category.toEntity(),
    name = name,
    amount = amount,
    price = price,
    description = description
)