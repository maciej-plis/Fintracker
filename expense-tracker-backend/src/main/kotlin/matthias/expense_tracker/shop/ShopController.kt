package matthias.expense_tracker.shop

import matthias.expense_tracker.openapi.model.AddShopRequest
import matthias.expense_tracker.openapi.model.ShopDto
import org.springframework.http.ResponseEntity
import org.springframework.http.ResponseEntity.ok
import org.springframework.web.bind.annotation.*

@CrossOrigin("*")
@RestController
@RequestMapping("/shops")
internal class ShopController(private val shopService: ShopService) {

    @GetMapping
    fun getPurchaseShops(): ResponseEntity<List<ShopDto>> {
        return ok(shopService.getPurchaseShops())
    }

    @PostMapping
    fun addPurchaseShop(@RequestBody addShopRequest: AddShopRequest): ResponseEntity<ShopDto> {
        return ok(shopService.addPurchaseShop(addShopRequest))
    }
}