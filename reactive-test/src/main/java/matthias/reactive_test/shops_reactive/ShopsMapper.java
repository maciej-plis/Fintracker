package matthias.reactive_test.shops_reactive;

import matthias.expense_tracker.openapi.model.ShopDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;


@Mapper
interface ShopsMapper {

    ShopDto toDto(ShopEntity shop);

    @Mapping(target = "id", ignore = true)
    ShopEntity fromDto(ShopDto shopDto);
}
