package matthias.expense_tracker.purchases;

import matthias.expense_tracker.api.model.PurchaseDto;
import matthias.expense_tracker.purchases.products.ProductsMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import static org.mapstruct.InjectionStrategy.CONSTRUCTOR;

@Mapper(uses = ProductsMapper.class, injectionStrategy = CONSTRUCTOR)
interface PurchasesMapper {

    @Mapping(target = "id", ignore = true)
    PurchaseEntity fromDto(PurchaseDto purchaseDto);

    PurchaseDto toDto(PurchaseEntity purchaseEntity);
}
