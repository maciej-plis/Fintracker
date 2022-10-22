package matthias.expense_tracker.purchase.categories;

import lombok.RequiredArgsConstructor;
import matthias.expense_tracker.openapi.api.CategoriesApi;
import matthias.expense_tracker.openapi.model.CategoryDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.ResponseEntity.ok;

@RequiredArgsConstructor
@RestController
@CrossOrigin("*")
@RequestMapping("/purchases/categories")
class CategoriesController implements CategoriesApi {

    private final CategoriesService expensesService;

    @Override
    @GetMapping
    public ResponseEntity<List<CategoryDto>> getProductCategories() {
        return ok(expensesService.getProductCategories());
    }

    @Override
    @PostMapping
    public ResponseEntity<CategoryDto> addProductCategory(@RequestBody CategoryDto categoryDto) {
        return ok(expensesService.addProductCategory(categoryDto));
    }
}


