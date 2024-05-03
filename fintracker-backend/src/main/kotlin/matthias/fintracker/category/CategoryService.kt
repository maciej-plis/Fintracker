package matthias.fintracker.category

import jakarta.persistence.EntityExistsException
import matthias.fintracker.api.models.AddCategoryRequest
import matthias.fintracker.api.models.CategoryDTO
import matthias.fintracker.common.jpa.TransactionExecutor
import org.springframework.stereotype.Service
import java.util.*

@Service
internal class CategoryService(
    private val categoryRepository: CategoryRepository,
    private val txExecutor: TransactionExecutor
) {

    fun getProductCategories(): List<CategoryDTO> = txExecutor.readTx {
        return@readTx categoryRepository.findAllByOrderByName().map { it.toDTO() }
    }

    fun getProductCategoryOrThrow(categoryId: UUID): CategoryDTO = txExecutor.readTx {
        return@readTx categoryRepository.findByIdOrThrow(categoryId).toDTO()
    }

    fun addProductCategory(request: AddCategoryRequest): UUID = txExecutor.tx {
        categoryRepository.existsByNameIgnoreCase(request.name) && throw EntityExistsException("Category with name '${request.name}' already exist")
        return@tx categoryRepository.save(request.toEntity()).id
    }
}
