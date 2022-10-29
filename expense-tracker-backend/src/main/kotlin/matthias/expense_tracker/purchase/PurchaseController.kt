package matthias.expense_tracker.purchase

import matthias.expense_tracker.openapi.api.PurchasesApi
import matthias.expense_tracker.openapi.model.AddPurchaseRequest
import matthias.expense_tracker.openapi.model.EditPurchaseRequest
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

    override fun addPurchase(addPurchaseRequest: AddPurchaseRequest): ResponseEntity<PurchaseDto> {
        return ok(purchaseService.addPurchases(addPurchaseRequest))
    }

    override fun updatePurchase(editPurchaseRequest: EditPurchaseRequest): ResponseEntity<PurchaseDto> {
        return ok(purchaseService.updatePurchase(editPurchaseRequest))
    }

    override fun removePurchase(purchaseId: UUID): ResponseEntity<Unit> {
        purchaseService.removePurchase(purchaseId)
        return ResponseEntity.noContent().build()
    }
}