package matthias.expense_tracker.category

import matthias.expense_tracker.api.apis.CategoriesApi
import matthias.expense_tracker.api.models.AddCategoryRequest
import matthias.expense_tracker.api.models.CategoryDTO
import org.springframework.http.ResponseEntity
import org.springframework.http.ResponseEntity.ok
import org.springframework.web.bind.annotation.RestController

@RestController
internal class CategoryController(
    private val categoryService: CategoryService
) : CategoriesApi {

    override fun getCategories(): ResponseEntity<List<CategoryDTO>> {
        return ok(categoryService.getProductCategories())
    }

    override fun addCategory(addCategoryRequest: AddCategoryRequest): ResponseEntity<CategoryDTO> {
        val categoryId = categoryService.addProductCategory(addCategoryRequest)
        return ok(categoryService.getCategoryOrThrow(categoryId).toDTO())
    }
}
