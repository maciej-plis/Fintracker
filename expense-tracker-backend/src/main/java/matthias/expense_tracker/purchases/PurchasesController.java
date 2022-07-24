package matthias.expense_tracker.purchases;

import lombok.RequiredArgsConstructor;
import matthias.expense_tracker.api.PurchasesApi;
import matthias.expense_tracker.api.model.PurchaseGroupDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

import static org.springframework.http.ResponseEntity.created;
import static org.springframework.http.ResponseEntity.ok;

@RequiredArgsConstructor
@RestController
@CrossOrigin("*")
@RequestMapping("/purchases")
class PurchasesController implements PurchasesApi {

    private final PurchasesService purchasesService;

    @Override
    @PostMapping
    public ResponseEntity<PurchaseGroupDto> addPurchaseGroup(PurchaseGroupDto purchaseGroupDto) {
        return ok(purchasesService.addPurchases(purchaseGroupDto));
    }

    @Override
    @GetMapping("query-names")
    public ResponseEntity<List<String>> queryPurchaseNames(@RequestParam String query) {
        return ok(purchasesService.queryPurchaseNames(query));
    }
}
