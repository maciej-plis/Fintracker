package matthias.reactive_test.shops_reactive;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import matthias.expense_tracker.openapi.model.ShopDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import static reactor.core.publisher.Mono.error;

@Slf4j
@Service
@RequiredArgsConstructor
class ShopsService {

    private final ShopsRepository shopsRepository;
    private final ShopsMapper shopsMapper;

    Flux<ShopDto> getPurchaseShops() {
        return shopsRepository.findAll()
            .map(shopsMapper::toDto);
    }

    @Transactional
    public Mono<ShopDto> addPurchaseShop(ShopDto shopDto) {
        return shopsRepository
            .existsByName(shopDto.getName())
            .flatMap(exists -> !exists ? shopsRepository.save(shopsMapper.fromDto(shopDto)) : error(new IllegalStateException("Shop with such name already exist")))
            .map(shopsMapper::toDto);
    }
}
