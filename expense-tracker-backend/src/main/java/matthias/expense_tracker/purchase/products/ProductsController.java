package matthias.expense_tracker.purchase.products;

import lombok.RequiredArgsConstructor;
import matthias.expense_tracker.openapi.api.ProductsApi;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/purchases/products")
class ProductsController implements ProductsApi {

    private final ProductsService productsService;

    @Override
    @GetMapping("names")
    public ResponseEntity<List<String>> getProductNames(@RequestParam String query) {
        return ok(productsService.getProductNames(query));
    }
}
