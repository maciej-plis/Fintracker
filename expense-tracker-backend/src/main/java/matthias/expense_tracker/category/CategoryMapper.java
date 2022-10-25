package matthias.expense_tracker.category;


import matthias.expense_tracker.openapi.model.CategoryDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper
public interface CategoryMapper {

    @Mapping(target = "id", ignore = true)
    CategoryEntity toCategoryEntity(CategoryDto categoryDto);

    CategoryDto toCategoryDTO(CategoryEntity categoryEntity);

    List<CategoryDto> toCategoryDTOs(List<CategoryEntity> categoryEntities);
}
