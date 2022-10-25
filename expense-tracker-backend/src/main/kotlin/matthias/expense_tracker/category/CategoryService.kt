package matthias.expense_tracker.category

import matthias.expense_tracker.common.jpa.TransactionExecutor
import matthias.expense_tracker.openapi.model.CategoryDto
import org.springframework.stereotype.Service
import javax.persistence.EntityExistsException

@Service
internal class CategoryService(
    private val categoryRepository: CategoryRepository,
    private val categoryMapper: CategoryMapper,
    private val transactionEx: TransactionExecutor
) {

    fun getProductCategories(): List<CategoryDto> {
        return categoryRepository.findAll().map { it.toDTO() }
    }

    fun addProductCategory(categoryDto: CategoryDto): CategoryDto {
        return transactionEx.executeInTx {
            categoryRepository.existsByName(categoryDto.name) && throw EntityExistsException("Category with name '${categoryDto.name}' already exist")
            return@executeInTx categoryRepository.save(categoryDto.toEntity()).toDTO()
        }
    }

    private fun CategoryEntity.toDTO() = categoryMapper.toCategoryDTO(this)!!

    private fun CategoryDto.toEntity() = categoryMapper.toCategoryEntity(this)!!
}