package matthias.expense_tracker.purchase.shops;

import lombok.RequiredArgsConstructor;
import matthias.expense_tracker.openapi.model.ShopDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityExistsException;
import java.util.List;

@Service
@RequiredArgsConstructor
class ShopsService {

    private final ShopsRepository shopsRepository;
    private final ShopsMapper shopsMapper;

    List<ShopDto> getPurchaseShops() {
        return shopsMapper.toDto(shopsRepository.findAll());
    }

    @Transactional
    public ShopDto addPurchaseShop(ShopDto shopDto) {
        if (shopsRepository.existsByName(shopDto.getName())) {
            throw new EntityExistsException("Shop with such name already exist");
        }

        ShopEntity savedShop = shopsRepository.save(shopsMapper.fromDto(shopDto));
        return shopsMapper.toDto(savedShop);
    }
}
