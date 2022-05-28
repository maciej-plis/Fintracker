package matthias.expense_tracker.purchases.categories;

import lombok.RequiredArgsConstructor;
import matthias.expense_tracker.api.CategoriesApi;
import matthias.expense_tracker.api.model.CategoryDto;
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
    public ResponseEntity<List<CategoryDto>> getPurchaseCategories() {
        return ok(expensesService.getPurchaseCategories());
    }

    @Override
    @PostMapping
    public ResponseEntity<CategoryDto> addPurchaseCategory(@RequestBody CategoryDto categoryDto) {
        return ok(expensesService.addPurchaseCategory(categoryDto));
    }
}


