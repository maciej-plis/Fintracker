package matthias.expense_tracker.purchase

import matthias.expense_tracker.api.apis.PurchasesApi
import matthias.expense_tracker.api.models.AddPurchaseRequest
import matthias.expense_tracker.api.models.PurchaseDTO
import matthias.expense_tracker.api.models.RemovePurchasesRequest
import matthias.expense_tracker.api.models.UpdatePurchaseRequest
import org.springframework.http.ResponseEntity
import org.springframework.http.ResponseEntity.noContent
import org.springframework.http.ResponseEntity.ok
import org.springframework.web.bind.annotation.RestController
import java.util.*

@RestController
internal class PurchaseController(
    private val purchaseService: PurchaseService
) : PurchasesApi {

    override fun removePurchases(removePurchasesRequest: RemovePurchasesRequest): ResponseEntity<Unit> {
        purchaseService.removePurchases(removePurchasesRequest.ids)
        return noContent().build()
    }

    override fun getPurchase(purchaseId: UUID): ResponseEntity<PurchaseDTO> {
        return ok(purchaseService.getPurchaseOrThrow(purchaseId))
    }

    override fun addPurchase(addPurchaseRequest: AddPurchaseRequest): ResponseEntity<Unit> {
        purchaseService.addPurchase(addPurchaseRequest)
        return noContent().build()
    }

    override fun updatePurchase(purchaseId: UUID, updatePurchaseRequest: UpdatePurchaseRequest): ResponseEntity<Unit> {
        purchaseService.updatePurchase(purchaseId, updatePurchaseRequest)
        return noContent().build()
    }

    override fun removePurchase(purchaseId: UUID): ResponseEntity<Unit> {
        purchaseService.removePurchase(purchaseId)
        return noContent().build()
    }
}
