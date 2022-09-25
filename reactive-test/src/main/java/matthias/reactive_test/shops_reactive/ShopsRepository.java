package matthias.reactive_test.shops_reactive;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Mono;

import java.util.UUID;

public interface ShopsRepository extends ReactiveCrudRepository<ShopEntity, UUID> {

    Mono<Boolean> existsByName(String name);
}
