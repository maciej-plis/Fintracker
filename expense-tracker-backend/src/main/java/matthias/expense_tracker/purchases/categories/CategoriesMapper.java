package matthias.expense_tracker.purchases.categories;


import matthias.expense_tracker.api.model.CategoryDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper
interface CategoriesMapper {

    @Mapping(target = "id", ignore = true)
    CategoryEntity fromDto(CategoryDto categoryDto);

    CategoryDto toDto(CategoryEntity categoryEntity);

    List<CategoryDto> toDtos(List<CategoryEntity> categoryEntities);
}
