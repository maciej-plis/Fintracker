package matthias.expense_tracker.category

import matthias.expense_tracker.openapi.model.CategoryDto

fun CategoryEntity.toDTO() = CategoryDto(
    id = id,
    name = name
)

fun CategoryDto.toEntity() = CategoryEntity(
    name = name
)
