package matthias.expense_tracker.purchase

import matthias.expense_tracker.common.jpa.TransactionExecutor
import matthias.expense_tracker.openapi.model.AddEditPurchaseRequest
import matthias.expense_tracker.openapi.model.PurchaseDto
import org.springframework.stereotype.Service
import java.util.*


@Service
internal class PurchaseService(
    private val purchaseRepository: PurchaseRepository,
    private val transactionEx: TransactionExecutor,
) {

    fun getPurchases(): List<PurchaseDto> {
        return purchaseRepository.findAll().map(PurchaseEntity::toDTO)
    }

    fun getPurchaseOrThrow(purchaseId: UUID): PurchaseDto {
        return purchaseRepository.findByIdOrThrow(purchaseId).toDTO()
    }

    fun addPurchases(request: AddEditPurchaseRequest): PurchaseDto {
        val savedPurchase = transactionEx.executeInTx {
            return@executeInTx purchaseRepository.save(request.toEntity())
        }
        return purchaseRepository.refresh(savedPurchase).toDTO()
    }

    fun updatePurchase(purchaseId: UUID, request: AddEditPurchaseRequest): PurchaseDto {
        val updatedPurchase = transactionEx.executeInTx {
            return@executeInTx purchaseRepository.save(request.toEntity(purchaseId))
        }
        return purchaseRepository.refresh(updatedPurchase).toDTO()
    }

    fun removePurchase(purchaseId: UUID) {
        transactionEx.executeInTx {
            purchaseRepository.deleteById(purchaseId)
        }
    }

    fun removePurchases(ids: List<UUID>) {
        transactionEx.executeInTx {
            purchaseRepository.deleteAllById(ids)
        }
    }
}