package matthias.expense_tracker.shop

import matthias.expense_tracker.openapi.api.ShopsApi
import matthias.expense_tracker.openapi.model.ShopDto
import org.springframework.http.ResponseEntity
import org.springframework.http.ResponseEntity.ok
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.RestController

@CrossOrigin("*")
@RestController
internal class ShopController(private val shopService: ShopService) : ShopsApi {

    override fun getPurchaseShops(): ResponseEntity<List<ShopDto>> {
        return ok(shopService.getPurchaseShops())
    }

    override fun addPurchaseShop(shopDto: ShopDto): ResponseEntity<ShopDto> {
        return ok(shopService.addPurchaseShop(shopDto))
    }
}