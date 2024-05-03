package matthias.fintracker.purchase

import matthias.fintracker.api.apis.PurchasesApi
import matthias.fintracker.api.models.AddPurchaseRequest
import matthias.fintracker.api.models.BulkDeleteRequest
import matthias.fintracker.api.models.PurchaseDTO
import matthias.fintracker.api.models.UpdatePurchaseRequest
import org.springframework.http.ResponseEntity
import org.springframework.http.ResponseEntity.noContent
import org.springframework.http.ResponseEntity.ok
import org.springframework.web.bind.annotation.RestController
import java.util.*

@RestController
internal class PurchaseController(
    private val purchaseService: PurchaseService
) : PurchasesApi {

    override fun getPurchase(purchaseId: UUID): ResponseEntity<PurchaseDTO> {
        return ok(purchaseService.getPurchaseOrThrow(purchaseId))
    }

    override fun addPurchase(addPurchaseRequest: AddPurchaseRequest): ResponseEntity<UUID> {
        return ok(purchaseService.addPurchase(addPurchaseRequest))
    }

    override fun updatePurchase(purchaseId: UUID, updatePurchaseRequest: UpdatePurchaseRequest): ResponseEntity<Unit> {
        purchaseService.updatePurchase(purchaseId, updatePurchaseRequest)
        return noContent().build()
    }

    override fun removePurchase(purchaseId: UUID): ResponseEntity<Unit> {
        purchaseService.removePurchase(purchaseId)
        return noContent().build()
    }

    override fun removePurchases(bulkDeleteRequest: BulkDeleteRequest): ResponseEntity<Unit> {
        purchaseService.removePurchases(bulkDeleteRequest.ids)
        return noContent().build()
    }
}
