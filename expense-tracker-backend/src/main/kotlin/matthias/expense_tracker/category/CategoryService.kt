package matthias.expense_tracker.category

import matthias.expense_tracker.common.jpa.TransactionExecutor
import matthias.expense_tracker.openapi.model.AddCategoryRequest
import matthias.expense_tracker.openapi.model.CategoryDto
import org.springframework.stereotype.Service
import javax.persistence.EntityExistsException

@Service
internal class CategoryService(
    private val categoryRepository: CategoryRepository,
    private val transactionEx: TransactionExecutor
) {

    fun getProductCategories(): List<CategoryDto> {
        return categoryRepository.findAll().map { it.toDTO() }
    }

    fun addProductCategory(request: AddCategoryRequest): CategoryDto {
        return transactionEx.executeInTx {
            categoryRepository.existsByName(request.name) && throw EntityExistsException("Category with name '${request.name}' already exist")
            return@executeInTx categoryRepository.save(request.toEntity()).toDTO()
        }
    }
}