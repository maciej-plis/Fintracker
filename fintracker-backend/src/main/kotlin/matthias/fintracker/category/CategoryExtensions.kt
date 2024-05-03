package matthias.fintracker.category

import matthias.fintracker.api.models.AddCategoryRequest
import matthias.fintracker.api.models.CategoryDTO
import java.util.*

fun CategoryEntity.toDTO() = CategoryDTO(
    id = id,
    name = name
)

fun AddCategoryRequest.toEntity(id: UUID? = null) = CategoryEntity(id).also {
    it.name = name
}
