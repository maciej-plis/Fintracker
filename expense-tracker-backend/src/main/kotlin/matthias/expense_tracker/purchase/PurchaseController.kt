package matthias.expense_tracker.purchase

import matthias.expense_tracker.openapi.api.PurchasesApi
import matthias.expense_tracker.openapi.model.AddEditPurchaseRequest
import matthias.expense_tracker.openapi.model.BulkDeleteRequest
import matthias.expense_tracker.openapi.model.PurchaseDto
import org.springframework.http.ResponseEntity
import org.springframework.http.ResponseEntity.ok
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.RestController
import java.util.*

@CrossOrigin("*")
@RestController
internal class PurchaseController(private val purchaseService: PurchaseService) : PurchasesApi {

    override fun getPurchases(): ResponseEntity<List<PurchaseDto>> {
        return ok(purchaseService.getPurchases())
    }

    override fun getPurchase(purchaseId: UUID): ResponseEntity<PurchaseDto> {
        return ok(purchaseService.getPurchaseOrThrow(purchaseId))
    }

    override fun addPurchase(addEditPurchaseRequest: AddEditPurchaseRequest): ResponseEntity<PurchaseDto> {
        return ok(purchaseService.addPurchases(addEditPurchaseRequest))
    }

    override fun updatePurchase(purchaseId: UUID, addEditPurchaseRequest: AddEditPurchaseRequest): ResponseEntity<PurchaseDto> {
        return ok(purchaseService.updatePurchase(purchaseId, addEditPurchaseRequest))
    }

    override fun removePurchase(purchaseId: UUID): ResponseEntity<Unit> {
        purchaseService.removePurchase(purchaseId)
        return ResponseEntity.noContent().build()
    }

    override fun removePurchases(bulkDeleteRequest: BulkDeleteRequest): ResponseEntity<Unit> {
        purchaseService.removePurchases(bulkDeleteRequest.ids);
        return ResponseEntity.noContent().build();
    }
}