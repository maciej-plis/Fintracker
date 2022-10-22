package matthias.expense_tracker.purchase

import matthias.expense_tracker.openapi.api.PurchasesApi
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

    override fun addPurchase(purchaseDto: PurchaseDto): ResponseEntity<PurchaseDto> {
        return ok(purchaseService.addPurchases(purchaseDto))
    }
}