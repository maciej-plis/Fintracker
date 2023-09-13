package matthias.expense_tracker.purchase

import matthias.expense_tracker.api.models.AddPurchaseRequest
import matthias.expense_tracker.api.models.PurchaseDTO
import matthias.expense_tracker.api.models.UpdateProductRequest
import matthias.expense_tracker.api.models.UpdatePurchaseRequest
import matthias.expense_tracker.product.toEntity
import matthias.expense_tracker.shop.ShopEntity
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.*


@Service
internal class PurchaseService(
    private val purchaseRepository: PurchaseRepository
) {

    @Transactional
    fun removePurchases(ids: List<UUID>) {
        purchaseRepository.deleteAllById(ids)
    }

    @Transactional(readOnly = true)
    fun getPurchaseOrThrow(purchaseId: UUID): PurchaseDTO {
        return purchaseRepository.findByIdOrThrow(purchaseId).toDTO()
    }

    @Transactional
    fun addPurchase(request: AddPurchaseRequest) {
        purchaseRepository.save(request.toEntity())
    }

    @Transactional
    fun updatePurchase(purchaseId: UUID, request: UpdatePurchaseRequest) {
        purchaseRepository.deletePurchaseProducts(purchaseId)
        purchaseRepository.getReferenceById(purchaseId).apply {
            shop = ShopEntity(request.shopId)
            date = request.date
            products.addAll(request.products.map(UpdateProductRequest::toEntity))
        }
    }

    @Transactional
    fun removePurchase(purchaseId: UUID) {
        purchaseRepository.deleteById(purchaseId)
    }
}
