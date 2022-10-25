package matthias.expense_tracker.purchase.shops;

import matthias.expense_tracker.openapi.model.ShopDto;
import matthias.expense_tracker.shop.ShopEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface ShopMapper {

    ShopDto toShopDTO(ShopEntity shop);

    List<ShopDto> toShopDTOs(List<ShopEntity> shops);

    //    @Mapping(target = "id", ignore = true)
    ShopEntity toShopEntity(ShopDto shopDto);
}
