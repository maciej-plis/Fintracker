package matthias.expense_tracker.purchases;

import lombok.RequiredArgsConstructor;
import matthias.expense_tracker.api.PurchasesApi;
import matthias.expense_tracker.api.model.PurchaseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.ResponseEntity.ok;

@RequiredArgsConstructor
@RestController
@CrossOrigin("*")
@RequestMapping("/purchases")
class PurchasesController implements PurchasesApi {

    private final PurchasesService purchasesService;

    @Override
    @PostMapping
    public ResponseEntity<PurchaseDto> addPurchase(PurchaseDto purchaseDto) {
        return ok(purchasesService.addPurchases(purchaseDto));
    }
}
