package matthias.expense_tracker.purchase

import matthias.expense_tracker.openapi.model.AddEditPurchaseRequest
import matthias.expense_tracker.openapi.model.BulkDeleteRequest
import matthias.expense_tracker.openapi.model.PurchaseDto
import matthias.expense_tracker.openapi.model.PurchaseItemDto
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort.Direction.DESC
import org.springframework.data.web.PageableDefault
import org.springframework.http.ResponseEntity
import org.springframework.http.ResponseEntity.ok
import org.springframework.web.bind.annotation.*
import java.util.*

@CrossOrigin("*")
@RestController
internal class PurchaseController(private val purchaseService: PurchaseService) {
    @GetMapping("/purchases")
    fun getPurchases(@PageableDefault(sort = ["date"], direction = DESC) pageable: Pageable): ResponseEntity<Page<PurchaseDto>> {
        return ok(purchaseService.getPurchases(pageable))
    }

    @PostMapping("/purchases")
    fun addPurchase(@RequestBody addEditPurchaseRequest: AddEditPurchaseRequest): ResponseEntity<PurchaseDto> {
        return ok(purchaseService.addPurchases(addEditPurchaseRequest))
    }

    @DeleteMapping("/purchases")
    fun removePurchases(@RequestBody bulkDeleteRequest: BulkDeleteRequest): ResponseEntity<Unit> {
        purchaseService.removePurchases(bulkDeleteRequest.ids);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/purchases/{purchaseId}")
    fun getPurchase(@PathVariable purchaseId: UUID): ResponseEntity<PurchaseDto> {
        return ok(purchaseService.getPurchaseOrThrow(purchaseId))
    }

    @PutMapping("/purchases/{purchaseId}")
    fun updatePurchase(
        @PathVariable purchaseId: UUID,
        @RequestBody addEditPurchaseRequest: AddEditPurchaseRequest
    ): ResponseEntity<PurchaseDto> {
        return ok(purchaseService.updatePurchase(purchaseId, addEditPurchaseRequest))
    }

    @DeleteMapping("/purchases/{purchaseId}")
    fun removePurchase(@PathVariable purchaseId: UUID): ResponseEntity<Unit> {
        purchaseService.removePurchase(purchaseId)
        return ResponseEntity.noContent().build()
    }

    @GetMapping("purchase-items")
    fun getPurchaseItems(@PageableDefault(sort = ["date"], direction = DESC) pageable: Pageable): ResponseEntity<Page<PurchaseItemDto>> {
        return ok(purchaseService.getPurchaseItems(pageable))
    }
}