package matthias.expense_tracker.purchase.shops;

import lombok.RequiredArgsConstructor;
import matthias.expense_tracker.openapi.api.ShopsApi;
import matthias.expense_tracker.openapi.model.ShopDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.ResponseEntity.ok;

@RequiredArgsConstructor
@RestController
@CrossOrigin("*")
@RequestMapping("/purchases/shops")
class ShopsController implements ShopsApi {

    private final ShopsService shopsService;

    @Override
    @GetMapping
    public ResponseEntity<List<ShopDto>> getPurchaseShops() {
        return ok(shopsService.getPurchaseShops());
    }

    @Override
    @PostMapping
    public ResponseEntity<ShopDto> addPurchaseShop(@RequestBody ShopDto shop) {
        return ok(shopsService.addPurchaseShop(shop));
    }
}
