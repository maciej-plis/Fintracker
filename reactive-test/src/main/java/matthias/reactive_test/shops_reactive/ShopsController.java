package matthias.reactive_test.shops_reactive;

import lombok.RequiredArgsConstructor;
import matthias.expense_tracker.openapi.model.ShopDto;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;


@RequiredArgsConstructor
@RestController
@CrossOrigin("*")
@RequestMapping("/reactive/purchases/shops")
class ShopsController {

    private final ShopsService shopsService;

    @GetMapping
    public Flux<ShopDto> getPurchaseShops() {
        return shopsService.getPurchaseShops();
    }

    @PostMapping
    public Mono<ShopDto> addPurchaseShop(@RequestBody ShopDto shop) {
        return shopsService.addPurchaseShop(shop);
    }
}
