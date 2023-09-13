package matthias.expense_tracker.category

import matthias.expense_tracker.api.models.AddCategoryRequest
import matthias.expense_tracker.api.models.CategoryDTO
import java.util.*

fun CategoryEntity.toDTO() = CategoryDTO(
    id = id,
    name = name
)

fun AddCategoryRequest.toEntity(id: UUID? = null) = CategoryEntity(id).also {
    it.name = name
}