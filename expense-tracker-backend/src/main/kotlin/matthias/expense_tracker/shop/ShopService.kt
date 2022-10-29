package matthias.expense_tracker.shop

import matthias.expense_tracker.common.jpa.TransactionExecutor
import matthias.expense_tracker.openapi.model.AddShopRequest
import matthias.expense_tracker.openapi.model.ShopDto
import org.springframework.stereotype.Service
import javax.persistence.EntityExistsException

@Service
internal class ShopService(
    private val shopRepository: ShopRepository,
    private val transactionEx: TransactionExecutor
) {

    fun getPurchaseShops(): List<ShopDto> {
        return shopRepository.findAll().map { it.toDTO() }
    }

    fun addPurchaseShop(request: AddShopRequest): ShopDto {
        return transactionEx.executeInTx {
            shopRepository.existsByName(request.name) && throw EntityExistsException("Shop with name '${request.name}' already exist")
            return@executeInTx shopRepository.save(request.toEntity()).toDTO()
        }
    }
}
