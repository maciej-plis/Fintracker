package matthias.expense_tracker.product

import matthias.expense_tracker.category.CategoryEntity
import matthias.expense_tracker.category.toDTO
import matthias.expense_tracker.openapi.model.AddEditProductRequest
import matthias.expense_tracker.openapi.model.ProductDto
import java.util.*

fun ProductEntity.toDTO() = ProductDto(
    id = id,
    category = category.toDTO(),
    name = name,
    amount = amount,
    price = price,
    description = description
)

fun AddEditProductRequest.toEntity(id: UUID? = null) = ProductEntity(id).also {
    it.category = CategoryEntity(categoryId)
    it.name = name
    it.amount = amount
    it.price = price
    it.description = description
}