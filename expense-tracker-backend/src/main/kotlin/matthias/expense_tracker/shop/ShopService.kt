package matthias.expense_tracker.shop

import lombok.RequiredArgsConstructor
import matthias.expense_tracker.common.jpa.TransactionExecutor
import matthias.expense_tracker.openapi.model.ShopDto
import matthias.expense_tracker.purchase.shops.ShopMapper
import org.springframework.stereotype.Service
import javax.persistence.EntityExistsException

@Service
@RequiredArgsConstructor
internal class ShopService(
    private val shopRepository: ShopRepository,
    private val shopMapper: ShopMapper,
    private val transactionEx: TransactionExecutor
) {

    fun getPurchaseShops(): List<ShopDto> {
        return shopRepository.findAll().map { it.toDTO() }
    }

    fun addPurchaseShop(shopDto: ShopDto): ShopDto {
        return transactionEx.executeInTx {
            shopRepository.existsByName(shopDto.name) && throw EntityExistsException("Shop with name '${shopDto.name}' already exist")
            return@executeInTx shopRepository.save(shopDto.toEntity()).toDTO()
        }
    }

    private fun ShopEntity.toDTO() = shopMapper.toShopDTO(this)!!

    private fun ShopDto.toEntity() = shopMapper.toShopEntity(this)!!
}
