package matthias.expense_tracker.category

import matthias.expense_tracker.openapi.model.AddCategoryRequest
import matthias.expense_tracker.openapi.model.CategoryDto
import java.util.*

fun CategoryEntity.toDTO() = CategoryDto(
    id = id,
    name = name
)

fun AddCategoryRequest.toEntity(id: UUID? = null) = CategoryEntity(id).also {
    it.name = name
}