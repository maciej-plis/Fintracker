package matthias.expense_tracker.product

import matthias.expense_tracker.category.CategoryEntity
import matthias.expense_tracker.category.toDTO
import matthias.expense_tracker.openapi.model.AddEditProductRequest
import matthias.expense_tracker.openapi.model.ProductDto

fun ProductEntity.toDTO() = ProductDto(
    id = id,
    category = category.toDTO(),
    name = name,
    amount = amount,
    price = price,
    description = description
)

fun AddEditProductRequest.toEntity() = ProductEntity(
    category = CategoryEntity(id = categoryId, name = ""),
    name = name,
    amount = amount,
    price = price,
    description = description
)