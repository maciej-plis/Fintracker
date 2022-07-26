package matthias.expense_tracker.purchases.categories;

import lombok.RequiredArgsConstructor;
import matthias.expense_tracker.openapi.model.CategoryDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityExistsException;
import java.util.List;

@Service
@RequiredArgsConstructor
class CategoriesService {

    private final CategoriesRepository categoriesRepository;
    private final CategoriesMapper categoriesMapper;

    List<CategoryDto> getProductCategories() {
        return categoriesMapper.toDtos(categoriesRepository.findAll());
    }

    @Transactional
    public CategoryDto addProductCategory(CategoryDto categoryDto) {

        if (categoriesRepository.existsByName(categoryDto.getName())) {
            throw new EntityExistsException("Category with such name already exist");
        }

        CategoryEntity savedCategory = categoriesRepository.save(categoriesMapper.fromDto(categoryDto));
        return categoriesMapper.toDto(savedCategory);
    }
}
