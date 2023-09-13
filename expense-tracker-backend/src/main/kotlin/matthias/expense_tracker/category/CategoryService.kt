package matthias.expense_tracker.category

import matthias.expense_tracker.api.models.AddCategoryRequest
import matthias.expense_tracker.api.models.CategoryDTO
import matthias.expense_tracker.common.jpa.TransactionExecutor
import org.springframework.stereotype.Service
import java.util.*
import javax.persistence.EntityExistsException

@Service
internal class CategoryService(
    private val categoryRepository: CategoryRepository,
    private val transactionEx: TransactionExecutor
) {

    fun getProductCategories(): List<CategoryDTO> {
        return categoryRepository.findAll().map { it.toDTO() }
    }

    fun getCategoryOrThrow(categoryId: UUID): CategoryEntity {
        return categoryRepository.findByIdOrThrow(categoryId)
    }

    fun addProductCategory(request: AddCategoryRequest): UUID {
        return transactionEx.executeInTx {
            categoryRepository.existsByName(request.name) && throw EntityExistsException("Category with name '${request.name}' already exist")
            return@executeInTx categoryRepository.save(request.toEntity()).id
        }
    }
}
