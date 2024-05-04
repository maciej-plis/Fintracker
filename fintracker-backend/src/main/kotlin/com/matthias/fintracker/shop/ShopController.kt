package com.matthias.fintracker.shop

import com.matthias.fintracker.api.apis.ShopsApi
import com.matthias.fintracker.api.models.AddShopRequest
import com.matthias.fintracker.api.models.ShopDTO
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
        return ok(shopService.getPurchaseShopOrThrow(shopId))
    }

    override fun addShop(addShopRequest: AddShopRequest): ResponseEntity<UUID> {
        return ok(shopService.addPurchaseShop(addShopRequest))
    }
}
