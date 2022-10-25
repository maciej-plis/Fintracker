package matthias.expense_tracker.purchase;

import matthias.expense_tracker.openapi.model.PurchaseDto;
import matthias.expense_tracker.product.ProductsMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(uses = ProductsMapper.class)
public interface PurchaseMapper {

    @Mapping(target = "id", ignore = true)
    PurchaseEntity toPurchaseEntity(PurchaseDto purchaseDto);

    PurchaseDto toPurchaseDTO(PurchaseEntity purchaseEntity);
}
