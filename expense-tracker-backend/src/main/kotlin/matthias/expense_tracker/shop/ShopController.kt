package matthias.expense_tracker.shop

import matthias.expense_tracker.api.apis.ShopsApi
import matthias.expense_tracker.api.models.AddShopRequest
import matthias.expense_tracker.api.models.ShopDTO
import org.springframework.http.ResponseEntity
import org.springframework.http.ResponseEntity.ok
import org.springframework.web.bind.annotation.RestController
import java.util.*

@RestController
internal class ShopController(
    private val shopService: ShopService
) : ShopsApi {

    override fun getShops(): ResponseEntity<List<ShopDTO>> {
        return ok(shopService.getPurchaseShops())
    }

    override fun getShop(shopId: UUID): ResponseEntity<ShopDTO> {
        return ok(shopService.getShopOrThrow(shopId))
    }

    override fun addShop(addShopRequest: AddShopRequest): ResponseEntity<UUID> {
        return ok(shopService.addPurchaseShop(addShopRequest))
    }
}
